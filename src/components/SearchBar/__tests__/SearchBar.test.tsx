// src/components/SearchBar/SearchBar.test.tsx
import * as React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';

import { SearchBar } from '../SearchBar';

describe('SearchBar Component', () => {
  const handleChange = jest.fn();

  it('displays the correct value', () => {
    render(<SearchBar value="Test Value" onChange={() => {}} />);

    const input = screen.getByPlaceholderText('Search...');
    expect(input).toHaveValue('Test Value');
  });

  it('calls onChange when the value is changed', () => {
    render(<SearchBar value="" onChange={handleChange} />);

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'New Value' } });

    expect(handleChange).toHaveBeenCalledWith('New Value');
  });

  it('uses the default placeholder when none is provided', () => {
    render(<SearchBar value="" onChange={() => {}} />);

    const input = screen.getByPlaceholderText('Search...');
    expect(input).toHaveAttribute('placeholder', 'Search...');
  });

  it('displays the provided placeholder correctly', () => {
    render(<SearchBar value="" placeholder="Test Placeholder" onChange={() => {}} />);

    const input = screen.getByPlaceholderText('Test Placeholder');
    expect(input).toHaveAttribute('placeholder', 'Test Placeholder');
  });
});
