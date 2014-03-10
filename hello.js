var jade = require('jade');
var socket = require('socket.io');
var express = require('express');

var app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

var yaml = require('js-yaml');
var fs = require('fs'); //file system access

try {
  var data = yaml.safeLoad(fs.readFileSync('./data/data.yml', 'utf8'));
  console.log(data);
} catch (e) {
  console.log(e);
}

app.set("views", __dirname + "/template");
app.set("view engine", "jade");

app.get('/', function (req, res) {
  res.render("index", data);
}); 

app.use(express.bodyParser());

app.use(express.static(__dirname + '/public')); //server css, javascript from public folder

// app.post('/', function (req, res) {
//   console.log('received POST request');
//    /* console.log(req.files.menu); */
//        res.send('file uploaded');

       
//   fs.readFile(req.files.menu.path, function (err, data) {
//     var newPath = __dirname + "/patil/patilMenu";
//     fs.writeFile(newPath, data, function (err) {
//       res.redirect("back");
//     });
        
//  });
  

// });

app.listen(3000, function() { /* starts the server, port 3000. Can eventually change server to your own!!! */
  console.log("Server listening on port 3000.");
});





 