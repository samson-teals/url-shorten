const fastify = require('fastify');
const fastify_static = require('fastify-static');
const path = require('path');

///////////////////////////////////////////////////////////
// Initialize fastify server and register static files
// handler
///////////////////////////////////////////////////////////

// inject sendHtml function into response object
const fastify_reply = require('fastify/lib/reply');
fastify_reply.prototype.sendHtml = function(html) {
  this.type('text/html; charset=utf-8').send(html);
};
fastify_reply.prototype.send404 = function(errorMsg = null) {
  this.code(404);
  this.send(errorMsg || 'not found');
};

const app = fastify();
const port = process.env.PORT || 3000;

app.register(fastify_static, {
  root: path.join(__dirname, 'public'),
  index: 'index.html'
});

///////////////////////////////////////////////////////////
// Create objects that we'll need later
///////////////////////////////////////////////////////////

const InitDb = require('./init_db');
const initdb = new InitDb();

const Shortener = require('./shortener');
const shortener = new Shortener();

///////////////////////////////////////////////////////////
// Main async section runs after static initialization
///////////////////////////////////////////////////////////

const main = async () => {

  ///////////////////////////////////////////////////////////
  // await async initializers
  ///////////////////////////////////////////////////////////

  await initdb.init();
  await shortener.init();

  ///////////////////////////////////////////////////////////
  // add handlers
  ///////////////////////////////////////////////////////////

  app.get('/last/:n(^\\d+)', async (req, res) => {
    const n = req.params.n || 10;
    const data = await shortener.last(n);
    res.send(data);
  });

  ///////////////////////////////////////////////////////////
  // start application server
  ///////////////////////////////////////////////////////////

  app.listen(port, '0.0.0.0', () => console.log(`Shortener app listening on port ${port}!`));
};
main();
