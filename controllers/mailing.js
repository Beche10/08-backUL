import { Resend } from "resend"; // Instalar esta librería con `npm install resend`

const resend = new Resend(process.env.API_KEY_RESEND);

export const sendEmail = async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    const emailData = {
      from: "no-reply@tu-dominio.com", // Cambiar por tu email de envío
      to,
      subject,
      text,
    };

    // Llamada a la API de Resend
    const result = await resend.emails.send(emailData);

    res.status(200).json({
      msg: "Email enviado con éxito",
      result,
    });
  } catch (error) {
    console.error("Error enviando email:", error);
    res.status(500).json({
      msg: "Error al enviar email",
      error,
    });
  }
};
