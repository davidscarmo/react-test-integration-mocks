import { renderHook } from '@testing-library/react';
import { useEffect, useState } from 'react';

it('Hooks', () => {
  const { result } = renderHook(() => {
    const [name, setName] = useState('');
    useEffect(() => {
      setName('Alice');
    }, []);

    return name;
  });

  expect(result.current).toBe('Alice');
});
