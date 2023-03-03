const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const products = require("../db/product.json");


// create new product
router.post("/newProduct", (req, res) => {
    const newProduct = {
        id: req.body.id,
        title: req.body.title,
        price: req.body.price,
        rating: req.body.rating,
        stock: req.body.stock,
        brand: req.body.brand,
        category: req.body.category
    };

    products.push(newProduct);

    try {
        fs.writeFileSync(path.join(__dirname, "../db/product.json"), JSON.stringify(products));
    } catch (err) {
        console.log(err);
        return res.status(400).send("Try again later!")
    };

    res.json(newProduct);
});


// read products
router.get("/getProducts", (req, res) => {

    console.log(products);

    return res.json(products);
});



// read single product
router.get("/getProduct/:productId", (req, res) => {

    console.log(req.params.productId);

    const product = products.find(x => x.id == req.params.productId);

    if (!product) {
        return res.status(404).send("Not Found!");
    };

    console.log(product);

    return res.json(product);
});


// update product
router.put("/editProduct/:productId", (req, res) => {

    const product = products.find(x => x.id == req.params.productId);

    if (req.body.id) product.id = req.body.id;
    if (req.body.title) product.title= req.body.title;
    if (req.body.price) product.price = req.body.price;
    if (req.body.rating) product.rating = req.body.rating;
    if (req.body.stock) product.stock = req.body.stock;
    if (req.body.brand) product.brand = req.body.brand;
    if (req.body.category) product.category = req.body.category;


    try {
        fs.writeFileSync(path.join(__dirname, "../db/product.json"), JSON.stringify(products));
    } catch (err) {
        console.log(err);
        return res.status(400).send("Try again later!")
    };

    res.json(product);
});



// remove product
router.delete("/removeProduct/:productId", (req, res) => {

    const productsTemp = products.filter(x => x.id != req.params.productId);

    try {
        fs.writeFileSync(path.join(__dirname, "../db/product.json"), JSON.stringify(productsTemp));
    } catch (err) {
        console.log(err);
        return res.status(400).send("Try again later!")
    };


    res.send("remove product");
});

module.exports = router;