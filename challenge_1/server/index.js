const jsonServer = require('json-server');
const data = require('data/db.json');
const middlewares = jsonServer.defaults();

const router = jsonServer.router(data);
const server = jsonServer.create();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use(jsonServer.rewriter({
    "/error": "/"
}));
server.use(router);

server.listen(3000, () => {
    console.log('JSON Server is running')
});