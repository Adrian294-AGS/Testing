import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config({path: "./.env"});

const db = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

const dbtable = {
    table: (req, res) => {
        db.query("SELECT * FROM tbl_users",(error, results) => {
            if(error){
                console.log(error);
            } else if(results.length == 0){
                res.render("db_table_user", {insert_msg: "There is no Account"});
            }
             else {
                res.render("db_table_user", {data: results});
            }
        });
    }
}

export default dbtable;