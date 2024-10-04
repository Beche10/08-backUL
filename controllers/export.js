import path from "path";
import ExcelJS from "exceljs";
import { Afiliado } from "../models/afiliado.js";

export const exportAfiliadosToExcel = async (req, res) => {
  try {
    // Consulta de los afiliados en MongoDB
    const afiliados = await Afiliado.find();

    // Crear un nuevo workbook de Excel
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Afiliados");

    // Definir las columnas del archivo Excel
    worksheet.columns = [
      { header: "Fecha", key: "fecha", width: 20 },
      { header: "Nombre", key: "nombre", width: 20 },
      { header: "DNI", key: "dni", width: 15 },
      { header: "Correo", key: "correo", width: 25 },
      { header: "Fecha de Nacimiento", key: "fechaNacimiento", width: 20 },
      { header: "Domicilio", key: "domicilio", width: 30 },
      { header: "Celular", key: "celular", width: 15 },
      { header: "País", key: "pais", width: 15 },
      { header: "Provincia", key: "provincia", width: 15 },
      { header: "Departamento", key: "departamento", width: 15 },
      { header: "Estado Civil", key: "estadoCivil", width: 15 },
      { header: "Ocupación", key: "ocupacion", width: 15 },
      { header: "Firma", key: "firma", width: 50 },
      { header: "Documentación", key: "fotosDni", width: 50 },
    ];

    worksheet.addRows(afiliados); // Suponiendo que 'afiliados' es un array de datos

    // Escribir el archivo en un buffer y enviarlo como respuesta
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="afiliados.xlsx"'
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Error al exportar los datos a Excel:", error); // Log detallado
    res.status(500).json({
      msg: "Error al exportar los datos a Excel.",
      error: error.message || error,
    });
  }
};
