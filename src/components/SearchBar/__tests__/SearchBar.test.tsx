// SearchBar.test.tsx
import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';

import { useDebounce } from 'hooks/useDebounce/useDebounce';

import { SearchBar } from '../SearchBar';

jest.mock('hooks/useDebounce/useDebounce');

describe('SearchBar', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    (useDebounce as jest.Mock).mockReturnValue({
      debouncedValue: '',
    });
  });

  it('should render with initial value and placeholder', () => {
    render(<SearchBar value="Initial" onChange={mockOnChange} placeholder="Test Placeholder" />);

    expect(screen.getByDisplayValue('Initial')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Test Placeholder')).toBeInTheDocument();
  });

  it('should call onChange with debounced value', () => {
    (useDebounce as jest.Mock).mockReturnValueOnce({
      debouncedValue: 'Test',
    });

    render(<SearchBar value="" onChange={mockOnChange} />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Test' } });

    expect(mockOnChange).toHaveBeenCalledWith('Test');
  });

  it('should update internal value on user input', () => {
    render(<SearchBar value="" onChange={mockOnChange} />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Test Value' } });

    expect(screen.getByDisplayValue('Test Value')).toBeInTheDocument();
  });
});
