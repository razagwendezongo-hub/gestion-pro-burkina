// Génération d'un code aléatoire à 6 chiffres
function genererCodeVerification() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Envoi du code (par Email ou WhatsApp)
function envoyerCodeVerification(destinataire, canal = 'email') {
    const code = genererCodeVerification();
    
    // Stockage temporaire (valide 5 minutes)
    localStorage.setItem('temp_verification_code', code);
    localStorage.setItem('temp_verification_expire', Date.now() + 5 * 60 * 1000);

    if (canal === 'email') {
        console.log(`Code Email pour ${destinataire} : ${code}`);
        alert(`Un code de vérification a été envoyé à votre email : ${destinataire}\n(Code de test : ${code})`);
    } else if (canal === 'whatsapp') {
        const message = encodeURIComponent(`Votre code de vérification Gestion Financière Pro est : ${code}`);
        const urlWhatsApp = `https://wa.me/${destinataire}?text=${message}`;
        window.open(urlWhatsApp, '_blank');
    }
}

// Vérification du code saisi par l'utilisateur
function verifierCodeSaisi(codeUtilisateur) {
    const codeStocke = localStorage.getItem('temp_verification_code');
    const expiration = localStorage.getItem('temp_verification_expire');

    if (!codeStocke || Date.now() > expiration) {
        alert("Le code a expiré ou est invalide. Veuillez en demander un nouveau.");
        return false;
    }

    if (codeUtilisateur === codeStocke) {
        alert("Vérification réussie ! Compte validé.");
        localStorage.removeItem('temp_verification_code');
        localStorage.removeItem('temp_verification_expire');
        return true;
    } else {
        alert("Code incorrect. Veuillez réessayer.");
        return false;
    }
}