import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.get('/', (_req, res) => {
  res.send('¡Hola desde Express!');
});

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/fibonacci/:n', (req: Request, res: Response) => {
  try {
    const n = parseInt(req.params.n, 10);

    if (isNaN(n)) {
      return res.status(400).json({ error: 'El parámetro debe ser un número entero.' });
    }

    if (n < 0) {
      return res.status(400).json({ error: 'El número no puede ser negativo.' });
    }

    if (n === 0) {
      return res.status(400).json({ error: 'Debe proporcionar al menos un número.' });
    }

    if (n > 1000) {
      return res.status(400).json({ error: 'El número máximo permitido es 1000.' });
    }

    const fibonacci: number[] = [0];
    if (n > 1) {
      fibonacci.push(1);
      for (let i = 2; i < n; i++) {
        fibonacci.push(fibonacci[i - 1] + fibonacci[i - 2]);
      }
    }

    res.status(200).json({ fibonacci });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

if (import.meta.url === `file://${process.argv[1]}`) {
  app.listen(port, () => {
    console.log(`Servidor Express escuchando en http://localhost:${port}`);
  });
}

export { app, port };