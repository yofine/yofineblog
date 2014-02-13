// * GET home page.

var Article = require('../models/article');

module.exports.index = function(req, res) {
  Article.findRecent(function(err, recents) {
    var model = {
      recents: recents
    }
    res.render('index', model);
  })
};