var express = require('express');
var jade = require('jade');


var app = express();
app.use(express.static(__dirname + '/public')); //server css, javascript from public folder
app.use(express.bodyParser());

app.get('/', function (req, res) {
  var filePath = (__dirname + '/template/index.jade');
    console.log('received GET request');
    res.send(jade.renderFile(filePath));
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





 