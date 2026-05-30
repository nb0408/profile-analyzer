const Database = require("better-sqlite3");

const db = new Database("history.db");

// Create table if not exists

db.prepare(`
CREATE TABLE IF NOT EXISTS searches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    searchedAt DATETIME DEFAULT CURRENT_TIMESTAMP
)
`).run();

module.exports = db;