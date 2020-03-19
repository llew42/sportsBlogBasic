const express = require('express');
const router = express.Router();
Category = require('../models/category.js');

// Get categories
router.get('/', (req, res, next) => {
  Category.getCategories((err, categories) => {
    if (err) {
      console.error(err);
      res.send(err);
    }
    res.render('categories', {
      title: 'Categories',
      categories: categories
    });
  });
});

// ADD CATEGORY
router.post('/add', (req, res, next) => {
  const category = new Category();
  category.title = req.body.title;
  category.description = req.body.description;

  Category.addCategory(category, (err, category) => {
    if (err) {
      res.send(err);
    }
    res.redirect('/manage/categories');
  });
});

// EDIT CATEGORY
router.post('/edit/:id', (req, res, next) => {
  const category = new Category();
  const query = {_id: req.params.id};
  const edit = {title: req.body.title, description: req.body.description}

  Category.editCategory(query, edit, (err, category) => {
    if (err) {
      res.send(err);
    }
    res.redirect('/manage/categories');
  })
});

// DELETE Category
router.delete('/delete/:id', (req, res, next) => {
  const query = {_id: req.params.id};

  Category.deleteCategory(query, (err, category) => {
    if (err) {
      res.send(err);
    }
    res.status(200);
  });
});

module.exports = router;
