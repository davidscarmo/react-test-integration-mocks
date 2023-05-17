import { act, renderHook } from '@testing-library/react';
import { buscaTransacoes } from '../services/transacoes';
import useListaTransacoes from './useListaTransacoes';

const mockTransaction = [
  {
    id: 1,
    transacao: 'Depósito',
    valor: '100',
    data: '22/11/2022',
    mes: 'Novembro',
  },
];

jest.mock('../services/transacoes');

describe('hooks/useListaTransacoes.js', () => {
  it('should return a list of transactions and a function that sets the transactions list', async () => {
    buscaTransacoes.mockImplementation(() => mockTransaction);

    const { result } = renderHook(() => useListaTransacoes());
    expect(result.current[0]).toEqual([]);

    await act(async () => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(mockTransaction);
  });
});
