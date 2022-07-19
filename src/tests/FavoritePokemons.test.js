import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste se a mensagem é exibida', () => {
  test('Teste se a mensagem No favorite pokemon found é exibida', () => {
    renderWithRouter(<App />);
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
    const mensagePokemon = screen.getByText(/No favorite pokemon found/i);
    expect(mensagePokemon).toBeInTheDocument();
  });
  test('Teste se são exibidos os cards favoritados', () => {
    renderWithRouter(<App />);
    const buttonMoreDetails = screen.getByRole('link', { name: /more details/i });
    expect(buttonMoreDetails).toBeInTheDocument();
    userEvent.click(buttonMoreDetails);

    const save = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(save);

    expect(save).toBeInTheDocument();

    const favotitePokemon = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favotitePokemon);

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });
});
