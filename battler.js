var http = require("http");
var fs = require("fs");
var port = 8888;

http.createServer(function(req, res) {
  if (req.method === "GET") {
    if (req.url === "/assets/application.js") {
      return send(req, res, 'text/javascript', 'assets/application.js');
    } else if (req.url === "/assets/application.css") {
      return send(req, res, 'text/css', 'assets/application.css');
    } else if (req.url.indexOf(".") === -1) {
      return send(req, res, 'text/html', '404.html');
    }
  }

  send_not_found(req, res);

}).listen(port, function() {
  console.log("Listening: http://localhost:"+port+"\n");
});

function send(req, res, mimetype, filename) {
  fs.readFile(filename, function(err, content) {
    if (!err) {
      console.log(req.method + " "+ req.url, "\t-> 200 "+ mimetype +": "+ filename);
      res.writeHead(200, {'Content-Type': mimetype});
      res.end(content);
    } else {
      send_not_found(req, res);
    }
  });
}

function send_not_found(req, res) {
  console.log(req.method + " "+ req.url, "\t-> 404 Not Found :(");
  res.writeHead(404);
  res.end("");
}
