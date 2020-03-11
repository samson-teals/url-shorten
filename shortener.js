const dbClient = require('./db_client');
class Shortener extends dbClient {
  async init() {
    this._init();
  }

  async last(n) {
    const res = await this._db.query('SELECT * FROM links ORDER BY updated DESC LIMIT $1', [n]);
    return res.rows;
  }

  async lookup(key) {
    const res = await this._db.query('SELECT url, key FROM links WHERE key = $1', [key]);
    return res.rows.length ? res.rows[0] : null;
  }

  async exists(url) {
    const res = await this._db.query('SELECT url, key FROM links WHERE url = $1', [url]);
    return res.rows.length ? res.rows[0] : null;
  }

  async nextKey(url) {
    // url is passed in, but it doesn't need to be used
    const query = `SELECT nextval('key_serial')`;
    const res = await this._db.query(query);

    return res.rows[0].nextval;
  }

  async insert(url, key = null) {
    const existingRecord = await this.exists(url);
    if (existingRecord) {
      return this.update(existingRecord.key);
    }

    if (!key) {
      key = await this.nextKey(url);
    }

    const res = await this._db.query('INSERT INTO links(key, url) VALUES($1, $2) RETURNING *', [key, url]);
    return res.rows.length ? res.rows[0] : null;
  }

  async update(key) {
    const res = await this._db.query('UPDATE links SET updated = CURRENT_TIMESTAMP WHERE key = $1 RETURNING *', [key]);
    return res.rows.length ? res.rows[0] : null;
  }

  async remove(key) {
    const existingRecord = await this.lookup(key);
    if (existingRecord) {
      const res = await this._db.query('DELETE FROM links WHERE key = $1', [key]);
      return existingRecord;
    }
    else {
      return {
        key: key,
        url: 'not-found'
      };
    }
  }
}

module.exports = Shortener;
