
var Article = require('../models/article');

module.exports = {
  get : function(req, res) {
    Article.findOne(req.param('title'), function(err, article) {
      if (err) return article = [];
      var model = {
        article: article
      }
      res.render('read', model);
    })
  }
}