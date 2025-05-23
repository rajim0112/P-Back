const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors(
    // {
    // origin:"*"
    // }
));

// app.use(
//     cors({
//         origin: ["http://localhost:3000", "https://p-front-delta.vercel.app"],
//         methods: ["GET", "POST"],
//         credentials: true,
//     })
// );

app.options('*', cors());

app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Raji",
    database: "signup"
})

app.post('/signup', (req,res) => {
    const sql = "INSERT INTO login(`name`,`email`,`password`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err,data) => {
        if(err) {
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.post('/login', (req,res) => {
    const sql = "SELECT * FROM login WHERE `email` = ? AND `password`=? ";
    db.query(sql, [req.body.email, req.body.password], (err,data) => {
        if(err) {
            return res.json("Error");
        }
        if(data.length > 0) {
            return res.json("Success");
        } else {
            return res.json("Failed");
        }
    })
})

app.get('/', (req,res) => {
    res.send("Server is running")
})

app.listen(8081, () => {
    console.log("Server has Started!...");
})