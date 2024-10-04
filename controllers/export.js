import { Afiliado } from "../models/afiliado.js" 
import ExcelJS from "exceljs";
import path from "path";

export const exportAfiliadosToExcel = async (req, res) => {
  try {
    // Consulta de los afiliados en MongoDB
    const afiliados = await Afiliado.find();

    // Crear un nuevo workbook de Excel
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Afiliados");

    // Definir las columnas del archivo Excel
    worksheet.columns = [
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
    ];

    // Agregar filas al worksheet
    afiliados.forEach((afiliado) => {
      worksheet.addRow(afiliado);
    });

    // Escribir archivo en el sistema temporal o enviarlo directamente
    const tempFilePath = path.join(__dirname, "../tmp/afiliados.xlsx");
    await workbook.xlsx.writeFile(tempFilePath);

    // Descargar archivo
    res.download(tempFilePath, "afiliados.xlsx");

  } catch (error) {
    res.status(500).json({
      msg: "Error al exportar los datos a Excel.",
      error,
    });
  }
};