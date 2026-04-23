const Product = require("../models/productModel");

const createProduct = async (data) => await Product.create(data);

const getProducts = async () => await Product.find().populate("categoria");

const getProductById = async (id) => {
  const product = await Product.findById(id).populate("categoria");
  if (!product) throw new Error("Producto no encontrado");
  return product;
};

const updateProduct = async (id, data) => {
  const product = await Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
  if (!product) throw new Error("Producto no encontrado");
  return product;
};

const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new Error("Producto no encontrado");
  return product;
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};