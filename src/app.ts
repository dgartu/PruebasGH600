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

  // Validar que n sea un número entero
  const num = parseInt(n, 10);

  if (isNaN(num) || !Number.isInteger(Number(n))) {
    return res.status(400).json({
      error: 'El parámetro debe ser un número entero válido',
    });
  }

  // Validar que n no sea 0
  if (num === 0) {
    return res.status(400).json({
      error: 'El número debe ser mayor que 0',
    });
  }

  // Validar que n no sea negativo
  if (num < 0) {
    return res.status(400).json({
      error: 'El número debe ser positivo',
    });
  }

  // Validar que n no sea mayor a 1000
  if (num > 1000) {
    return res.status(400).json({
      error: 'El número no debe ser mayor a 1000',
    });
  }

  // Generar los primeros n números de Fibonacci
  const fib: number[] = [];
  if (num >= 1) fib.push(0);
  if (num >= 2) fib.push(1);
  for (let i = 2; i < num; i++) {
    fib.push(fib[i - 1] + fib[i - 2]);
  }

  return res.status(200).json({ fibonacci: fib });
});

if (import.meta.url === `file://${process.argv[1]}`) {
  app.listen(port, () => {
    console.log(`Servidor Express escuchando en http://localhost:${port}`);
  });
}

export { app, port };