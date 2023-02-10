const { result } = require("lodash");
const Product = require("../models/product");
// product_index, product_details, product_create_get, product_delete, product_edit, product_update

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

//edit controller
const product_edit_get = (req, res) => {
  const { id } = req.params;
  Product.findById(id)
    .then((result) => {
      res.render("products/edit", { title: "Edit Product", products: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

//update controller
const product_update_put = (req, res) => {
  const { id } = req.params;
  Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  })
    .then((result) => {
      res.redirect(`/products/${id}`);
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
  product_update_put,
  product_edit_get,
};
