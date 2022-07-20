import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const namePokemon = '/pokemons/25';
describe('Teste se o componente PokemonDetails', () => {
  test('Teste se a página contém um texto name', () => {
    const { history } = renderWithRouter(<App />);
    history.push(namePokemon);
    const pokemonDetails = screen.getByRole('heading', {
      name: /pikachu details/i,
    });
    expect(pokemonDetails).toBeInTheDocument();
  });

  test('Teste o link de navegação para os detalhes', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(link).toBeInTheDocument();
  });
  test('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    const { history } = renderWithRouter(<App />);
    history.push(namePokemon);
    const detailsSummary = screen.getByRole('heading', {
      name: /Summary/i,
      level: 2,
    });
    expect(detailsSummary).toBeInTheDocument();
  });
  test('Teste seção de detalhes deve conter um parágrafo com o resumo do pokémon',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push(namePokemon);
      const resumo = screen.getByText(/this intelligent pokémon roasts hard berries/i);
      expect(resumo).toBeInTheDocument();
    });
  test('Na seção de detalhes deverá existir um heading h2 com', () => {
    const { history } = renderWithRouter(<App />);
    history.push(namePokemon);
    const details = screen.getByRole('heading', { name: /game locations of pikachu/i });
    expect(details).toBeInTheDocument();
  });
  test('Todas as localizações do pokémon devem ser mostradas', () => {
    const { history } = renderWithRouter(<App />);
    history.push(namePokemon);
    const location1 = screen.getByText(/kanto viridian forest/i);
    const location2 = screen.getByText(/kanto power plant/i);
    expect(location1).toBeInTheDocument();
    expect(location2).toBeInTheDocument();
  });
  test('Devem ser exibidos o nome da localização e uma imagem do mapa', () => {
    const { history } = renderWithRouter(<App />);
    history.push(namePokemon);
    const img = screen.getAllByAltText('Pikachu location');
    expect(img[0]).toBeInTheDocument();
    expect(img[1]).toBeInTheDocument();
    expect(img[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(img[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  test('A página deve exibir um checkbox que permite favoritar o pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(namePokemon);
    const favoritePokemon = screen.getByRole('checkbox',
      { name: /pokémon favoritado\?/i });
    expect(favoritePokemon).toBeInTheDocument();
    userEvent.click(favoritePokemon);
    const listFavorite = screen.getByRole('img',
      { name: /pikachu is marked as favorite/i });
    expect(listFavorite).toBeInTheDocument();
    userEvent.click(favoritePokemon);
    expect(listFavorite).not.toBeInTheDocument();
  });
});
