import { render, screen } from '@testing-library/react';
import App from '../paginas/Principal/App';
import { buscaTransacoes, salvaTransacao } from './transacoes';
// import { BrowserRouter } from 'react-router-dom';
import api from './api';
import { buscaSaldo } from './saldo';

jest.mock('./api');

const mockTransaction = [
  {
    id: 1,
    transacao: 'Depósito',
    valor: '100',
    data: '22/11/2022',
    mes: 'Novembro',
  },
];
const mockBalance = 1000;
const mockRequestListTransactions = (responseData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: responseData,
      });
    }, 200);
  });
};
const mockRequestListTransactionsError = () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject();
    }, 200);
  });
};

const mockRequestGetBalance = (balanceData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: balanceData,
      });
    }, 200);
  });
};

const mockRequestPost = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 201,
      });
    }, 200);
  });
};

const mockRequestPostError = () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject();
    }, 200);
  });
};
describe('API requests', () => {
  // only works without jest.mock('/api')
  // it('should return an array of transactions', async () => {
  //   const transactions = await buscaTransacoes();
  //   expect(transactions).toHaveLength(3);

  //   render(<App />, { wrapper: BrowserRouter });

  //   const transaction = await screen.findAllByText('Novembro');
  //   transaction.forEach((transaction) =>
  //     expect(transaction).toBeInTheDocument()
  //   );
  // });

  it('should return an array of transactions (equal mocked object)', async () => {
    api.get.mockImplementation(() =>
      mockRequestListTransactions(mockTransaction)
    );

    const transactions = await buscaTransacoes();

    expect(transactions).toEqual(mockTransaction);
    expect(api.get).toHaveBeenCalledWith('/transacoes');
  });

  it('should return an empty array of transactions (error)', async () => {
    api.get.mockImplementation(() => mockRequestListTransactionsError());

    const transactions = await buscaTransacoes();

    expect(transactions).toEqual([]);
    expect(api.get).toHaveBeenCalledWith('/transacoes');
  });

  it('should return user balance', async () => {
    api.get.mockImplementation(() => {
      mockRequestGetBalance(mockBalance);
    });

    const balance = await buscaSaldo();

    expect(balance).toEqual(mockBalance);
  });

  it('Should return status 201 - (Created) after POST request', async () => {
    api.post.mockImplementation(() => mockRequestPost());
    const status = await salvaTransacao(mockTransaction[0]);
    expect(status).toBe(201);
    expect(api.post).toHaveBeenCalledWith('/transacoes', mockTransaction[0]);
  });

  it('Deve retornar um saldo de 1000 quando a requisição POST falhar', async () => {
    api.post.mockImplementation(() => mockRequestPostError());
    const status = await salvaTransacao(mockTransaction[0]);
    expect(status).toBe('Erro na requisição');
    expect(api.post).toHaveBeenCalledWith('/transacoes', mockTransaction[0]);
  });
});
