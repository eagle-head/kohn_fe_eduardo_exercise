// src/components/Card/index.tsx
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Teams, UserData } from 'interfaces';
import { Container } from './styles';

interface Props {
  id?: string;
  url?: string;
  columns: Array<{
    key: string;
    value: string;
  }>;
  hasNavigation?: boolean;
  navigationProps?: UserData | Teams;
}

export const Card = ({ id, columns, url, hasNavigation = true, navigationProps = null }: Props): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Container
      data-testid={`cardContainer-${id}`}
      hasNavigation={hasNavigation}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        if (hasNavigation) {
          navigate(url, {
            state: navigationProps,
          });
        }
        e.preventDefault();
      }}
    >
      {columns.map(({ key: columnKey, value }) => (
        <p key={columnKey}>
          <strong>{columnKey}</strong>&nbsp;{value}
        </p>
      ))}
    </Container>
  );
};
