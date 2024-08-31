import path from "path";
import { fileURLToPath } from "url"; // Necesario para calcular __dirname
import { v4 as uuidv4 } from "uuid";

export const uploadFile = (
  files,
  extensionesValidas = ["png", "jpg", "jpeg"],
  carpeta = ""
) => {
  return new Promise((resolve, reject) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const { archivo } = files;
    const nombreCortado = archivo.name.split(".");
    const extension = nombreCortado[nombreCortado.length - 1];

    // Validar extension
    if (!extensionesValidas.includes(extension)) {
      return reject(`La extension ${extension} no es permitida - ${extension}`);
    }

    const nombreTemp = uuidv4() + "." + extension;
    const uploadPath = path.join(
      __dirname,
      "../uploads/",
      carpeta,
      nombreTemp
    );

    archivo.mv(uploadPath, (err) => {
      if (err) {
        return reject(err);
      }

      resolve(nombreTemp);
    });
  });
};
