import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o card', () => {
  const rotaPikachu = '/pokemons/25';
  test('Teste se o nome do Pokemon é mostrado na tela', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    // textContent para pegar a propriedade de dentro do texto
    expect(pokemonName.textContent).toBe('Pikachu');
    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon.textContent).toBe('Electric');
    const pesoPokemon = screen.getByTestId('pokemon-weight');
    expect(pesoPokemon).toBeInTheDocument();
    const imgPokemon = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(imgPokemon).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(imgPokemon).toHaveAttribute('alt', 'Pikachu sprite');
  });

  test('Teste se o card contém um link', () => {
    const { history } = renderWithRouter(<App />);

    const linkCard = screen.getByRole('link', { name: /More details/i });
    expect(linkCard).toBeInTheDocument();
    userEvent.click(linkCard);
    expect(history.location.pathname).toBe(rotaPikachu);
    console.log(history);
  });

  test('Teste se a url muda para Pokemon Id', () => {
    const { history } = renderWithRouter(<App />);
    history.push(rotaPikachu);
    const urlId = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(urlId).toBeInTheDocument();
    userEvent.click(urlId);
  });
  test('Teste se existe uma imagem', () => {
    const { history } = renderWithRouter(<App />);
    history.push(rotaPikachu);
    const urlId = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(urlId).toBeInTheDocument();

    const imgIcone = screen.getByRole('img',
      { name: /pikachu is marked as favorite/i });
    expect(imgIcone).toBeInTheDocument();
    expect(imgIcone).toHaveAttribute('src', '/star-icon.svg');
    expect(imgIcone).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
