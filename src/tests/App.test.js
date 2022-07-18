import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('Teste os links', () => {
  test('Teste se o primeiro link possui o texto Home', () => {
    renderWithRouter(<App />);
    const linkElement = screen.getByText(/Home/i);
    expect(linkElement).toBeInTheDocument();
  });
});
test('Teste se o primeiro link possui o texto About', () => {
  renderWithRouter(<App />);
  const linkElement = screen.getByText(/About/i);
  expect(linkElement).toBeInTheDocument();
});
test('Teste se o primeiro link possui o texto Favorite Pokémons', () => {
  renderWithRouter(<App />);
  const linkElement = screen.getByText(/Favorite/i);
  expect(linkElement).toBeInTheDocument();
});
test('Teste se renderiza a pagina notfound', () => {
  const { history, container } = renderWithRouter(<App />);
  const notFound = '/NotFound';
  history.push(notFound);
  expect(container.innerHTML).toMatch(/Not Found/i);
});

export default App;
