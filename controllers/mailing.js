import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY); // Asegúrate de configurar tu API key en las variables de entorno

export const sendMailing = async (req, res) => {
  const { to, subject, text, html } = req.body; // Recibir los datos del correo desde el cuerpo de la solicitud

  try {
    // Enviar el correo electrónico utilizando Resend
    const response = await resend.emails.send({
      from: "tucorreo@tu-dominio.com", // Cambia esto por el remitente
      to,
      subject,
      text, // Texto plano opcional
      html, // Contenido HTML opcional para el correo
    });

    // Respuesta exitosa
    res
      .status(200)
      .json({ message: "Correo enviado exitosamente", data: response });
  } catch (error) {
    // Manejo de errores
    console.error("Error al enviar el correo:", error);
    res.status(500).json({ message: "Error al enviar el correo", error });
  }
};
