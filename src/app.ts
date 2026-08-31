import express from 'express';

const app = express();
const port = 3000;

app.get('/', (_req, res) => {
  res.send('¡Hola desde Express!');
});

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/fibonacci/:n', (req, res) => {
  const { n } = req.params;

  // Validar que n sea un número entero positivo
  const num = parseInt(n, 10);

  if (isNaN(num)) {
    return res.status(400).json({ error: 'El parámetro debe ser un número entero' });
  }

  if (num < 0) {
    return res.status(400).json({ error: 'El número no puede ser negativo' });
  }

  if (num === 0) {
    return res.status(200).json({ fibonacci: [] });
  }

  if (num > 1000) {
    return res.status(400).json({ error: 'El número es demasiado grande (máximo 1000)' });
  }

  // Generar los primeros num números de Fibonacci
  const fibonacci: number[] = [];
  let a = 0;
  let b = 1;

  for (let i = 0; i < num; i++) {
    fibonacci.push(a);
    [a, b] = [b, a + b];
  }

  res.status(200).json({ fibonacci });
});

if (import.meta.url === `file://${process.argv[1]}`) {
  app.listen(port, () => {
    console.log(`Servidor Express escuchando en http://localhost:${port}`);
  });
}

export { app, port };