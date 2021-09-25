const Product = require("../models/product");
// product_index, product_details, product_create_get, product_delete

const product_index = (req, res) => {
  Product.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("products/index", { title: "All Stocks", products: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const product_details = (req, res) => {
  const id = req.params.id;
  Product.findById(id)
    .then((result) => {
      res.render("products/details", {
        product: result,
        title: "Product Details",
      });
    })
    .catch((err) => {
      res.status(404).render("404", { title: "404" });
    });
};

const product_create_get = (req, res) => {
  res.render("products/create", { title: "Add Product" });
};

const product_create_post = (req, res) => {
  const product = new Product(req.body);

  product
    .save()
    .then((result) => {
      res.redirect("/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

const product_delete = (req, res) => {
  const id = req.params.id;

  Product.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/products" });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  product_index,
  product_details,
  product_create_get,
  product_create_post,
  product_delete,
};
