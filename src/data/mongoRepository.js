const { MongoClient, ObjectID } = require("mongodb");
const config = require("../config/configuration.json");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  email: { type: String },
});

const productSchema = new mongoose.Schema({
  Name: { type: String },
  Description: { type: String },
  ImageUrl: { type: String },
});

const userModel = mongoose.model("user", userSchema);
const productModel = mongoose.model("product", productSchema);

var self = (module.exports = {
  addUser: async function (username, password, email) {
    let connection;
    try {
      connection = await mongoose.connect(config.databaseUrl);

      const user = new userModel({
        username: username,
        password: password,
        email: email,
      });

      return await user.save();
    } catch (error) {
      console.log("Add User error:", error);
      return null;
    } finally {
      if (connection) mongoose.connection.close();
    }
  },
  getUserByUserName: async function (username) {
    let connection;

    try {
      connection = await mongoose.connect(config.databaseUrl);

      const user = await userModel.findOne({ username });

      return user;
    } catch (error) {
      console.log("Get User error ", error);
      return null;
    } finally {
      if (connection) mongoose.connection.close();
    }
  },
  getProducts: async function () {
    let connection;
    try {
      connection = await mongoose.connect(config.databaseUrl);

      return await productModel.find({});
    } catch (error) {
      console.log(error.stack);
      return null;
    } finally {
      if (connection) mongoose.connection.close();
    }
  },
  getProductById: async function (id) {
    let connection;
    try {
      connection = await mongoose.connect(config.databaseUrl);
      return await productModel.findOne({ _id: new ObjectID(id) });
    } catch (error) {
      console.log(error.stack);
      return null;
    } finally {
      if (connection) mongoose.connection.close();
    }
  },
  AddUpdateProduct: async function (id, product) {
    let connection;
    try {
      connection = await mongoose.connect(config.databaseUrl);
       await productModel.findOneAndUpdate(
        { _id: new ObjectID(id) },
        product,
        { upsert: true }
      );
      return true;
    } catch (error) {
      console.log("Update product", error);
      return null;
    } finally {
      if (connection) mongoose.connection.close();
    }
  },
});
