const express = require("express");
const app = express();
const userRouter = require("./routes/admin");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use("/admin", userRouter);

app.get("/auth/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/signup-page.html"))
});

app.get("/auth/login", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/login-page.html"))
});

app.get("/admin/panel", (req,res) => {
    res.sendFile(path.join(__dirname, "./views/admin-panel.html"))
})

app.listen(5005);