'use strict';

const http = require('http');
const url = require('url');

const server = http.createServer((sreq, sres) => {
   var isSSL = (sreq.socket.encrypted ? true : false);
   var hostname = sreq.headers.host;
   if(hostname == "localhost:8124")
   {
      hostname = "ravindranaik.com"
   }
  const { pathname } = url.parse(sreq.url);
  const opts = {
    host: hostname,
    port: isSSL ? 443: 80,
    path: pathname,
    method: sreq.method,
    headers: sreq.headers,
  }

  console.log(sreq.url);
 
  const creq = http.request(opts, (cres) => {
    // passthrough status code and headers
    sres.writeHead(cres.statusCode, cres.headers);
    cres.pipe(sres);
  });

  sreq.pipe(creq);
});

server.listen(8124, 'localhost', () => {
  console.log('server is running');
});