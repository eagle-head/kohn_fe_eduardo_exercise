// src/components/List/index.tsx
import * as React from 'react';

import { ListItem } from 'interfaces';

import { Card } from '../Card/Card';
import { Spinner } from '../Spinner/Spinner';

import { Container } from './styles';

interface Props {
  items?: ListItem[];
  hasNavigation?: boolean;
  isLoading: boolean;
}

export const List = ({ items, hasNavigation = true, isLoading }: Props) => {
  return (
    <Container>
      {isLoading && <Spinner />}
      {!isLoading &&
        items.map(({ url, id, columns, navigationProps }, index) => {
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
