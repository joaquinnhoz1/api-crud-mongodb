const Category = require("../models/categoryModel");
const Product = require("../models/productModel");

const createCategory = async (data) => await Category.create(data);

const getCategories = async () => await Category.find();

const getCategoryById = async (id) => {
  const category = await Category.findById(id);
  if (!category) throw new Error("Categoría no encontrada");
  return category;
};

const updateCategory = async (id, data) => {
  const category = await Category.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
  if (!category) throw new Error("Categoría no encontrada");
  return category;
};

const deleteCategory = async (id) => {
  const relatedProducts = await Product.findOne({ categoria: id });
  if (relatedProducts) {
    throw new Error("No se puede eliminar la categoría porque tiene productos asociados");
  }

  const category = await Category.findByIdAndDelete(id);
  if (!category) throw new Error("Categoría no encontrada");
  return category;
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
};