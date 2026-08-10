import express from 'express';

const app = express();
const port = 3000;

app.get('/', (_req, res) => {
  res.send('¡Hola desde Express!');
});

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

if (import.meta.url === `file://${process.argv[1]}`) {
  app.listen(port, () => {
    console.log(`Servidor Express escuchando en http://localhost:${port}`);
  });
}

export { app, port };
