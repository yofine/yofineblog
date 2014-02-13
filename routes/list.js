
var Article = require('../models/article');

module.exports = {
  get: function(req, res) {
    Article.findByTag(req.param('tag'), function(err, articles) {
      if (err) articles = [];
      var model = {
        articles: articles
      }
      res.render('list', model);
    })
  }
}