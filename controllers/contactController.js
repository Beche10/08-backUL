import { Consulta } from '../models/consultas.js';
import { sendEmail } from '../services/mailService.js';


// Controlador para manejar las consultas de los usuarios
export const enviarConsulta = async (req, res) => {
  const { nombre, correo, mensaje } = req.body;

  try {
    // 1. Guardar la consulta en la base de datos
    const nuevaConsulta = new Consulta({ nombre, correo, mensaje });
    await nuevaConsulta.save();

    // 2. Preparar el contenido del correo
    const htmlContent = `
      <h1>Nueva consulta de ${nombre}</h1>
      <p><strong>Correo:</strong> ${correo}</p>
      <p><strong>Mensaje:</strong> ${mensaje}</p>
    `;

    // 3. Enviar el correo al soporte
    await sendEmail(
      'soporte@tuempresa.com', // Correo del equipo de soporte
      'Nueva consulta de usuario',
      htmlContent
    );

    // Responder al cliente que el proceso fue exitoso
    res.status(200).json({
      msg: 'Consulta enviada y almacenada correctamente.',
    });
  } catch (error) {
    console.error('Error al enviar la consulta:', error);
    res.status(500).json({
      msg: 'Hubo un error al enviar la consulta.',
      error,
    });
  }
};
