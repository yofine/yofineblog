
var http = require('http');
var path = require('path');
var express = require('express');
var home = require('./routes/home');
var read = require('./routes/read');
var list = require('./routes/list');
var write = require('./routes/write');

var app = express();

app.set('port', process.env.PORT || process.argv[2]);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//routes
app.get('/', home.index);
app.get('/write', write.get);
app.post('/write', write.post);
app.get('/read/:title', read.get);
app.get('/list/:tag', list.get);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
