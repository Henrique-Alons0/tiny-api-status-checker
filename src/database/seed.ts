import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./src/database/status.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS url_status (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      url TEXT NOT NULL,
      status INTEGER NOT NULL,
      last_checked DATETIME NOT NULL
    )
  `);
});

export default db;
