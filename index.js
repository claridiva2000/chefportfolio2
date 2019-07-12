const http = require("http");
const port = process.env.PORT || 5000;

const app = require('./server')
const server = http.createServer(app);

server.listen(port);
