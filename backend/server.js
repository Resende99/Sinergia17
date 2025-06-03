const express = require('express');
const db = require('./database');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Rota para enviar pontuação
app.post('/api/submit-score', (req, res) => {
    const { name, time } = req.body;

    if (!name || !time) {
        return res.status(400).json({ message: 'Nome e tempo são obrigatórios.' });
    }

    // Ajustar o horário para o fuso horário do Brasil (-03:00)
    const now = new Date();
    const offset = -3 * 60; // -3 horas em minutos
    const localDate = new Date(now.getTime() + offset * 60 * 1000);
    const dateString = localDate.toISOString().replace('T', ' ').substring(0, 19); // Formato: YYYY-MM-DD HH:MM:SS

    db.run('INSERT INTO Scores (name, time, date_added) VALUES (?, ?, ?)', [name, parseFloat(time), dateString], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro ao salvar pontuação.' });
        }
        res.json({ message: 'Pontuação salva com sucesso!' });
    });
});

// Rota para listar todas as pontuações
app.get('/api/scores', (req, res) => {
    db.all('SELECT * FROM Scores ORDER BY time ASC', [], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro ao listar pontuações.' });
        }
        res.json(rows);
    });
});

// Rota para excluir uma pontuação pelo ID
app.delete('/api/scores/:id', (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM Scores WHERE id = ?', [id], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro ao excluir pontuação.' });
        }
        res.json({ message: 'Pontuação excluída com sucesso!' });
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));