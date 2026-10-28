// Génération d'un code aléatoire à 6 chiffres
function genererCodeVerification() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Envoi d'un VRAI e-mail via EmailJS
async function envoyerCodeVerificationEmail(emailDestinataire) {
    const code = genererCodeVerification();
    
    // Stockage temporaire (valide 5 minutes)
    localStorage.setItem('temp_verification_code', code);
    localStorage.setItem('temp_verification_expire', Date.now() + 5 * 60 * 1000);

    const parametresEmail = {
        email: emailDestinataire, // Correspond à l'e-mail du destinataire dans votre template
        passcode: code,           // Correspond au code à 6 chiffres dans votre template
        time: "5 minutes"
    };

    try {
        await emailjs.send('service_fxs3mug', 'template_u56u5jz', parametresEmail, {
            publicKey: 'jLxh0MKr4Ev3PCepR',
        });
        alert(`Un e-mail contenant votre code de vérification a été envoyé à ${emailDestinataire}. Vérifiez votre boîte de réception !`);
        return true;
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'e-mail :", error);
        alert("Impossible d'envoyer l'e-mail de vérification. Veuillez réessayer.");
        return false;
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