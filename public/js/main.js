document.addEventListener('DOMContentLoaded', () => {
    
    // 1. GESTIÓ DE TEMES
    const themeSelector = document.getElementById('themeSelector');
    const savedTheme = localStorage.getItem('erp-tema') || 'tema-clar';
    
    // Apliquem el tema guardat al body
    document.body.className = savedTheme;
    if(themeSelector) themeSelector.value = savedTheme;

    themeSelector?.addEventListener('change', (e) => {
        const selectedTheme = e.target.value;
        document.body.className = selectedTheme;
        localStorage.setItem('erp-tema', selectedTheme);
    });

    // 2. LÒGICA DE PESTANYES
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Activar botó
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Mostrar secció
            const target = tab.dataset.target;
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.add('d-none');
            });
            document.getElementById(target).classList.remove('d-none');
        });
    });

    // 3. TOGGLES DEL DASHBOARD
    document.getElementById('btnToggleTauler')?.addEventListener('click', () => {
        document.querySelectorAll('.kpi-extra').forEach(el => {
            el.classList.toggle('d-none');
        });
    });

    document.getElementById('btnToggleColors')?.addEventListener('click', () => {
        // Apliquem la classe de color a les cards i files de stock
        document.querySelectorAll('.card, .stock-val').forEach(el => {
            el.classList.toggle('stock-color-on');
        });
    });
});