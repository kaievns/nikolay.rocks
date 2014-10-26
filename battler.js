var http = require("http");
var fs = require("fs");
var port = 8888;

http.createServer(function(req, res) {
  print(req.method + " "+ req.url);

  if (req.method === "GET") {
    if (req.url === "/application.js") {
      return send(res, 'text/javascript', 'application.js');
    } else if (req.url === "/application.css") {
      return send(res, 'text/css', 'application.css');
    } else if (req.url.indexOf(".") === -1) {
      return send(res, 'text/html', '404.html');
    }
  }

  print("\t-> 404 Not Found :(");
  res.writeHead(404);
  res.end("");

}).listen(port, function() {
  print("Listening: http://localhost:"+port+"\n\n");
});

function send(res, mimetype, filename) {
  res.writeHead(200, {'Content-Type': mimetype});
  fs.readFile(filename, function(err, content) {
    res.end(content);
    print("\t-> 200 "+ mimetype +": "+ filename + "\n");
  });
}

function print(text) {
  process.stdout.write(text);
}
