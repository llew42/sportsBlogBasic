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
module.exports = router;
