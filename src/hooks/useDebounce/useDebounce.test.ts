import { renderHook, act } from '@testing-library/react';

import { useDebounce } from './useDebounce';

describe('useDebounce hook', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce({ value: 'initial', delay: 500 }));

    expect(result.current.debouncedValue).toBe('initial');
  });

  it('waits for the specified delay to update the debounced value', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce({ value, delay }), {
      initialProps: { value: 'initial', delay: 500 },
    });

    rerender({ value: 'changed', delay: 500 });

    expect(result.current.debouncedValue).toBe('initial');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current.debouncedValue).toBe('changed');
  });
});
