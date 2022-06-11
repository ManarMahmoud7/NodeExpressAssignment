const express = require("express");
const mongoRepo = require("../data/mongoRepository");
const debug = require("debug")("app:productsRouter");
const productsRouter = express.Router();

productsRouter.route("/").get( async(req, res) => {
  var products = await mongoRepo.getProducts();
  debug(products);
  if (products) res.render("products", { products: products, isAdmin : false });
  else res.send("Failed to retrieve products from database");
});

productsRouter.route("/:id").get(async (req, res) => {
  const id = req.params.id;
  var productDetails = await mongoRepo.getProductById(id);
  debug(productDetails);
  if (productDetails) res.render("productDetails", productDetails);
  else res.send("Failed to get product details from database");
});

module.exports = productsRouter;
