function init() {
    // 1. Selector de Temes (LocalStorage)
    const selTema = document.querySelector('#selTema');
    if (selTema) {
        const tema = localStorage.getItem('tema') || 'clar';
        document.body.className = 'tema-' + tema;
        selTema.value = tema;
        selTema.addEventListener('change', () => {
            document.body.className = 'tema-' + selTema.value;
            localStorage.setItem('tema', selTema.value);
        });
    }

    // 2. Validació
    const frm = document.querySelector('#frmProducte');
    if (frm) {
        frm.addEventListener('submit', (e) => {
            const preu = document.querySelector('#inpPreu').valueAsNumber;
            if (preu <= 0) {
                alert("El preu ha de ser major que 0");
                e.preventDefault();
            }
        });
    }
}