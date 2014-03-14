var jade = require('jade');
var express = require('express');
var editor = require('./editor');
var fs = require('fs');

// var uploader = require('./helloUploader');

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

app.get('/pdf/:url', function (req, res) {
  console.log('get ' + req.params.url)
  var path = './data/' + req.params.url;
  fs.exists(path, function (exists) {
    if (exists) {
      res.sendfile(path);
    } else {
      res.send(path + ' has not been uploaded yet!');
    };
  })
  
});

app.post('/:url', function(req, res) {
    // get the temporary location of the file
    var tmp_path = req.files.file.path;
    // set where the file should actually exists - in this case it is in the "images" directory
    var target_path = './data/' + req.params.url;
    // move the file from the temporary location to the intended location
    fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
        fs.unlink(tmp_path, function() {
            if (err) throw err;
            res.send('File uploaded to: ' + target_path + ' - ' + req.files.file.size + ' bytes');
        });
    });
});

io.set('log level', 1);

function editData (dbName, dataKey, dataValue) {
  if(dataValue.length > 0) {
    db[dbName][dataKey] = dataValue;
  } else {
    db[dbName][dataKey] = 'click to edit';
  }
}

io.sockets.on('connection', function (socket) {
  console.log('connected');
  socket.emit('success', 'connected!');
  socket.on('edit', function (data) {
    console.log(JSON.stringify(data));
    editData(data.dbName, data.dataKey, data.dataValue);
  })
})




server.listen(4567, function () { console.log("Server listeing on port 4567")})







 