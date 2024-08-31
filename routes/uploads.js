import { Router } from "express";
import { check } from "express-validator";
import { handleValidate } from "../middlewares/handleValidate.js";
import { uploads } from "../controllers/uploads.js";

export const uploadRouter = Router();

uploadRouter.post("/", uploads);
uploadRouter.put("/:colecccion/:id", [], );
