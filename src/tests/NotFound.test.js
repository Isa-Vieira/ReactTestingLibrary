import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste se a mensagem é exibida', () => {
  test('Teste se a mensagem Page requested not found 😭', () => {
    renderWithRouter(<App />);
    const { history } = renderWithRouter(<App />);
    history.push('/NotFound');
    const headingH2 = screen.getByRole('heading', {
      name: /NotFound/i,
      level: 2,

    });
    expect(headingH2).toBeInTheDocument();
  });
});
