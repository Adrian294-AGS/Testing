import express from "express";
import path from "path";
import pageRoutes from "../routes/page.js";
import { fileURLToPath } from 'url';
import authpage from "../routes/auth.js";
import db from "./database/database.js";


const app = express();

//connecting satement
db.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("mysql connected......");
    }
});
//

//joining or binding the css file to this directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDirectory = path.join(__dirname, "../public");
app.use(express.static(publicDirectory));
//

// parse URL-encoded bodies (as sent by html forms)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//

//setting hbs file
app.set("view engine", "hbs");
//

//routes
app.use("/", pageRoutes);
app.use("/auth", authpage);
//

app.listen(5000, () => {
    console.log("server started at http://localhost:5000");
});