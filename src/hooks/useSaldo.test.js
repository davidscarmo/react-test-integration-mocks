import { renderHook, act } from '@testing-library/react';
import { buscaSaldo } from '../services/saldo';
import useSaldo from './useSaldo';

jest.mock('../services/saldo');

const mockBalance = {
  valor: 100,
};
describe('hooks/useSaldo()', () => {
  it('should return balance value and the function to refresh the value ', async () => {
    buscaSaldo.mockImplementation(() => mockBalance.valor);
    const { result } = renderHook(() => useSaldo());

    expect(result.current[0]).toEqual(0);

    await act(async () => {
      result.current[1]();
    });

    expect(result.current[0]).toEqual(mockBalance.valor);
  });
});
