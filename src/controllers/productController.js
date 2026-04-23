const service = require("../services/productService");

const create = async (req, res) => {
  try {
    const data = await service.createProduct(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const data = await service.getProducts();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const data = await service.getProductById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const data = await service.updateProduct(req.params.id, req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const deletedProduct = await service.deleteProduct(req.params.id);
    res.status(200).json({
      message: "Producto eliminado correctamente",
      product: deletedProduct
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { create, getAll, getById, update, remove };