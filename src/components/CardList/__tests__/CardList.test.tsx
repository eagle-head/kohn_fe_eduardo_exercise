// src/components/CardList/__tests__/CardList.test.tsx
import React from 'react';

import { render, screen } from 'tests/test-utils';

import { CardList } from '../CardList';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => jest.fn(),
}));

describe('List', () => {
  it('should render items', () => {
    const items = [
      {
        id: '1',
        columns: [
          {
            key: 'columnKey1',
            value: 'columnValue1',
          },
        ],
      },
    ];

    render(<CardList items={items} />);

    expect(screen.getByTestId('card-container-1')).toBeInTheDocument();
  });

  it('should render multiple cards when multiple items are provided', () => {
    const items = [
      {
        id: '1',
        columns: [
          {
            key: 'columnKey1',
            value: 'columnValue1',
          },
        ],
      },
      {
        id: '2',
        columns: [
          {
            key: 'columnKey2',
            value: 'columnValue2',
          },
        ],
      },
    ];

    render(<CardList items={items} />);

    expect(screen.getByTestId('card-container-1')).toBeInTheDocument();
    expect(screen.getByTestId('card-container-2')).toBeInTheDocument();
  });
});
