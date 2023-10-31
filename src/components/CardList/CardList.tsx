// src/components/CardList/index.tsx
import * as React from 'react';

import { ListItem } from 'interfaces';

import { Card } from '../Card/Card';

import { Container } from './styles';

interface CardListProps {
  items?: ListItem[];
  hasNavigation?: boolean;
}

export const CardList = ({ items, hasNavigation = true }: CardListProps) => {
  return (
    <Container>
      {items.map(({ url, id, columns, navigationProps }, index) => {
        return (
          <Card
            key={`${id}-${index}`}
            id={id}
            columns={columns}
            navigationProps={navigationProps}
            hasNavigation={hasNavigation}
            url={url}
          />
        );
      })}
    </Container>
  );
};
