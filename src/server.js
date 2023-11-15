import express from "express";
import ProductManager from "../productManager.js";

let manager = new ProductManager('products.json');
let products = manager.getAllProducts();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/products', (req, res) => {
    const { limit } = req.query;

    if (Number(limit)) {
        res.json(products.slice(0, limit));
    } else {
        res.json(products);
    }
});

app.get('/products/:pid', (req, res) => {
    const { pid } = req.params;
    let product = manager.getProductById(pid);

    if (product) {
        res.json(product);
    } else {
        res.status(404).send("No se encontró el producto");
    }
});

app.listen(5000, () => console.log("Server is listening on port 5000"));
