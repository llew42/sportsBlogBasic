const express = require('express');
const router = express.Router();

const Article = require('../models/article.js')

router.get('/', (req, res, next) => {
  res.render('articles', {title: 'Articles'});
});

router.get('/show/:id', (req, res, next) => {
  res.render('article', {title: 'An Article'});
});

router.get('/category/:category_id', (req, res, next) => {
  res.render('articles', {title: 'Category Articles'});
});

// Add article
router.post('/add', (req, res, next) => {
  const article = new Article();
  article.title = req.body.title;
  article.subtitle = req.body.subtitle;
  article.category = req.body.category;
  article.body = req.body.body;
  article.author = req.body.author;

  Article.addArticle(article, (err, article) => {
    if (err) {
      res.send(err);
    }
    res.redirect('/manage/articles');
  })
});

// Edit article
router.post('/edit/:id', (req, res, next) => {
  const article = new Article();
  const query = {_id: req.params.id};
  const edit = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      category: req.body.category,
      body: req.body.body,
      author: req.body.author
  }

  Article.editArticle(query, edit, (err, article) => {
    if (err) {
      res.send(err);
    }
    res.redirect('/manage/articles');
  });
});

// Delete article
router.delete('/delete/:id', (req, res, next) => {
  const query = {_id: req.params.id};

  Article.deleteArticle(query, (err, article) => {
    if (err) {
      res.send(err);
    }
    res.status(200);
  });
});

module.exports = router;