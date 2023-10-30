import * as React from 'react';

import { TColumn } from '../Card';

import { Column } from './Column';

type ColumnListProps = {
  columns: TColumn[];
};

export function ColumnList({ columns }: ColumnListProps): JSX.Element {
  return (
    <React.Fragment>
      {columns.map(column => (
        <Column key={column.key} columnKey={column.key} columnValue={column.value} />
      ))}
    </React.Fragment>
  );
}
