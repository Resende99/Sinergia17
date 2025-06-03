const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('scores.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao SQLite:', err);
  } else {
    console.log('Conectado ao SQLite');
    db.run(`CREATE TABLE IF NOT EXISTS Scores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      time INTEGER NOT NULL,
      date_added TEXT
    )`, (err) => {
      if (err) {
        console.error('Erro ao criar tabela:', err);
      } else {
        console.log('Tabela Scores criada ou já existe');
      }
    });
  }
});
module.exports = db;