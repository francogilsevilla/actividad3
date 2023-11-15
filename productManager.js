import fs from "fs"

fs.write

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
        } catch (error) {
            this.products = [];
        }
    }

    async saveProducts() {
        try {
            await fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
        } catch (error) {
            console.log('no se pudo guardar');
        }
    }

    addProduct(productData) {
        const newId = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
        const newProduct = { id: newId, ...productData };
        this.products.push(newProduct);
        this.saveProducts();
    }

    getAllProducts() {
        return this.products;
    }

    getProductById(id) {
        let porId = this.products.find((element) => element.id == id)
        if (porId == undefined) {
        }
        else {
            return porId
        }
    }

    updateProduct(id, newData) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...newData };
            this.saveProducts();
            return 'El producto se actualizo';
        } else {
            return 'El producto no pudo actualizarse';
        }
    }

    deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            this.saveProducts();
            return 'Se elimino el prodcuto'
        } else {
            return 'No se pudo eliminar el producto'
        }
    };
};

class Product {
    constructor(name, price, description, code, stock, thumbnail) {
        this.name = name
        this.price = price
        this.description = description
        this.code = code
        this.stock = stock
        this.thumbnail = thumbnail
    };
};

export default ProductManager;