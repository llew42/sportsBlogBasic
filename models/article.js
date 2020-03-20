const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  title: {
    type: String
  },
  subtitle: {
    type: String
  },
  category: {
    type: String
  },
   body: {
    type: String
  },
  author: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  comments: [
    {
      comment_subject: {
        type: String
      },
      comment_body: {
        type: String
      },
      comment_author: {
        type: String
      },
      comment_email: {
        type: String
      },
      comment_date: {
        type: String
      }
    }
  ]
});

const Article = module.exports = mongoose.model('Article', articleSchema);

// Get article
module.exports.getArticles = (callback, limit) => {
  Article.find(callback).limit(limit).sort([['title', 'ascending']])
}

// Get article by category
module.exports.getCategoryArticles = (categoryId, callback) => {
  const query = {category: categoryId}
  Article.find(query, callback).sort([['title', 'ascending']]);
}

//Add article
module.exports.addArticle = (article, callback) => {
  Article.create(article, callback);
}

// Get single article
module.exports.getArticleById = (id, callback) => {
  Article.findById(id, callback);
}

// Update article
module.exports.editArticle = (query, edit, callback) => {
  Article.findOneAndUpdate(query, edit, callback);
}

// Delete article
module.exports.deleteArticle = (query, callback) => {
  Article.remove(query, callback);
}
