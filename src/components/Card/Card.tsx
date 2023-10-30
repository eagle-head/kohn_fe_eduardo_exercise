// src/components/Card/index.tsx
import * as React from 'react';

import { useNavigate } from 'react-router-dom';

import { Teams, UserData } from 'interfaces';

import { ColumnList } from './components/ColumnList';
import { Container } from './styles';

export type TColumn = {
  key: string;
  value: string;
};

type CardProps = {
  id?: string;
  url?: string;
  columns: TColumn[];
  hasNavigation?: boolean;
  navigationProps?: UserData | Teams;
};

export function Card({ id, columns, url, hasNavigation = true, navigationProps = null }: CardProps): JSX.Element {
  const navigate = useNavigate();

  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (hasNavigation) {
      navigate(url, { state: navigationProps });
    }

    event.preventDefault();
  };

  return (
    <Container data-testid={`card-container-${id}`} hasNavigation={hasNavigation} onClick={onClick}>
      <ColumnList columns={columns} />
    </Container>
  );
}
