document.getElementById('formClient').addEventListener('submit', function(e) {
    let isValid = true;
    const email = document.getElementById('email');
    const name = document.getElementById('name');

    // 1. Netejar errors i estils previs
    // Canviem .error-text per .error-msg per coincidir amb el teu CSS
    document.querySelectorAll('.error-msg').forEach(el => el.innerText = '');
    
    // Netegem el color de vora de tots els inputs del form
    this.querySelectorAll('input').forEach(input => {
        input.style.borderColor = ""; 
    });
    
    // 2. Validació del Nom
    if (name.value.trim().length < 3) {
        const errNom = document.getElementById('err-name');
        if (errNom) errNom.innerText = "El nom ha de tenir almenys 3 caràcters";
        name.style.borderColor = "var(--danger)"; // Usem la teva variable CSS
        isValid = false;
    }

    // 3. Validació de l'Email
    if (!email.value.includes('@') || email.value.length < 5) {
        const errEmail = document.getElementById('err-email');
        if (errEmail) errEmail.innerText = "Introdueix un correu electrònic vàlid";
        email.style.borderColor = "var(--danger)";
        isValid = false;
    }

    // 4. Aturar l'enviament si no és vàlid
    if (!isValid) {
        e.preventDefault();
        console.log("Formulari aturat: dades no vàlides");
    }
});