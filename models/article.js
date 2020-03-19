const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  }
});

const Category = module.exports = mongoose.model('Category', categorySchema);

// Get categories
module.exports.getCategories = (callback, limit) => {
  Category.find(callback).limit(limit).sort([['title', 'ascending']])
}

//Add category
module.exports.addCategory = (category, callback) => {
  Category.create(category, callback);
}

// Get single category
module.exports.getCategoryById = (id, callback) => {
  Category.findById(id, callback);
}

// Update category
module.exports.editCategory = (query, edit, callback) => {
  Category.findOneAndUpdate(query, edit, callback);
}

// Delete category
module.exports.deleteCategory = (query, callback) => {
  Category.remove(query, callback);
}
