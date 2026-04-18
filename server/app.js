const express = require('express');
const path = require('path');
const hbs = require('hbs');
const MySQL = require('./utilsMySQL'); // Se mantiene igual porque están en la misma carpeta

const app = express();
const port = 3000;

// 1. Detecció de Proxmox i connexió a BD
const isProxmox = !!process.env.PM2_HOME;
const db = new MySQL();

if (!isProxmox) {
  db.init({ host: '127.0.0.1', port: 3306, user: 'root', password: '', database: 'minierp_db' });
} else {
  db.init({ host: '127.0.0.1', port: 3306, user: 'super', password: '1234', database: 'minierp_db' });
}

// 2. Configuració de rutes estàtiques (public/css i public/js)
// Subimos un nivel (..) porque public está fuera de la carpeta server
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.urlencoded({ extended: true }));

// 3. Configuració de Vistes
// Como ya estamos en la carpeta 'server', no la añadimos a la ruta
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

// 4. Helpers per a les plantilles
hbs.registerHelper('colorStock', (stock) => {
    if (stock <= 5) return 'stock-critic';
    if (stock <= 15) return 'stock-baix';
    return 'stock-ok';
});

// 5. Rutes del MiniERP
app.get('/', async (req, res) => {
    try {
        const rows = await db.query('SELECT * FROM products WHERE stock <= 5');
        res.render('index', { 
            layout: 'layouts/main',
            alertesStock: rows.length,
            vendesAvui: "150.00" 
        });
    } catch (e) { res.status(500).send(e.message); }
});

app.get('/productes', async (req, res) => {
    try {
        const pagina = parseInt(req.query.pagina) || 0;
        const cerca = req.query.cerca || '';
        const limit = 10;
        const offset = pagina * limit;

        const rows = await db.query(`SELECT * FROM products WHERE name LIKE '%${cerca}%' LIMIT ${limit} OFFSET ${offset}`);
        const productesJson = db.table_to_json(rows, { id: 'number', name: 'string', price: 'number', stock: 'number' });

        res.render('productes', {
            layout: 'layouts/main',
            productes: productesJson,
            pagina, cerca,
            next: pagina + 1,
            prev: pagina > 0 ? pagina - 1 : 0
        });
    } catch (e) { res.status(500).send("Error a Productes"); }
});

// 6. Engegar servidor
app.listen(port, () => {
    console.log(`Servidor funcionant a http://localhost:${port}`);
});