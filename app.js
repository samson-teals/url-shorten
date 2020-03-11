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


  app.post('/add', async (req, res) => {
    const url = req.body.url;
    const url_starts_with_http = true;
    if (url_starts_with_http) {
      const data = await shortener.insert(url);
      res.send(data);
    }
    else {
      res.code(400);
      res.send('bad pattern');
    }
  });

  app.post('/remove', async (req, res) => {
    const key = req.body.key;
    const data = await shortener.remove(key);
    res.send(data);
  });

  app.get('/r/:key', async (req, res) => {
    const key = req.params.key;
    // todo: get data from shortener module
    const data = {
      key: 'a-key',
      url: 'http://google.ca',
      created: '2020-03-08T22:35:44.076560-07:00',
      updated: '2020-03-08T22:35:44.076560-07:00'
    };

    if (data && data.url) {
      res.redirect(302, data.url);
    }
    else {
      res.send404();
    }
  });

  ///////////////////////////////////////////////////////////
  // start application server
  ///////////////////////////////////////////////////////////

  app.listen(port, '0.0.0.0', () => console.log(`Shortener app listening on port ${port}!`));
};
main();
