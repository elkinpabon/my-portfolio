const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configurar nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'elkindres2@gmail.com',
        pass: process.env.EMAIL_PASS || 'tu_contraseña_de_aplicacion'
    }
});

// Endpoint para enviar emails de contacto
app.post('/api/contact', async (req, res) => {
    console.log('📧 Solicitud de contacto recibida:', req.body);
    
    try {
        const { name, email, subject, message } = req.body;
        
        // Validación básica
        if (!name || !email || !subject || !message) {
            console.log('❌ Validación fallida: campos faltantes');
            return res.status(400).json({ 
                success: false, 
                message: 'Todos los campos son requeridos' 
            });
        }

        console.log('✅ Validación exitosa, preparando email...');

        // Configurar el email
        const mailOptions = {
            from: email,
            to: 'elkindres2@gmail.com',
            subject: `Nuevo mensaje de contacto: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                    <h2 style="color: #333; text-align: center; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
                        🚀 Nuevo Mensaje de Contacto - Elkinext Solutions
                    </h2>
                    
                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <h3 style="color: #4CAF50; margin-top: 0;">📋 Información del Cliente:</h3>
                        <p><strong>👤 Nombre/Empresa:</strong> ${name}</p>
                        <p><strong>📧 Email:</strong> ${email}</p>
                        <p><strong>🎯 Tipo de Proyecto:</strong> ${getProjectType(subject)}</p>
                    </div>
                    
                    <div style="background-color: #fff; padding: 15px; border-left: 4px solid #4CAF50;">
                        <h3 style="color: #333; margin-top: 0;">💬 Mensaje:</h3>
                        <p style="line-height: 1.6; color: #555;">${message.replace(/\n/g, '<br>')}</p>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px; padding: 20px; background-color: #f0f8ff; border-radius: 5px;">
                        <p style="margin: 0; color: #666; font-size: 14px;">
                            📅 Recibido el: ${new Date().toLocaleString('es-ES')}
                        </p>
                        <p style="margin: 5px 0 0 0; color: #666; font-size: 12px;">
                            Responder a: <a href="mailto:${email}" style="color: #4CAF50;">${email}</a>
                        </p>
                    </div>
                </div>
            `
        };

        console.log('📤 Enviando email...');

        // Enviar el email
        const info = await transporter.sendMail(mailOptions);
        
        console.log('✅ Email enviado exitosamente. ID:', info.messageId);
        
        res.json({ 
            success: true, 
            message: '¡Correo enviado exitosamente! Gracias por consultar con nosotros',
            messageId: info.messageId
        });

    } catch (error) {
        console.error('❌ Error al enviar email:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error interno del servidor. Inténtalo de nuevo.' 
        });
    }
});

// Función auxiliar para obtener el tipo de proyecto
function getProjectType(subject) {
    const types = {
        'web': '🌐 Aplicación Web',
        'mobile': '📱 Aplicación Móvil', 
        'desktop': '🖥️ Aplicación de Escritorio',
        'ecommerce': '🛒 E-commerce',
        'inventory': '📦 Sistema de Inventarios',
        'enterprise': '🏢 Sistema Empresarial',
        'other': '🔧 Otro'
    };
    return types[subject] || '🔧 No especificado';
}

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint de prueba para verificar que el servidor funciona
app.get('/api/test', (req, res) => {
    console.log('🧪 Test endpoint llamado');
    res.json({ 
        success: true, 
        message: 'Servidor funcionando correctamente',
        timestamp: new Date().toISOString()
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});