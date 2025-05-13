import express from "express";
import authController from "../controller/auth.js";

const router = express.Router();

router.post("/register", authController.register);

router.post("/delete", authController.delete);

router.post("/signin", authController.signin);

router.post("/update", authController.update);


export default router;