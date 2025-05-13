import express from "express";
import dbtable from "../controller/table.js";
import authController from "../controller/auth.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.get("/login", (req, res) => {
    res.render("login");
})

router.get("/database", dbtable.table);

router.get("/edit/:Id", authController.edit);

router.get("/profile/:Id", authController.profile);

router.get("/home/:Id", authController.home);

router.get("/dashboard/:Id", authController.dashboard);

export default router;