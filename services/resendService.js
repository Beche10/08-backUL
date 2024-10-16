import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (to, subject, htmlContent) => {
  try {
    const response = await resend.emails.send({
      from: 'no-reply@tudominio.com',
      to,
      subject,
      html: htmlContent,
    });
    console.log('Correo enviado:', response);
    return response;
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    throw new Error('Error al enviar el correo');
  }
};

