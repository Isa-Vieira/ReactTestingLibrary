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
      name: /Not Found/i,
      level: 2,
    });
    expect(headingH2).toBeInTheDocument();
  });
  test('Test se a pagina contem a imagem de uma Pokedex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/NotFoud');
    const imgMedia = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i });
    expect(imgMedia).toBeInTheDocument();
    expect(imgMedia).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
