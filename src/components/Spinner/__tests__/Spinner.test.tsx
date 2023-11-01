import React from 'react';

import { render, screen } from '@testing-library/react';

import { Spinner } from '../Spinner';

describe('Spinner', () => {
  it('should render spinner', () => {
    render(<Spinner />);

    const spinnerComponent = screen.getByTestId('spinner');
    expect(spinnerComponent).toBeInTheDocument();
  });
});
