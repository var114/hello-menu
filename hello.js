

// var http = require('http');
// var fs = require('fs');
// var path = require('path'); 
// var mime = require('mime');
var express = require('express');

var cache = {}

var app = express();


/*

app.get('/upload', function (request, response) {
  console.log('received GET request');
  response.send('<form method="POST"><input type="submit"></form>');
});
app.post('/upload', function (request, response){
  console.log('received POST request');
  response.send('hey we got your request!');
});

*/

app.use(express.bodyParser());

app.get('/', function (req, res) {
  var filepath = (__dirname + '/public/index.html');
    console.log('received GET request');
    res.sendfile(filepath);
    /* console.log(req) */
}); 

  app.post('/', function (req, res) {
    console.log('received POST request');
     /* console.log(req.files.menu); */
         res.send('file uploaded');

         /*
    fs.readFile(req.files.menu.path, function (err, data) {
      var newPath = __dirname + "/patil/patilMenu";
      fs.writeFile(newPath, data, function (err) {
        res.redirect("back");
      });
          
   });
    */
  
});

  app.listen(3000, function() { /* starts the server, port 3000. Can eventually change server to your own!!! */
    console.log("Server listening on port 3000.");

  });





 