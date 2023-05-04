import { render, screen } from '@testing-library/react';
import App from './paginas/Principal/App';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import Cartoes from './componentes/Cartoes';
import AppRoutes from './routes';
describe('Routes', () => {
  it('should render main route', () => {
    render(<App />, { wrapper: BrowserRouter });
    const user = screen.getByText('Olá, Joana :)!');
    expect(user).toBeInTheDocument();
  });

  it('Should render route cartoes', () => {
    const route = '/cartoes';

    render(
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/cartoes" element={<Cartoes />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const myCards = screen.getByText('Meus cartões');

    expect(myCards).toHaveTextContent('Meus cartões');
  });

  it('should render current roote location', () => {
    const route = '/cartoes';
    render(
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    );
    const currentLocation = screen.getByTestId('location');
    expect(currentLocation).toHaveTextContent(route);
  });

  it('should render not found page', () => {
    const route = '/extrato';

    render(
      <MemoryRouter initialEntries={[route]}>
        <AppRoutes />
      </MemoryRouter>
    );

    const errorPage = screen.getByTestId('pagina-404');
    expect(errorPage).toContainHTML('<h1>Ops! Não encontramos a página</h1>')
  });
});
