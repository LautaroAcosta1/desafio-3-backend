const express = require('express');
const app = express();
const ProductManager = require('./product');

app.get ("/products", async (req, res) => {
    const product = new ProductManager()
    const productsList = await product.getProducts();
    const limit = req.query.q;
    if (limit) {
        const limitedProducts = productsList.slice(0, parseInt(limit));
        // Muestra solo lo hasta el limite agregado.
        res.send(limitedProducts)
    } else {
        // Muestra todos los productos:
        res.send(productsList);
    }
});

app.get ("/products/:id", async (req, res) => {
    const product = new ProductManager()
    const id = parseInt(req.params.id)
    const productId = await product.getProductById(id)
    // Muestra el producto por ID.
    res.send(productId)
})


// Iniciar el servidor
app.listen(3000, () => {
    console.log(`Servidor Express corriendo en http://localhost:3000`);
});