const dbClient = require('./db_client');
class Shortener extends dbClient {
  async init() {
    this._init();
  }

  async last(n) {
    const res = await this._db.query('SELECT * FROM links ORDER BY updated DESC LIMIT $1', [n]);
    return res.rows;
  }
}

module.exports = Shortener;
