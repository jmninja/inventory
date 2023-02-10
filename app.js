const express = require("express");
const { result } = require("lodash");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const productRoutes = require("./routes/productRoutes");

//express app
const app = express();

//connect to mongodb
const dbURI =
  "mongodb+srv://jmninja:pass@cluster0.yil5a.mongodb.net/Cluster0?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3005))
  .catch((err) => console.log(err));

//register viewengine
app.set("view engine", "ejs");

//middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.redirect("/products");
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard", { title: "Dashboard" });
});

app.get("/login", (req, res) => {
  res.render("login", { title: "login" });
});

app.get("/signup", (req, res) => {
  res.render("signup", { title: "Signup" });
});

//product routes
app.use("/products", productRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
