const express = require("express");
const mongoRepo = require("../data/mongoRepository");

const adminRouter = express.Router();

adminRouter.route("/").get(async (req, res) => {
  var products = await mongoRepo.getProducts();
  if (products) res.render("products", { products: products, isAdmin: true });
  else res.send("Failed to get products list from database");
});
adminRouter
  .route("/productItem")
  .get((req, res) => {
    res.render("productItem", { Name: "", Description: "", ImageUrl: "" });
  })
  .post(async (req, res) => {
    console.log(req.body);
    var inserted = await mongoRepo.AddUpdateProduct(null,{
      Name: req.body.name,
      Description: req.body.description,
      ImageUrl: req.body.imageUrl,
    });

    console.log("Add Product response:",inserted);
    if (inserted) res.redirect("/admin");
    else res.send("Failed to insert product into database");
  });

adminRouter.route("/productItem/:id").get(async (req, res) => {
  const id = req.params.id;
  var productDetails = await mongoRepo.getProductById(id);
  if (productDetails) res.render("productItem", productDetails);
  else res.send("Failed to get product details from database");
}).post(async(req,res) => {
  var updated = await mongoRepo.AddUpdateProduct(req.params.id,{
    Name: req.body.name,
    Description: req.body.description,
    ImageUrl: req.body.imageUrl,
  });
  console.log("Update Product response:",updated)
  if (updated) res.redirect("/admin");
  else res.send("Failed to insert product into database");
});

module.exports = adminRouter;
