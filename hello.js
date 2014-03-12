var jade = require('jade');
var express = require('express');
var editor = require('./editor');

var app = express()
  , server = require('http').createServer(app) // for socket io to piggy-back on (don't ask me why...)
  , io = require('socket.io').listen(server);

var yaml = require('js-yaml');
var fs = require('fs'); //file system access

var db = {};

try {
  db.siteInfo = yaml.safeLoad(fs.readFileSync('./db.yml', 'utf8'));
  console.log(db.siteInfo);
} catch (e) {
  console.log(e);
}

app.use(express.bodyParser());
app.use(express.static(__dirname + '/public')); //server css, javascript from public folder

app.set("views", __dirname + "/template");
app.set("view engine", "jade");

app.get('/', function (req, res) {
  res.render("index", {siteInfo: db.siteInfo, edible: true});
}); 

app.post('/', function (req, res) {
  // console.log(req)
  // console.log(req.body);
  console.log(req.files);

});

io.set('log level', 1);

function editData (dbName, dataKey, dataValue) {
  db[dbName][dataKey] = dataValue;
}

io.sockets.on('connection', function (socket) {
  console.log('connected');
  socket.emit('success', 'connected!');
  socket.on('edit', function (data) {
    console.log(JSON.stringify(data));
    editData(data.dbName, data.dataKey, data.dataValue);
  })
})



exports.listen = function (port) {
  server.listen(3000, function () { console.log("Server listeing on port 3000")})
};






 