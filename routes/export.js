import { Router } from "express";
import { exportAfiliadosToExcel } from "../controllers/export";


export const exportToExcelRouter = Router();


// Ruta GET para enviar todas las consultas
exportToExcelRouter.get("/", exportAfiliadosToExcel);




