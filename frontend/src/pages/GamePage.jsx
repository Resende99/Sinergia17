import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Grid,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from '@mui/material';

function GamePage() {
    const [name, setName] = useState('');
    const [time, setTime] = useState('');
    const [message, setMessage] = useState('');
    const [scores, setScores] = useState([]);

    // Função para buscar as pontuações
    const fetchScores = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/scores');
            const data = await response.json();
            setScores(data);
        } catch (error) {
            console.error('Erro ao buscar pontuações:', error);
        }
    };

    // Buscar pontuações ao carregar a página
    useEffect(() => {
        fetchScores();
    }, []);

    // Função para enviar pontuação
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Troca vírgula por ponto antes de enviar
        const timeToSend = time.replace(',', '.');
        try {
            const response = await fetch('http://localhost:3001/api/submit-score', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, time: timeToSend }),
            });
            const data = await response.json();
            setMessage(data.message);
            setName(''); // Limpar o campo nome
            setTime(''); // Limpar o campo tempo
            fetchScores(); // Atualizar a lista de pontuações
        } catch (error) {
            setMessage('Erro ao enviar pontuação.');
        }
    };

    // Função para excluir uma pontuação
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/api/scores/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            setMessage(data.message);
            fetchScores(); // Atualizar a lista de pontuações
        } catch (error) {
            setMessage('Erro ao excluir pontuação.');
        }
    };

    return (
        <Box sx={{ maxWidth: 1024, mx: 'auto', p: 2, bgcolor: '#292929', color: '#ffffff' }}>
            {/* Header Section */}
            <Typography
                variant="h1"
                sx={{ fontSize: '2.5rem', fontWeight: 700, color: '#5dd33d', textAlign: 'center', mb: 3 }}
            >
                Bem-vindos ao Sinergia 17
            </Typography>

            {/* Intro Section */}
            <Paper
                elevation={3}
                sx={{
                    bgcolor: '#3a3a3a',
                    p: 3,
                    borderRadius: 2,
                    mb: 3,
                    textAlign: 'center'
                }}
            >
                <Typography
                    variant="h2"
                    sx={{ fontSize: '1.5rem', fontWeight: 600, color: '#5dd33d', mb: 2 }}
                >
                    O que são as ODS?
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.6, color: '#ffffff' }}>
                    As ODS (Objetivos de Desenvolvimento Sustentável) sãos uma agenda global criada pela ONU (Organização das Nações Unidas) em 2015. Elas fazem parte da Agenda 2030, um plano de ação para acabar com a pobreza, proteger o meio ambiente e garantir paz e prosperidade para todos até o ano de 2030. <br />
                    <br />
                    Ao todo, são 17 objetivos, cada um com metas específicas que envolvem áreas como saúde, educação, igualdade de gênero, água potável, trabalho digno, ação contra mudanças climáticas, entre outros.
                </Typography>
            </Paper>

            {/* Objective Section */}
            <Paper
                elevation={3}
                sx={{
                    bgcolor: '#3a3a3a',
                    p: 3,
                    borderRadius: 2,
                    mb: 3,
                    textAlign: 'center'
                }}
            >
                <Typography
                    variant="h2"
                    sx={{ fontSize: '1.5rem', fontWeight: 600, color: '#5dd33d', mb: 2 }}
                >
                    Objetivo do Jogo
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.6, mb: 2, color: '#ffffff' }}>
                    Colete os lixos da cidade e coloque na lixeira, em seguida você entrará em uma indústria para lavar as mãos, pegue o regador e passe pela porta, após isso pegue a semente e interaja com a árvore, deixando o mundo um lugar mais limpo e saudável para se viver.
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                        <Typography variant="body1" sx={{ color: '#ffffff' }}>
                            <strong style={{ backgroundColor: '#5dd33d', color: '#000000', padding: '2px 6px', borderRadius: '4px', marginRight: '5px' }}>
                                A e D
                            </strong>{' '}
                            Anda
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" sx={{ color: '#ffffff' }}>
                            <strong style={{ backgroundColor: '#5dd33d', color: '#000000', padding: '2px 6px', borderRadius: '4px', marginRight: '5px' }}>
                                Espaço
                            </strong>{' '}
                            Pula
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" sx={{ color: '#ffffff' }}>
                            <strong style={{ backgroundColor: '#5dd33d', color: '#000000', padding: '2px 6px', borderRadius: '4px', marginRight: '5px' }}>
                                W
                            </strong>{' '}
                            Interage
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" sx={{ color: '#ffffff' }}>
                            <strong style={{ backgroundColor: '#5dd33d', color: '#000000', padding: '2px 6px', borderRadius: '4px', marginRight: '5px' }}>
                                R
                            </strong>{' '}
                            Reseta
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>

            {/* Game Section */}
            <Box sx={{ mb: 3 }}>
                <Typography
                    variant="h2"
                    sx={{ fontSize: '1.5rem', fontWeight: 600, color: '#ffffff', textAlign: 'center', mb: 2 }}
                >
                    Jogue Agora
                </Typography>
                <Box
                    sx={{
                        width: '1026px',
                        height: '773px',
                        bgcolor: '#4a4a4a',
                        border: '2px solid #5dd33d',
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mx: 'auto',
                        '@media (max-width: 1024px)': {
                            width: '100%',
                            height: 'auto',
                            aspectRatio: '4/3',
                        },
                    }}
                >
                    <iframe
                        title="GameMaker Game"
                        style={{ width: '100%', height: '100%', border: 'none', objectFit: 'contain' }}
                        src="https://game17ods.netlify.app/"
                        allowFullScreen
                    />
                </Box>
            </Box>

            {/* Score Section */}
            <Paper
                elevation={3}
                sx={{
                    bgcolor: '#3a3a3a',
                    p: 3,
                    borderRadius: '2px',
                    mb: 3,
                    textAlign: 'center'
                }}
            >
                <Typography
                    variant="h2"
                    sx={{ fontSize: '1.5rem', fontWeight: 600, color: '#5dd33d', mb: 2 }}
                >
                    Pontuação
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item>
                            <TextField
                                label="Nome"
                                variant="outlined"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                sx={{ input: { color: '#ffffff' }, label: { color: '#5dd33d' }, bgcolor: '#4a4a4a' }}
                            />
                        </Grid>
                        <Grid item>

    <TextField
        label="Tempo (segundos)"
        variant="outlined"
        type="text" // <-- alterado para aceitar vírgula
        value={time}
        onChange={(e) => setTime(e.target.value)}
        sx={{ input: { color: '#ffffff' }, label: { color: '#5dd33d' }, bgcolor: '#4a4a4a' }}
    />
</Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{
                                    bgcolor: '#5dd33d',
                                    color: '#000000',
                                    '&:hover': { bgcolor: '#4cc32c' },
                                    textTransform: 'none',
                                    px: 3,
                                    py: 1,
                                    borderRadius: 1
                                }}
                            >
                                Enviar Pontuação
                            </Button>
                        </Grid>
                    </Grid>
                    {message && <Typography sx={{ color: '#ffffff', mt: 2 }}>{message}</Typography>}
                </form>

                {/* Tabela de Pontuações */}
                <Box sx={{ mt: 3 }}>
                    <Typography
                        variant="h3"
                        sx={{ fontSize: '1.2rem', fontWeight: 600, color: '#5dd33d', mb: 2 }}
                    >
                        Melhores Tempos
                    </Typography>
                    {scores.length > 0 ? (
                        <TableContainer>
                            <Table sx={{ bgcolor: '#4a4a4a' }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ color: '#ffffff', fontWeight: 600 }}>Nome</TableCell>
                                        <TableCell sx={{ color: '#ffffff', fontWeight: 600 }}>Tempo (segundos)</TableCell>
                                        <TableCell sx={{ color: '#ffffff', fontWeight: 600 }}>Data</TableCell>
                                        <TableCell sx={{ color: '#ffffff', fontWeight: 600 }}>Ação</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {scores.map((score) => (
                                        <TableRow key={score.id}>
                                            <TableCell sx={{ color: '#ffffff' }}>{score.name}</TableCell>
                                            <TableCell sx={{ color: '#ffffff' }}>{String(score.time).replace(/[,.]/, ':')}</TableCell>
                                            <TableCell sx={{ color: '#ffffff' }}>
                                                {(() => {
                                                    const date = new Date(score.date_added);
                                                    // Ajustar para o fuso horário do Brasil (-03:00)
                                                    const offset = -3 * 60; // -3 horas em minutos
                                                    const localDate = new Date(date.getTime() + offset * 60 * 1000);
                                                    return localDate.toLocaleString('pt-BR', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        second: '2-digit',
                                                        hour12: false
                                                    });
                                                })()}
                                            </TableCell>                           <TableCell>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() => handleDelete(score.id)}
                                                    sx={{ textTransform: 'none' }}
                                                >
                                                    Excluir
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <Typography sx={{ color: '#ffffff' }}>Nenhuma pontuação registrada ainda.</Typography>
                    )}
                </Box>
            </Paper>

            {/* Conclusion Section */}
            <Paper
                elevation={3}
                sx={{
                    bgcolor: '#3a3a3a',
                    p: 3,
                    borderRadius: '2px',
                    mb: 3,
                    textAlign: 'center'
                }}
            >
                <Typography
                    variant="h2"
                    sx={{ fontSize: '1.5rem', fontWeight: 600, color: '#5dd33d', mb: 2 }}
                >
                    Conclusão
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.6, mb: 2, color: '#ffffff' }}>
                    A ODS 17 nos lembra que, para alcançar um futuro sustentável, é essencial unir forças. Por meio deste jogo, queremos mostrar que parcerias sólidas — envolvendo instituições públicas, empresas, organizações sociais e cada indivíduo — são fundamentais para superar os grandes desafios do nosso tempo. <br />
                    <br />
                    Esperamos que essa experiência tenha despertado em você o senso de colaboração e a importância do trabalho em conjunto para construir um mundo mais justo, inclusivo e sustentável. <br />
                    <br />
                    Juntos, podemos transformar o mundo. Que tal começar agora?
                </Typography>
                <Button
                    variant="contained"
                    href="https://odsbrasil.gov.br/"
                    target="_blank"
                    sx={{
                        bgcolor: '#5dd33d',
                        color: '#000000',
                        '&:hover': { bgcolor: '#4cc32c' },
                        textTransform: 'none',
                        px: 3,
                        py: 1,
                        borderRadius: 1
                    }}
                >
                    Link para o site das ODS
                </Button>
            </Paper>
        </Box>
    );
}

export default GamePage;