import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();

// Configurar el transporte de Nodemailer usando las variables de entorno
const transporter = nodemailer.createTransport({
  service: 'gmail', // Puedes cambiarlo si usas otro proveedor como Outlook
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Función para enviar correos
export const sendEmail = async (to, subject, htmlContent) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,  // Remitente (tu correo)
    to,                            // Destinatario (correo al que se envía)
    subject,                       // Asunto del correo
    html: htmlContent,             // Contenido en formato HTML
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado correctamente.');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    throw new Error('No se pudo enviar el correo.');
  }
};
