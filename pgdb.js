const { Client, Pool } = require('pg')

class pgdb {
  constructor(config = {}) {
    // heroku support
    if (!config.connectionString && process.env.DATABASE_URL) {
      config.connectionString = process.env.DATABASE_URL;
      config.ssl = true;
    }

    this._clientConfig = config;
    this._poolConfig = config;
  }

  pool() {
    if (!this._pool) {
      this._pool = new Pool(this._poolConfig);
    }

    return this._pool;
  }

  // remember to client.release() when done
  async client() {
    return this.pool().connect();
  }

  async end() {
    if (this._pool) {
      await this._pool.end();
      this._pool = null;
    }
  }

  // use pool.query - no need to release, but not transaction safe
  async query(str, args = []) {
    return this.pool().query(str, args);
  }

  /////////////////////////////////////////////////////////
  // Direct connection if required
  /////////////////////////////////////////////////////////

  async direct_client() {
    if (!this._client) {
      this._client = new Client(this._clientConfig);
      await this._client.connect();
    }

    return this._client;
  }

  async direct_end() {
    if (this._client) {
      await this._client.end();
      this._client = null;
    }
  }
}

module.exports = pgdb;
