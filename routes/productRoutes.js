const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

router.get("/", productController.product_index);
router.post("/", productController.product_create_post);
router.get("/create", productController.product_create_get);
router.get("/:id", productController.product_details);
router.delete("/:id", productController.product_delete);

module.exports = router;
