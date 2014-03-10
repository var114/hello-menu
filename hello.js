var jade = require('jade');
var express = require('express');
var editor = require('./editor');

var app = express()
  , server = require('http').createServer(app) // for socket io to piggy-back on (don't ask me why...)
  , io = require('socket.io').listen(server);

var yaml = require('js-yaml');
var fs = require('fs'); //file system access

try {
  var appData = yaml.safeLoad(fs.readFileSync('./data/data.yml', 'utf8'));
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


io.sockets.on('connection', function (socket) {
  console.log('connected');
  socket.emit('success', 'connected!');
  socket.on('edit', function (data) {
    editor.editData(data, appData);
  })
})

//   fs.readFile(req.files.menu.path, function (err, data) {
//     var newPath = __dirname + "/patil/patilMenu";
//     fs.writeFile(newPath, data, function (err) {
//       res.redirect("back");
//     });

exports.listen = function (port) {
  server.listen(3000, function () { console.log("Server listeing on port 3000")})
};

// server.listen(3000, function() {  starts the server, port 3000. Can eventually change server to your own!!! 
//   console.log("Server listening on port 3000.");
// });





 