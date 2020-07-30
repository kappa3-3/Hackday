const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use('/playedgames', (req, res, next) => {
  if (req.method === 'POST') {
    console.log(req.body);
    res
      .send(req.body);
  }
  next();
});
server.use(router);
server.listen(8080, () => {
  console.log('JSON Server running on port 8080');
});
