const express = require('express');
const router = express.Router();
const {
  check,
  body,
  buildCheckFunction,
  validationResult,
  matchedData
} = require('express-validator');

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
router.post('/add',
  [ body('title', 'Title is required').not().isEmpty().trim(),
    body('description', 'Description is required').not().isEmpty().trim().escape()
  ], (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    res.render('add_category', {
      errors: errors,
      title: 'Create New Category'
    });
  }
  else {
    const category = new Category();
    category.title = req.body.title;
    category.description = req.body.description;
    Category.addCategory(category, (err, category) => {
      if (err) {
        res.send(err);
      }
      req.flash('success', 'Category Saved');
      res.redirect('/manage/categories');
    });
  }
});

// EDIT CATEGORY
router.post('/edit/:id',
  [ body('title', 'Title is required')
      .not().isEmpty()
      .trim(),
    body('description', 'Description is required')
      .not().isEmpty()
      .trim()
      .escape()
  ], (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    res.render('edit_category', {
      errors: errors,
      title: 'Edit Category'
    });
  }
  else {
    const category = new Category();
    const query = {_id: req.params.id};
    const edit = {title: req.body.title, description: req.body.description}

    Category.editCategory(query, edit, (err, category) => {
      if (err) {
        res.send(err);
      }
      res.redirect('/manage/categories');
    });
  }
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
