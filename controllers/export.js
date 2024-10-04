import ExcelJS from "exceljs";
import Afiliado from "./models/Afiliado"; // Importar tu modelo

// Función para exportar los datos de Afiliados a Excel
export const exportAfiliadosToExcel = async (req, res) => {
  try {
    // Obtener todos los afiliados desde MongoDB
    const afiliados = await Afiliado.find();

    // Crear un nuevo Workbook de Excel
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Afiliados");

    // Añadir las columnas con los encabezados correspondientes
    worksheet.columns = [
      { header: "Nombre", key: "nombre", width: 30 },
      { header: "DNI", key: "dni", width: 20 },
      { header: "Correo", key: "correo", width: 30 },
      { header: "Fecha Nacimiento", key: "fechaNacimiento", width: 20 },
      { header: "Domicilio", key: "domicilio", width: 40 },
      { header: "Celular", key: "celular", width: 20 },
      { header: "País", key: "pais", width: 20 },
      { header: "Provincia", key: "provincia", width: 20 },
      { header: "Departamento", key: "departamento", width: 20 },
      { header: "Estado Civil", key: "estadoCivil", width: 15 },
      { header: "Ocupación", key: "ocupacion", width: 20 },
      { header: "Firma", key: "firma", width: 30 },
      { header: "Fotos DNI", key: "fotosDni", width: 40 },
      { header: "Fecha de Registro", key: "fecha", width: 20 },
    ];

    // Agregar las filas de los afiliados
    afiliados.forEach((afiliado) => {
      worksheet.addRow({
        nombre: afiliado.nombre,
        dni: afiliado.dni,
        correo: afiliado.correo,
        fechaNacimiento: afiliado.fechaNacimiento.toISOString().split("T")[0], // Formato de fecha YYYY-MM-DD
        domicilio: afiliado.domicilio,
        celular: afiliado.celular,
        pais: afiliado.pais,
        provincia: afiliado.provincia || "N/A", // Si es otro país, se deja en 'N/A'
        departamento: afiliado.departamento || "N/A", // Si no aplica, se deja en 'N/A'
        estadoCivil: afiliado.estadoCivil,
        ocupacion: afiliado.ocupacion,
        firma: afiliado.firma, // Asumiendo que es una URL o base64
        fotosDni: afiliado.fotosDni.join(", "), // Unir múltiples fotos en una celda
        fecha: afiliado.fecha.toISOString().split("T")[0], // Formato de fecha
      });
    });

    // Configuración de la respuesta para enviar el archivo Excel
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=afiliados.xlsx");

    // Enviar el archivo al cliente
    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error("Error al exportar afiliados a Excel:", err);
    res.status(500).send("Error al exportar los datos a Excel");
  }
};
