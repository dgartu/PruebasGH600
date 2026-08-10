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

  describe('GET /fibonacci/:n', () => {
    it('debe devolver los primeros 10 números de Fibonacci', async () => {
      const res = await request(app).get('/fibonacci/10');
      expect(res.status).toBe(200);
      expect(res.body.fibonacci).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
    });

    it('debe devolver un arreglo vacío cuando n es 0', async () => {
      const res = await request(app).get('/fibonacci/0');
      expect(res.status).toBe(200);
      expect(res.body.fibonacci).toEqual([]);
    });

    it('debe devolver error 400 cuando n es mayor a 1000', async () => {
      const res = await request(app).get('/fibonacci/1001');
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('El número es demasiado grande (máximo 1000)');
    });

    it('debe devolver error 400 cuando n no es un número', async () => {
      const res = await request(app).get('/fibonacci/abc');
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('El parámetro debe ser un número entero');
    });

    it('debe devolver error 400 cuando n es negativo', async () => {
      const res = await request(app).get('/fibonacci/-5');
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('El número no puede ser negativo');
    });
  });
});