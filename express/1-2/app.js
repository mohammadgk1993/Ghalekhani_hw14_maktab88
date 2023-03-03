const express = require("express");
const app = express();
const productRouter = require("./routes/product");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use("/product", productRouter);

app.get("/products-page", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/index.html"))
});

app.listen(5005);