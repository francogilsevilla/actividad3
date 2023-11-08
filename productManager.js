const fs = require("fs");

fs.write

class ProductManager {
    constructor(path){
        this.path = path;
        this.products = [];
        this.loadProducts();
    }

    loadProducts(){
        try{
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
        }catch(error){
            this.products = [];
        }
    }

    async saveProducts(){
        try{
            await fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
        }catch(error){
            console.log('no se pudo guardar');
        }
    }

    addProduct(productData){
        const newId = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
        const newProduct = {id: newId, ...productData};
        this.products.push(newProduct);
        this.saveProducts();
    }

    getAllProducts(){
        return this.products;
    }

    getProductById(id){
        return this.products.find(product => product.id === id);
    }

    updateProduct(id, newData){
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1){
            this.products[index] = {...this.products[index], ...newData};
            this.saveProducts();
            return 'El producto se actualizo';
        }else{
            return 'El producto no pudo actualizarse';
        }
    }

    deleteProduct(id){
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1){
            this.products.splice(index, 1);
            this.saveProducts();
            return 'Se elimino el prodcuto'
        }else{
            return 'No se pudo eliminar el producto'
        }
    }
}

function getRandom() {
    return Math.floor(Math.random() * 31) + 1;
}

const productManager = new ProductManager('products.json');

productManager.addProduct({
    name: 'Pan', 
    price: 10,
    description: 'pan recien horneado',
    code: getRandom(),
    stock: getRandom(),
    thumbnail: 'pan.jpg',
});

productManager.addProduct({
    name: 'Lechuga', 
    price: 5,
    description: 'lechuga fresca',
    code: getRandom(),
    stock: getRandom(),
    thumbnail: 'lechuga.jpg',
});

productManager.addProduct({
    name: 'Tomate', 
    price: 2,
    description: 'tomates frescos',
    code: getRandom(),
    stock: getRandom(),
    thumbnail: 'tomate.jpg',
});


const allProducts = productManager.getAllProducts();
console.log(allProducts);

const product = productManager.getProductById(1);
console.log(product);

const updated = productManager.updateProduct(1, {price:15});
console.log(updated);

const productUpdated = productManager.getProductById(1);
console.log(productUpdated);

const deleted = productManager.deleteProduct(1);
console.log(deleted);