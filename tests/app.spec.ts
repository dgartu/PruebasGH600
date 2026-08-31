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
    const getFibonacci = (n: string) => request(app).get(`/fibonacci/${n}`);

    const expectFibonacciSuccess = async (n: string, expected: number[]) => {
      const res = await getFibonacci(n);
      expect(res.status).toBe(200);
      expect(res.body.fibonacci).toEqual(expected);
    };

    const expectFibonacciError = async (n: string, expectedError: string) => {
      const res = await getFibonacci(n);
      expect(res.status).toBe(400);
      expect(res.body.error).toBe(expectedError);
    };

    it('debe devolver los primeros 10 números de Fibonacci', async () => {
      await expectFibonacciSuccess('10', [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
    });

    it('debe devolver un arreglo vacío cuando n es 0', async () => {
      await expectFibonacciSuccess('0', []);
    });

    it('debe devolver error 400 cuando n es mayor a 1000', async () => {
      await expectFibonacciError('1001', 'El número es demasiado grande (máximo 1000)');
    });

    it('debe devolver error 400 cuando n no es un número', async () => {
      await expectFibonacciError('abc', 'El parámetro debe ser un número entero');
    });

    it('debe devolver error 400 cuando n es negativo', async () => {
      await expectFibonacciError('-5', 'El número no puede ser negativo');
    });
  });
});