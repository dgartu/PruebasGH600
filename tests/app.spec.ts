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
    const successCases = [
      {
        name: 'debe devolver los primeros 10 números de Fibonacci',
        input: '10',
        expected: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34],
      },
      {
        name: 'debe devolver un arreglo vacío cuando n es 0',
        input: '0',
        expected: [],
      },
    ];

    for (const testCase of successCases) {
      it(testCase.name, async () => {
        const res = await request(app).get(`/fibonacci/${testCase.input}`);
        expect(res.status).toBe(200);
        expect(res.body.fibonacci).toEqual(testCase.expected);
      });
    }

    const errorCases = [
      {
        name: 'debe devolver error 400 cuando n es mayor a 1000',
        input: '1001',
        expectedError: 'El número es demasiado grande (máximo 1000)',
      },
      {
        name: 'debe devolver error 400 cuando n no es un número',
        input: 'abc',
        expectedError: 'El parámetro debe ser un número entero',
      },
      {
        name: 'debe devolver error 400 cuando n es negativo',
        input: '-5',
        expectedError: 'El número no puede ser negativo',
      },
    ];

    for (const testCase of errorCases) {
      it(testCase.name, async () => {
        const res = await request(app).get(`/fibonacci/${testCase.input}`);
        expect(res.status).toBe(400);
        expect(res.body.error).toBe(testCase.expectedError);
      });
    }
  });
});