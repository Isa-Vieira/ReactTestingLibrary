import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

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
  test('Test se a pagina contem a imagem de uma Pokedex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const img = screen.getByRole('img', { name: /pokédex/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
