const express = require('express');
const path = require('path');
const hbs = require('hbs');
const MySQL = require('./utilsMySQL'); 

const app = express();
const port = 3000;

// 1. Detecció de Proxmox i connexió a BD
const isProxmox = !!process.env.PM2_HOME;
const db = new MySQL();

if (!isProxmox) {
  db.init({ host: '127.0.0.1', port: 3306, user: 'root', password: '1234.', database: 'minierp_db' });
} else {
  db.init({ host: '127.0.0.1', port: 3306, user: 'super', password: '1234', database: 'minierp_db' });
}

// 2. Configuració de rutes estàtiques i middleware
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.urlencoded({ extended: true }));

// 3. Configuració de Vistes
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

// 4. Helpers per a les plantilles
hbs.registerHelper('colorStock', (stock) => {
    if (stock <= 5) return 'stock-critic';
    if (stock <= 15) return 'stock-baix';
    return 'stock-ok';
});

// =========================================
// 5. RUTES DEL MINI-ERP
// =========================================

// --- DASHBOARD (KPIs i Llistats resum) ---
app.get('/', async (req, res) => {
    try {
        // KPIs: Avui vs Mes
        const vAvui = await db.query('SELECT SUM(total) as suma FROM sales WHERE DATE(sale_date) = CURDATE()');
        const vMes = await db.query('SELECT SUM(total) as suma FROM sales WHERE MONTH(sale_date) = MONTH(CURDATE()) AND YEAR(sale_date) = YEAR(CURDATE())');
        const cAvui = await db.query('SELECT COUNT(*) as qtat FROM sales WHERE DATE(sale_date) = CURDATE()');
        const cMes = await db.query('SELECT COUNT(*) as qtat FROM sales WHERE MONTH(sale_date) = MONTH(CURDATE()) AND YEAR(sale_date) = YEAR(CURDATE())');
        const stockBaix = await db.query('SELECT COUNT(*) as total FROM products WHERE stock <= 5');
        
        // Llistat: Últimes 5 vendes
        const ultimes = await db.query(`
            SELECT s.sale_date as data, c.name as client_nom, s.total 
            FROM sales s 
            JOIN customers c ON s.customer_id = c.id 
            ORDER BY s.sale_date DESC LIMIT 5`);

        // Llistat: Top 5 productes més venuts (per quantitat en sale_items)
        const top = await db.query(`
            SELECT p.name, SUM(si.qty) as total_venut 
            FROM products p 
            JOIN sale_items si ON p.id = si.product_id 
            GROUP BY p.id ORDER BY total_venut DESC LIMIT 5`);

        res.render('index', { 
            layout: 'layouts/main',
            kpis: {
                vAvui: vAvui[0].suma || 0,
                vMes: vMes[0].suma || 0,
                cAvui: cAvui[0].qtat || 0,
                cMes: cMes[0].qtat || 0,
                alertesStock: stockBaix[0].total
            },
            topProductes: top,
            ultimesVendes: ultimes
        });
    } catch (e) { res.status(500).send("Error al Dashboard: " + e.message); }
});

// --- PRODUCTES (Llistat i Cerca) ---
app.get('/productes', async (req, res) => {
    try {
        const pagina = parseInt(req.query.pagina) || 0;
        const cerca = req.query.cerca || '';
        const limit = 10;
        const offset = pagina * limit;

        const rows = await db.query(`SELECT * FROM products WHERE name LIKE '%${cerca}%' LIMIT ${limit} OFFSET ${offset}`);
        
        res.render('productes', {
            layout: 'layouts/main',
            productes: rows,
            pagina, cerca,
            next: pagina + 1,
            prev: pagina > 0 ? pagina - 1 : 0
        });
    } catch (e) { res.status(500).send("Error a Productes"); }
});

// --- CLIENTS (Llistat i Cerca) ---
app.get('/clients', async (req, res) => {
    try {
        const pagina = parseInt(req.query.pagina) || 0;
        const cerca = req.query.cerca || '';
        const limit = 10;
        const offset = pagina * limit;

        const rows = await db.query(`
            SELECT c.*, (SELECT COUNT(*) FROM sales WHERE customer_id = c.id) as num_compres 
            FROM customers c 
            WHERE name LIKE '%${cerca}%' OR email LIKE '%${cerca}%'
            LIMIT ${limit} OFFSET ${offset}`);

        res.render('clients', {
            layout: 'layouts/main',
            clients: rows,
            pagina, cerca,
            next: pagina + 1,
            prev: pagina > 0 ? pagina - 1 : 0
        });
    } catch (e) { res.status(500).send("Error a Clients"); }
});

// --- VENDES (Llistat) ---
app.get('/vendes', async (req, res) => {
    try {
        const pagina = parseInt(req.query.pagina) || 0;
        const limit = 10;
        const offset = pagina * limit;

        // Query per obtenir les vendes amb el nom del client fent un JOIN
        const rows = await db.query(`
            SELECT s.id, s.sale_date as data, c.name as client_nom, s.total 
            FROM sales s 
            JOIN customers c ON s.customer_id = c.id 
            ORDER BY s.sale_date DESC 
            LIMIT ${limit} OFFSET ${offset}`);

        res.render('vendes', {
            layout: 'layouts/main',
            vendes: rows,
            pagina,
            next: pagina + 1,
            prev: pagina > 0 ? pagina - 1 : 0
        });
    } catch (e) { 
        res.status(500).send("Error a Vendes: " + e.message); 
    }
});

// --- FORMULARIS (Afegir i Editar) ---
app.get('/producteAfegir', (req, res) => res.render('producteForm', { layout: 'layouts/main', taula: 'productes' }));
app.get('/clientAfegir', (req, res) => res.render('clientForm', { layout: 'layouts/main', taula: 'clients' }));

app.get('/producteEditar', async (req, res) => {
    const rows = await db.query(`SELECT * FROM products WHERE id = ${req.query.id}`);
    res.render('producteForm', { layout: 'layouts/main', producte: rows[0], taula: 'productes' });
});

app.get('/clientEditar', async (req, res) => {
    const rows = await db.query(`SELECT * FROM customers WHERE id = ${req.query.id}`);
    res.render('clientForm', { layout: 'layouts/main', client: rows[0], taula: 'clients' });
});

// --- OPERACIONS CRUD (POST) ---
app.post('/create', async (req, res) => {
    try {
        const { taula, ...datos } = req.body;
        const tableDB = (taula === 'productes') ? 'products' : 'customers';
        const camps = Object.keys(datos).join(', ');
        const valors = Object.values(datos).map(v => `'${v}'`).join(', ');
        
        await db.query(`INSERT INTO ${tableDB} (${camps}) VALUES (${valors})`);
        res.redirect(`/${taula}`);
    } catch (e) { res.status(500).send("Error al crear"); }
});

app.post('/Update', async (req, res) => {
    try {
        const { taula, id, ...datos } = req.body;
        const tableDB = (taula === 'productes') ? 'products' : 'customers';
        const updates = Object.keys(datos).map(key => `${key}='${datos[key]}'`).join(', ');
        
        await db.query(`UPDATE ${tableDB} SET ${updates} WHERE id = ${id}`);
        res.redirect(`/${taula}`);
    } catch (e) { res.status(500).send("Error al editar"); }
});

app.post('/Delete', async (req, res) => {
    try {
        const { taula, id } = req.body;
        const tableDB = (taula === 'productes') ? 'products' : 'customers';
        await db.query(`DELETE FROM ${tableDB} WHERE id = ${id}`);
        res.redirect(`/${taula}`);
    } catch (e) { res.status(500).send("Error al eliminar"); }
});

// 6. Engegar servidor
app.listen(port, () => {
    console.log(`Servidor funcionant a http://localhost:${port}`);
});