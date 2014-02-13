var markdown = require('markdown').markdown;
var mongoose = require('mongoose');
var strftime = require('strftime');
var marked = require('marked');
var Schema = mongoose.Schema;
var articleModel = mongoose.model('articles', new Schema({
  title: String,
  tag: String,
  content: String,
  time: String
}, {
  collection: 'articles'
}));

mongoose.connect('mongodb://localhost/blog');
// mongoose.connect('mongodb://yofine:112358@novus.modulusmongo.net:27017/y2Bomobu')

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

function Article(title, tag, content) {
  this.title = title;
  this.tag = tag;
  this.content = content;
}

Article.prototype.save = function(callback) {
  var time = strftime('%F %T', new Date());
  articleModel.create({
    title: this.title,
    tag: this.tag,
    content: this.content,
    time: time
  }, function(err, article) {
    if (err) return callback(err);
    callback(null, article);
  })
};

//find recent articles in home page
Article.findRecent = function(callback) {
  articleModel.find({}).sort('-time').limit(3).exec(function(err, recents) {
    if (err) throw err;
    recents.forEach(function(element) {
      element.content = marked(element.content);
    })
    callback(null, recents);
  })
}

//find one article by title
Article.findOne = function(title, callback) {
  articleModel.findOne({title: title}, function(err, article) {
    if (err) throw err;
    article.content = marked(article.content);
    callback(null, article);
  })
}

//find articles bu tag
Article.findByTag = function(tag, callback) {
  articleModel.find({tag: tag}).sort('-time').exec(function(err, articles) {
    if (err) return callback(err);
    articles.forEach(function(element) {
      element.content = marked(element.content);
    })
    callback(null, articles);
  })
}

module.exports = Article;