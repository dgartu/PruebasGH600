import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../src/app.js';

describe('Endpoint Fibonacci', () => {
  it('debe generar los primeros 5 números de Fibonacci', async () => {
    const res = await request(app).get('/fibonacci/5');
    expect(res.status).toBe(200);
    expect(res.body.fibonacci).toEqual([0, 1, 1, 2, 3]);
  });

  it('debe generar los primeros 10 números de Fibonacci', async () => {
    const res = await request(app).get('/fibonacci/10');
    expect(res.status).toBe(200);
    expect(res.body.fibonacci).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
  });

  it('debe generar correctamente para n=1', async () => {
    const res = await request(app).get('/fibonacci/1');
    expect(res.status).toBe(200);
    expect(res.body.fibonacci).toEqual([0]);
  });

  it('debe generar correctamente para n=2', async () => {
    const res = await request(app).get('/fibonacci/2');
    expect(res.status).toBe(200);
    expect(res.body.fibonacci).toEqual([0, 1]);
  });

  it('debe retornar error cuando n es 0', async () => {
    const res = await request(app).get('/fibonacci/0');
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
    expect(res.body.error).toBe('El número debe ser mayor que 0');
  });

  it('debe retornar error cuando n es mayor a 1000', async () => {
    const res = await request(app).get('/fibonacci/1001');
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
    expect(res.body.error).toBe('El número no debe ser mayor a 1000');
  });

  it('debe retornar error cuando n es negativo', async () => {
    const res = await request(app).get('/fibonacci/-5');
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
    expect(res.body.error).toBe('El número debe ser positivo');
  });

  it('debe retornar error cuando n no es un número', async () => {
    const res = await request(app).get('/fibonacci/abc');
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
    expect(res.body.error).toBe('El parámetro debe ser un número entero válido');
  });

  it('debe retornar error cuando n es un número decimal', async () => {
    const res = await request(app).get('/fibonacci/5.5');
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
    expect(res.body.error).toBe('El parámetro debe ser un número entero válido');
  });
});