const http = require("http");
const port = process.env.PORT || 6000;

const app = require('./server')
const server = http.createServer(app);

server.listen(port);
