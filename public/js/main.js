function init() {
    // 1. Selector de Temes (LocalStorage)
    const selTema = document.querySelector('#selTema');
    if (selTema) {
        const tema = localStorage.getItem('tema') || 'clar';
        document.body.className = 'tema-' + tema; // Assegura't que al CSS uses .tema-nit, etc.
        selTema.value = tema;
        selTema.addEventListener('change', () => {
            document.body.className = 'tema-' + selTema.value;
            localStorage.setItem('tema', selTema.value);
        });
    }

    // 2. Validació Avançada (Productes i Clients)
    const forms = document.querySelectorAll('form'); 
    forms.forEach(frm => {
        frm.addEventListener('submit', (e) => {
            let valid = true;
            // Netejar errors previs
            frm.querySelectorAll('.error-msg').forEach(el => el.innerText = '');
            frm.querySelectorAll('input').forEach(el => el.style.borderColor = '');

            // Validació segons el tipus de formulari (mirant el camp hidden 'taula')
            const taula = frm.querySelector('input[name="taula"]')?.value;

            if (taula === 'productes') {
                const nom = frm.querySelector('input[name="name"]');
                const preu = frm.querySelector('input[name="price"]');
                const stock = frm.querySelector('input[name="stock"]');

                if (nom.value.length < 3) {
                    showError(nom, "Nom massa curt (mínim 3)");
                    valid = false;
                }
                if (parseFloat(preu.value) <= 0) {
                    showError(preu, "El preu ha de ser positiu");
                    valid = false;
                }
                if (parseInt(stock.value) < 0 || isNaN(stock.value)) {
                    showError(stock, "Stock no vàlid");
                    valid = false;
                }
            }

            if (taula === 'clients') {
                const email = frm.querySelector('input[name="email"]');
                const nom = frm.querySelector('input[name="name"]');
                if (!email.value.includes('@')) {
                    showError(email, "Format d'email incorrecte");
                    valid = false;
                }
                if (nom.value === "") {
                    showError(nom, "El nom és obligatori");
                    valid = false;
                }
            }

            if (!valid) e.preventDefault();
        });
    });

    // 3. Toggles del Dashboard (KPI i Llistats)
    const btnKpi = document.querySelector('#toggleKpiMode');
    if (btnKpi) {
        btnKpi.addEventListener('click', () => {
            // Alterna entre mostrar o amagar els elements extres del KPI
            document.querySelectorAll('.kpi-extra').forEach(el => {
                el.classList.toggle('d-none');
            });
        });
    }

    const btnColors = document.querySelector('#toggleColorsStock');
    if (btnColors) {
        btnColors.addEventListener('click', () => {
            const files = document.querySelectorAll('tr[data-stock]');
            files.forEach(fila => {
                const stock = parseInt(fila.dataset.stock);
                // Si ja té classe de color, la treiem, si no, la posem
                if (fila.classList.contains('stock-color-on')) {
                    fila.style.backgroundColor = "";
                    fila.classList.remove('stock-color-on');
                } else {
                    fila.classList.add('stock-color-on');
                    if (stock <= 5) fila.style.backgroundColor = "#ffcccc"; // Vermell
                    else if (stock <= 20) fila.style.backgroundColor = "#ffe6b3"; // Taronja
                    else fila.style.backgroundColor = "#ccffcc"; // Verd
                }
            });
        });
    }
}

// Funció auxiliar per mostrar errors sota el camp (requisits)
function showError(input, message) {
    input.style.borderColor = "red";
    // Busquem un element següent amb classe error-msg o el creem
    let errorSpan = input.parentNode.querySelector('.error-msg');
    if (!errorSpan) {
        errorSpan = document.createElement('small');
        errorSpan.className = 'error-msg';
        errorSpan.style.color = "red";
        errorSpan.style.display = "block";
        input.parentNode.appendChild(errorSpan);
    }
    errorSpan.innerText = message;
}