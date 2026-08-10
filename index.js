import { app, port } from './src/app.js';

app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});
