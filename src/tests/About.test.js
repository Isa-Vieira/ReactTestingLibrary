import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('Teste o componente About', () => {
  test('Teste se contém um heading h2', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const h2 = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });
    expect(h2).toBeInTheDocument();
  });
  test('Teste se contém 2 parágrafos', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const contemParagrafo1 = screen.getByText(/This application simulates/i);
    expect(contemParagrafo1).toBeInTheDocument();
    const contemParagrafo2 = screen.getByText(/One can filter Pokémons/i);
    expect(contemParagrafo2).toBeInTheDocument();
  });
});
