import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste se a mensagem é exibida', () => {
  test('Teste se a página contém um heading h2 Encountered pokémons', () => {
    renderWithRouter(<App />);
    const pokedexH2 = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(pokedexH2).toBeInTheDocument();
  });
  test('Teste se exibe o proximo pokemon', () => {
    renderWithRouter(<App />);
    const buttonText = screen.getByText('Próximo pokémon');
    expect(buttonText).toBeInTheDocument();
    userEvent.click(buttonText);
    userEvent.click(buttonText);
    userEvent.click(buttonText);
    userEvent.click(buttonText);
    userEvent.click(buttonText);
    userEvent.click(buttonText);
    userEvent.click(buttonText);
    userEvent.click(buttonText);
    const ultimoPokemon = screen.getByText(/Dragonair/i);
    expect(ultimoPokemon).toBeInTheDocument();
    userEvent.click(buttonText);
    const primeiroPokemon = screen.getByText(/Pikachu/i);
    expect(primeiroPokemon).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);
    const apenasUmPokemon = screen.getByRole('link', { name: /more details/i });
    expect(apenasUmPokemon).toBeInTheDocument();
  });

  test('Teste se a pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const todosOsButtons = screen.getAllByTestId('pokemon-type-button');
    todosOsButtons.forEach((button) => {
      expect(button).toBeInTheDocument();
    });
  });

  test('Teste a circulação da pokedex', () => {
    renderWithRouter(<App />);
    const buttonCircle = screen.getByRole('button', { name: /psychic/i });
    userEvent.click(buttonCircle);
    expect(buttonCircle).toBeInTheDocument();
    const card1 = screen.getByText(/alakazam/i);
    expect(card1).toBeInTheDocument();
    const buttonProximo = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(buttonProximo);
    const card2 = screen.getByText(/mew/i);
    expect(card2).toBeInTheDocument();
  });

  test('Teste se a Pokédex contém um botão para resetar', () => {
    renderWithRouter(<App />);
    const buttonTextAll = screen.getByText('All');
    userEvent.click(buttonTextAll);
    expect(buttonTextAll).toBeInTheDocument();
    const buttonEletric = screen.getByRole('button', { name: /electric/i });
    expect(buttonEletric).toBeInTheDocument();
  });
});
