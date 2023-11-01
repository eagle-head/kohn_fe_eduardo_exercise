import React from 'react';

import { fireEvent, render, screen } from 'tests/test-utils';

import { Header } from '../Header';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

describe('Header', () => {
  it('should render back button in header', () => {
    render(<Header title="Header" showBackButton />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should not render back button in header', () => {
    render(<Header title="Header" showBackButton={false} />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should navigate back when back button is clicked', () => {
    render(<Header title="Header" showBackButton />);

    fireEvent.click(screen.getByRole('button'));

    expect(mockUseNavigate).toHaveBeenCalled();
  });
});
