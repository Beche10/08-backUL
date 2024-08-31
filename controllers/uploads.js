import { response } from "express";

export const uploads = (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({ msg: "El contenedor no tiene ningun archivo." });
    return;
  }

  const { archivo } = req.files;

  uploadPath = __dirname + "/uploads/" + sampleFile.name;

  sampleFile.mv(uploadPath, function (err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.send("File uploaded to " + uploadPath);
  });

  res.json({
    msg: "Soy el archivo subido",
  });
};
