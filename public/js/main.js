document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SISTEMA DE TEMES ---
    const selTema = document.querySelector('#selTema');
    const body = document.body;

    const aplicarTema = (tema) => {
        // Tu CSS usa .tema-clar, .tema-nit, etc.
        body.classList.remove('tema-clar', 'tema-nit', 'tema-contrast');
        body.classList.add('tema-' + tema);
        localStorage.setItem('tema', tema);
    };

    if (selTema) {
        const temaGuardat = localStorage.getItem('tema') || 'clar';
        aplicarTema(temaGuardat);
        selTema.value = temaGuardat;

        selTema.addEventListener('change', () => {
            aplicarTema(selTema.value);
        });
    }

    // --- 2. VALIDACIÓ DE FORMULARIS ---
    const forms = document.querySelectorAll('form'); 
    forms.forEach(frm => {
        frm.addEventListener('submit', (e) => {
            let valid = true;
            
            // Netejar errors previs (usant la teva classe .error-input)
            frm.querySelectorAll('.error-msg').forEach(el => el.remove());
            frm.querySelectorAll('input').forEach(el => el.classList.remove('error-input'));

            const taula = frm.querySelector('input[name="taula"]')?.value;

            if (taula === 'productes') {
                const nom = frm.querySelector('input[name="name"]');
                const preu = frm.querySelector('input[name="price"]');
                const stock = frm.querySelector('input[name="stock"]');

                if (nom && nom.value.length < 3) {
                    showError(nom, "Nom massa curt (mínim 3)");
                    valid = false;
                }
                if (preu && parseFloat(preu.value) <= 0) {
                    showError(preu, "El preu ha de ser positiu");
                    valid = false;
                }
                if (stock && (parseInt(stock.value) < 0 || isNaN(stock.value))) {
                    showError(stock, "Stock no vàlid");
                    valid = false;
                }
            }

            if (taula === 'clients') {
                const email = frm.querySelector('input[name="email"]');
                const nom = frm.querySelector('input[name="name"]');
                if (email && !email.value.includes('@')) {
                    showError(email, "Format d'email incorrecte");
                    valid = false;
                }
                if (nom && nom.value.trim() === "") {
                    showError(nom, "El nom és obligatori");
                    valid = false;
                }
            }

            if (!valid) e.preventDefault();
        });
    });

    // --- 3. TOGGLES (KPI i STOCK) ---
    const btnKpi = document.querySelector('#toggleKpiMode');
    if (btnKpi) {
        btnKpi.addEventListener('click', () => {
            document.querySelectorAll('.kpi-extra').forEach(el => el.classList.toggle('d-none'));
        });
    }

    const btnColors = document.querySelector('#toggleColorsStock');
    if (btnColors) {
        btnColors.addEventListener('click', () => {
            // Aplica la teva lògica de classes CSS per a stock
            const files = document.querySelectorAll('tr[data-stock]');
            files.forEach(fila => {
                const stock = parseInt(fila.dataset.stock);
                fila.classList.toggle('stock-color-on');
                
                if (fila.classList.contains('stock-color-on')) {
                    if (stock <= 5) fila.classList.add('critic');
                    else if (stock <= 20) fila.classList.add('baix');
                    else fila.classList.add('ok');
                } else {
                    fila.classList.remove('critic', 'baix', 'ok');
                }
            });
        });
    }
});

function showError(input, message) {
    input.classList.add('error-input'); // Classe del teu CSS
    let errorSpan = document.createElement('small');
    errorSpan.className = 'error-msg'; // Classe del teu CSS
    errorSpan.innerText = message;
    input.insertAdjacentElement('afterend', errorSpan);
}