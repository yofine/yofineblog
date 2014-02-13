var Article = require('../models/article');

module.exports = {
  get: function(req, res) {
    var model = {

    }
    res.render('write', model);
  },
  post: function(req, res) {
    var newArticle = new Article(req.body.title.trim(), req.body.tag.trim(), req.body.content);
    newArticle.save(function(err) {
      if (err) return res.redirect('/write');
      return res.redirect('/');
    });
  }
}