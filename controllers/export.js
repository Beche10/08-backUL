import ExcelJS from "exceljs";
import { Afiliado } from "../models/afiliado.js";

export const exportAfiliadosToExcel = async (req, res) => {
  try {
    // Consulta de los afiliados en MongoDB
    const afiliados = await Afiliado.find();

    // Crear un nuevo workbook de Excel
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Listado de afiliados", {
      views: [{ state: "frozen", ySplit: 1 }],
      properties: { tabColor: { argb: "FFE1BEE7" } },
    });

    // Definir las columnas del archivo Excel
    worksheet.columns = [
      { header: "Fecha", key: "fecha", width: 10 },
      { header: "Nombre", key: "nombre", width: 20 },
      { header: "DNI", key: "dni", width: 10 },
      { header: "Correo", key: "correo", width: 30 },
      { header: "FN", key: "fechaNacimiento", width: 10 },
      { header: "Domicilio", key: "domicilio", width: 30 },
      { header: "Celular", key: "celular", width: 15 },
      { header: "País", key: "pais", width: 5 },
      { header: "Provincia", key: "provincia", width: 15 },
      { header: "Departamento", key: "departamento", width: 15 },
      { header: "Estado Civil", key: "estadoCivil", width: 15 },
      { header: "Ocupación", key: "ocupacion", width: 15 },
      { header: "Firma", key: "firma", width: 50 },
      { header: "Documentación", key: "fotosDni", width: 50 },
    ];

    // Establecer estilos en encabezado
    const headerStyles = {
      font: { bold: true, size: 12, color: { argb: "ffffff" } },
      fill: { type: "pattern", pattern: "solid", fgColor: { argb: "883EEA" } },
    };
    worksheet.getRow(1).eachCell((cell) => Object.assign(cell, headerStyles ))

    // Añade fila de afiliados
    worksheet.addRows(afiliados);

    // Estilo para las filas de datos (alineación a la izquierda)
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 0) {
        row.eachCell((cell) => {
          cell.alignment = { horizontal: "left" }; // Alinear a la izquierda
        });
      }
    });

    // Escribir el archivo en un buffer y enviarlo como respuesta
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="Listado de afiliados.xlsx"'
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Error al exportar los datos a Excel:", error);
    res.status(500).json({
      msg: "Error al exportar los datos a Excel.",
      error: error.message || error,
    });
  }
};
