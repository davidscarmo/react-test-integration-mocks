import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import AppRoutes from "../../routes"


describe('<App /> Component', () => {
  it('should let add a transaction type balance',  () => {
    render(<App />, { wrapper: BrowserRouter })

    const select = screen.getByRole('combobox');
    const fieldValue = screen.getByPlaceholderText('Digite um valor')
    const button = screen.getByRole('button');

    userEvent.selectOptions(select, ['Depósito'])
    userEvent.type(fieldValue, '100')
    userEvent.click(button)

    const newTransaction = screen.getByTestId('lista-transacoes');
    const balanceItem = screen.getByRole('listitem')

    expect(newTransaction).toContainElement(balanceItem)

  })

  it('should redirect user to the right page by clickin in the link', async () => {
    render(<AppRoutes />, {wrapper: BrowserRouter})

    const linkPageCards = screen.getByText('Cartões');
    expect(linkPageCards).toBeInTheDocument()

    userEvent.click(linkPageCards)

    const titlePageCards = await screen.findByText('Meus cartões')
    expect(titlePageCards).toBeInTheDocument()
  })
})