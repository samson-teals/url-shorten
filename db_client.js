// db_client should be subclassed by classes that need to interact with the db

const pgdb = require('./pgdb');

class dbClient {
  constructor(db = null) {
    this._extDb = db;
  }

  _init() {
    this._db = this._extDb || new pgdb();
  }

  _end() {
    if (!this._extDb) {
      this._db.end();
      this._db = null;
    }
  }
}

module.exports = dbClient;
