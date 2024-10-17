import { Resend } from "resend";


const resend = new Resend(API_KEY_RESEND); // Reemplaza con tu clave API de Resend

export const sendMailing = async (req, res) => {
  try {
    const { to, subject, text } = req.body; // Captura los campos desde el body (enviados por el frontend)

    // Verifica si los campos requeridos están presentes
    if (!to || !subject || !text) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    // Envía el email a través de Resend
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",  // Aquí puedes personalizar el 'from'
      to: [to], // Recibe el correo del destinatario
      subject: subject,
      html: `<p>${text}</p>`,  // El mensaje lo enviamos en formato HTML
    });

    // Si ocurre un error en el envío del correo
    if (error) {
      return res.status(400).json({ error: "Error al enviar el correo" });
    }

    // Respuesta exitosa
    res.status(200).json({ message: "Correo enviado exitosamente", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
