const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

router.get("/", productController.product_index);
router.post("/", productController.product_create_post);
router.get("/create", productController.product_create_get);
router.get("/:id", productController.product_details);
//edit router
router.get("/:id/edit", productController.product_edit_get);
//update router
router.put("/:id", productController.product_update_put);
router.delete("/:id", productController.product_delete);

module.exports = router;
