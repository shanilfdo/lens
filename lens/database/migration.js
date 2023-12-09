const db = require("./db");

function createTables() {
  return db.openDb().then((connection) => {
    return connection.exec(`
    BEGIN;
      CREATE TABLE IF NOT EXISTS executions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        runid BLOB,
        data JSON,
        parentrunid BLOB,
        executionorder INTEGER
      );
      CREATE INDEX IF NOT EXISTS executions_runid_idx ON executions (runid);
      CREATE INDEX IF NOT EXISTS executions_parentrunid_idx ON executions (parentrunid);
    COMMIT;
    `);
  });
}

module.exports = { createTables };
