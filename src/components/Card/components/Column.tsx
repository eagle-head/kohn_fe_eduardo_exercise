// src/components/Card/components/Column.tsx
import * as React from 'react';

type ColumnProps = {
  columnKey: string;
  columnValue: string;
};

export function Column({ columnKey, columnValue }: ColumnProps): JSX.Element {
  return (
    <p>
      <strong>{columnKey}</strong>&nbsp;{columnValue}
    </p>
  );
}
