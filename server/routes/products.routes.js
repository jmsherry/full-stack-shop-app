const path = require("path");
const express = require("express");
const router = express.Router();
const {
  getProducts,
  addProduct,
  updateProduct,
  removeProduct
} = require("../controllers/product.controller.js");

const { checkPermissions } = require("../middleware/permissions.middleware");
const {checkJwt} = require("./../middleware/authz.middleware");

const {
  CreateProducts,
  DeleteProducts,
  // ReadProducts,
  UpdateProducts
} = require("../constants").ProductPermission;

router
  .get("/:id?", getProducts)
  .post("/", checkJwt, checkPermissions(CreateProducts), addProduct)
  .put("/:id", checkJwt, checkPermissions(UpdateProducts), updateProduct)
  .delete("/:id", checkJwt, checkPermissions(DeleteProducts), removeProduct);

module.exports = router;