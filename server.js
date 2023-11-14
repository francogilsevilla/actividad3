import express from "express";

import productManager from "./productManager"

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const products = [];

app.get("/", (req, res) =>{
    res.json({
        mensaje: "Bienvenido",
    });
});

app.listen(5000, => console.log("Server is listening on port 5000"))