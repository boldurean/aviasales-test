/* eslint-disable react/jsx-filename-extension */
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';
import * as fs from 'fs';
import path from 'path';
import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  render,
} from '@testing-library/react';
import Init from '../src/Init.jsx';

const ticketsPath = path.join(process.cwd(), '__mocks__', 'tickets.json');
const flyData = fs.readFileSync(ticketsPath, 'utf8');

const mockSearchId = (_req, res, ctx) => res(
  ctx.status(200),
  ctx.json({
    searchId: 'MOCK',
  }),
);

const mockFlyData = (req, res, ctx) => res(
  ctx.status(200),
  ctx.json(flyData),
);

const server = setupServer();

beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'warn',
  });

  rest.get('https://front-test.beta.aviasales.ru/search', mockSearchId);
  rest.get('/tickets', mockFlyData);
});

afterAll(() => {
  server.close();
});

beforeEach(() => {
  render(<Init />);
});

afterEach(() => {
  server.resetHandlers();
});

// TODO: tests
