const dbClient = require('./db_client');
class InitDb extends dbClient {
  async init() {
    this._init();
    await this._createTables();

    const restartSerial = await this._getRestartSerial();
    console.log(`Restart Serial currently at ${restartSerial}.`);
  }

  async _createTables() {
    const query = `      
      CREATE TABLE IF NOT EXISTS public.links (
        key TEXT PRIMARY KEY,
        url TEXT UNIQUE NOT NULL,
        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
      );
      
      CREATE INDEX IF NOT EXISTS idx_links_updated ON links(updated DESC);
      
      CREATE SEQUENCE IF NOT EXISTS key_serial;
      CREATE SEQUENCE IF NOT EXISTS restart_serial;
    `;

    return this._db.query(query);
  }

  async _getRestartSerial() {
    const query = `SELECT nextval('restart_serial')`;
    const res = await this._db.query(query);

    return res.rows[0].nextval;
  }
}

module.exports = InitDb;
