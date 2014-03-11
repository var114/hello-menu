var jade = require('jade');
var express = require('express');
var editor = require('./editor');

var app = express()
  , server = require('http').createServer(app) // for socket io to piggy-back on (don't ask me why...)
  , io = require('socket.io').listen(server);

var yaml = require('js-yaml');
var fs = require('fs'); //file system access

try {
  var appData = yaml.safeLoad(fs.readFileSync('./db.yml', 'utf8'));
  console.log(appData);
} catch (e) {
  console.log(e);
}

app.set("views", __dirname + "/template");
app.set("view engine", "jade");


app.get('/', function (req, res) {
  res.render("index", appData);
}); 

app.use(express.bodyParser());

app.use(express.static(__dirname + '/public')); //server css, javascript from public folder

app.post('/', function (req, res) {
  console.log('good job');
});

io.sockets.on('connection', function (socket) {
  console.log('connected');
  socket.emit('success', 'connected!');
  socket.on('edit', function (data) {
    editor.editData(data, appData);
  })
})



exports.listen = function (port) {
  server.listen(3000, function () { console.log("Server listeing on port 3000")})
};






 