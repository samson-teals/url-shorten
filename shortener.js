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
    // todo: fill in query
    const res = await this._db.query('SELECT $1', [key]);
    return res.rows.length ? res.rows[0] : null;
  }

  async nextKey(url) {
    // url is passed in, but it doesn't need to be used
    const query = `SELECT nextval('key_serial')`;
    const res = await this._db.query(query);

    return res.rows[0].nextval;
  }

  async insert(url, key = null) {
    // check if a record exists
    // - if it does, then this.update() the record
    // - if it doesn't
    //   - generate a new key using this.nextKey()
    //   - using the key, insert a new record into the database

    key = await this.nextKey(null);

    // "RETURNING *" is specific to postgres and will let you return the new values you just inserted
    const res = await this._db.query('INSERT INTO links(key, url) VALUES ($1, $2) RETURNING *', [key, url]);
    return res.rows.length ? res.rows[0] : null;
  }

  async update(key) {
    // CURRENT_TIMESTAMP is a postgres function that returns the current time
    // - e.g. try "SELECT CURRENT_TIMESTAMP"
    const res = await this._db.query('UPDATE links SET updated = CURRENT_TIMESTAMP  <fill in condition>', [key]);
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
