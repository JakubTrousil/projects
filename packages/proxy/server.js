var http = require('http'),
    httpProxy = require('http-proxy');

var demo = new httpProxy.createProxyServer({
    target: {
        host: 'localhost',
        port: 3001
    }
});

http.createServer(function(req, res) {
  if (req.headers.host === 'www.spread.by') {
      demo.proxyRequest(req, res);
      demo.on('error', function(err, req, res) {
          if (err) console.log(err);
          res.writeHead(500);
          res.end('fail');
      });
    } else {
        console.log("no app defined for host: " + req.headers.host);
    }
}).listen(80);