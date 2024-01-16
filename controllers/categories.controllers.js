const { Category } = require('../models/category.db'); 

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: "An error occurred", error });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name });
    return res.status(201).json({ message: "Category successfully created", category });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred", error });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;

    const [updatedRowsCount, [updatedCategory]] = await Category.update(
      { name },
      { where: { id: categoryId }, returning: true }
    );

    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({ message: "Updated the category", category: updatedCategory });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred", error });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const deletedRowCount = await Category.destroy({ where: { id: categoryId } });

    if (deletedRowCount === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred", error });
  }
};

module.exports = { getAllCategories, createCategory, updateCategory, deleteCategory };
