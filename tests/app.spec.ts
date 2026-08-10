import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../src/app.js';

describe('App Express', () => {
  it('debe responder con "¡Hola desde Express!" en GET /', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toBe('¡Hola desde Express!');
  });

  it('debe responder con estado ok en GET /health', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  it('debe generar la secuencia de fibonacci para un número válido', async () => {
    const res = await request(app).get('/fibonacci/5');
    expect(res.status).toBe(200);
    expect(res.body.fibonacci).toEqual([0, 1, 1, 2, 3]);
  });

  it('debe retornar error cuando n es 0', async () => {
    const res = await request(app).get('/fibonacci/0');
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Debe proporcionar al menos un número.');
  });

  it('debe retornar error cuando n es mayor a 1000', async () => {
    const res = await request(app).get('/fibonacci/1001');
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('El número máximo permitido es 1000.');
  });

  it('debe retornar error cuando n es negativo', async () => {
    const res = await request(app).get('/fibonacci/-5');
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('El número no puede ser negativo.');
  });

  it('debe retornar error cuando n no es un número', async () => {
    const res = await request(app).get('/fibonacci/abc');
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('El parámetro debe ser un número entero.');
  });
});