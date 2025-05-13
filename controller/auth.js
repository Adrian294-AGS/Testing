import mysql from "mysql";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config({ path: './.env' });

const db = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

const authController = {
    register: (req, res) => {
        console.log(req.body);

        const { username, email, password, FirstName, LastName } = req.body;

        async function insert_db(string, values) {
            db.query(string, values, (error, results) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log("success inserting");
                }
            });
        }

        db.query("SELECT Email FROM tbl_users WHERE Email = ?", [email], async (error, results) => {
            if (error) {
                console.log(error);
            }

            if (results.length > 0) {
                res.render("register", {
                    message: `${email} is already created`,
                    register_msg: "Register Failed"
                });
            } else {
                let hashedPassword = await bcrypt.hash(password, 8);
                console.log(hashedPassword);
                await insert_db("INSERT INTO tbl_users (Email, UserName, FirstName, LastName, Password) VALUES (?, ?, ?, ?, ?)", [email, username, FirstName, LastName, password]);
                res.redirect("/login");
            }

        });
    },

    delete: (req, res) => {
        const Id = req.body.Id;

        db.query("DELETE FROM tbl_users where ID = ?", [Id], (error, results) => {
            if (error) {
                console.log(error);
            }
            else {
                res.redirect("/database");
            }
        });
    },

    signin: (req, res) => {
        const { email, username, password } = req.body;

        db.query("SELECT * FROM tbl_users WHERE Email = ?", [email], async (error, results) => {
            if (error) {
                console.log(error);
            }

            if (results.length === 0) {
                res.render("login", { signin_msg1: `${email} is not created` });
            } else {
                const user = results[0];
                if (user.UserName !== username) {
                    res.render("login", { signin_msg2: `Wrong Username` });
                } else if (password !== user.Password) {
                    res.render("login", { signin_msg3: `Wrong Password` });
                } else {
                    res.render("home", { data: results});
                }
            }
        });
    },

    edit: (req, res) => {
        const Id = req.params.Id;

        db.query("SELECT * FROM tbl_users WHERE ID = ?", [Id], (error, results) => {
            if (results.length > 0) {
                res.render("edit_user", { data: results });
            } else {
                console.log(error);
            }
        });
    },

    update: (req, res) => {
        const { Id, email, username, FirstName, LastName, password } = req.body;
        db.query("UPDATE tbl_users SET Email = ?, UserName = ?, FirstName = ?, LastName = ?, Password = ? WHERE ID = ?", [email, username, FirstName, LastName, password, Id], (error, results) => {
            if(error){
                console.log(error);
            } else {
                res.redirect("/database");
            }

            
        });
    },

    profile: (req, res) => {
        const Id = req.params.Id;

        db.query("SELECT * FROM tbl_users WHERE ID = ? ", [Id], (error, results) => {
            if (error) {
                console.log(error);
            } else {
                res.render("profile", {data: results});
            }
        });
    },

    home: (req, res) => {
        const Id = req.params.Id;

        db.query("SELECT * FROM tbl_users WHERE ID = ? ", [Id], (error, results) => {
            if (error) {
                console.log(error);
            } else {
                res.render("home", {data: results});
            }
        });
    },

    dashboard: (req, res) => {
        const Id = req.params.Id;

        db.query("SELECT * FROM tbl_users WHERE ID = ? ", [Id], (error, results) => {
            if (error) {
                console.log(error);
            } else {
                res.render("dashboard", {data: results});
            }
        });
    }


};

export default authController;