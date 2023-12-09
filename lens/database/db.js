const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");

function openDb() {
  return sqlite.open({
    filename: "./database.db",
    driver: sqlite3.Database,
    mode: sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  });
}

module.exports = { openDb };
