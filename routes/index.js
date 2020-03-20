const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  Article.getArticles((err, articles) => {
    res.render('index', {title: 'Sports Blog', articles: articles});
  }, 5);
});

module.exports = router;
