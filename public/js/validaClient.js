document.getElementById('formClient').addEventListener('submit', function(e) {
    let isValid = true;
    const email = document.getElementById('email');
    const name = document.getElementById('name');

    // Netejar errors previs
    document.querySelectorAll('.error-text').forEach(el => el.innerText = '');
    
    if (name.value.length < 3) {
        document.getElementById('err-name').innerText = "Nom massa curt";
        name.style.borderColor = "red";
        isValid = false;
    }

    if (!email.value.includes('@')) {
        document.getElementById('err-email').innerText = "Email no vàlid";
        email.style.borderColor = "red";
        isValid = false;
    }

    if (!isValid) e.preventDefault();
});