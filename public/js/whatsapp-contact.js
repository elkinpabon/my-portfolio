// WhatsApp Contact Handler
document.addEventListener('DOMContentLoaded', function() {
    const whatsappBtn = document.getElementById('whatsappBtn');
    
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Número de WhatsApp
            const phoneNumber = '593995473517';
            
            // Mensaje profesional para solicitud de cotización
            const message = `Hola Elkinext Solutions,

Me gustaría solicitar una cotización para un producto de desarrollo de software.`;
            
            // Codificar el mensaje para URL
            const encodedMessage = encodeURIComponent(message);
            
            // URL de WhatsApp con el mensaje
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            
            // Abrir en nueva ventana/pestaña
            window.open(whatsappURL, '_blank');
        });
    }
});
