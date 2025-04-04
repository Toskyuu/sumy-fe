import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode } from 'react';
import styled from 'styled-components';

import { LoadingSpinner } from '@/components/Elements/LoadingSpinner';
import { Tooltip } from '@/components/Elements/Tooltip.tsx';

type Variant = 'primary' | 'secondary' | 'warning' | 'success' | 'danger';

export interface ColumnProps<T> {
  key: string;
  title: ReactNode;
  render?: (column: ColumnProps<T>, item: T) => ReactNode;
}

export interface ActionProps<T> {
  key: string;
  title: ReactNode;
  icon?: IconDefinition;
  hidden?: (item: T) => boolean;
  onClick: (item: T) => void;
  colorVariant?: Variant;
}

type TableIconProps = {
  variant?: Variant;
};

type TableProps<T> = {
  columns: Array<ColumnProps<T>>;
  actions?: Array<ActionProps<T>>;
  data?: T[];
  maxRows?: number;
  isLoading?: boolean;
};

const ROW_SIZE = 3.5; // rem

export const Table = <T,>({ data, columns, actions, maxRows, isLoading }: TableProps<T>) => {
  const headers = columns.map((column, index) => {
    return <TableHeaderCell key={`headCell-${index}`}>{column.title}</TableHeaderCell>;
  });

  const rows = !data?.length ? (
    <TableRow>
      <TableCell colSpan={columns.length + +!!actions}>
        {isLoading ? <LoadingSpinner /> : 'Brak danych...'}
      </TableCell>
    </TableRow>
  ) : (
    data?.map((row, index) => {
      return (
        <TableRow key={`row-${index}`}>
          {columns.map((column, index2) => {
            const value = column.render
              ? column.render(column, row as T)
              : (row[column.key as keyof typeof row] as string);

            return <TableCell key={`cell-${index2}`}>{value}</TableCell>;
          })}
          {actions && (
            <ActionsCell>
              {actions.map(({ hidden, title, icon, onClick, colorVariant }, index) => {
                if (hidden && hidden(row as T)) {
                  return null;
                }
                return icon ? (
                  <Icon
                    key={`action-${index}`}
                    onClick={() => onClick(row as T)}
                    variant={colorVariant}>
                    {typeof title === 'string' ? (
                      <Tooltip button={true} message={title}>
                        <FontAwesomeIcon icon={icon} />
                      </Tooltip>
                    ) : (
                      <FontAwesomeIcon icon={icon} />
                    )}
                  </Icon>
                ) : (
                  <button key={`action-${index}`} onClick={() => onClick(row as T)}>
                    {title}
                  </button>
                );
              })}
            </ActionsCell>
          )}
        </TableRow>
      );
    })
  );

  return (
    <TableContainer maxrows={maxRows}>
      <StyledTable>
        <TableHeader>
          <tr>
            {headers}
            {actions && <TableHeaderCell>Akcje</TableHeaderCell>}
          </tr>
        </TableHeader>
        <tbody>{rows}</tbody>
      </StyledTable>
    </TableContainer>
  );
};

const TableContainer = styled.div<{ maxrows?: number }>`
  width: 100%;
  overflow-x: auto;
  max-height: ${({ maxrows }) => (maxrows ? `${(maxrows + 1) * ROW_SIZE}rem` : 'auto')};
  border-radius: 1rem;
  position: relative;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 1rem;
  overflow: scroll;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  height: 1px;
`;

const TableHeader = styled.thead`
  position: sticky;
  top: 0;
  margin: 0;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TableHeaderCell = styled.th`
  padding: 1rem;
  height: ${ROW_SIZE}rem;
  text-align: left;
  background-color: ${({ theme }) => theme.colors.elements.dark};
  color: ${({ theme }) => theme.colors.text.light};
`;

const TableRow = styled.tr`
  background-color: ${({ theme }) => theme.colors.elements.light};
  color: ${({ theme }) => theme.colors.text.dark};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.elements.brightLight};
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  max-width: 25rem;
  text-overflow: ellipsis;
  text-align: left;
  text-wrap: nowrap;
  height: ${ROW_SIZE}rem;
`;

const ActionsCell = styled.td`
  padding: 0 0.5rem;
  display: flex;
  flex-wrap: nowrap;
  text-align: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Icon = styled.i<TableIconProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1 0;
  cursor: pointer;
  height: 60%;

  border-left: 1px solid ${({ theme }) => theme.colors.elements.light};
  background-color: ${({ theme, variant }) =>
    variant ? theme.colors.buttons[variant] : 'inherit'};
  color: ${({ theme }) => theme.colors.text.light};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:first-child {
    border-bottom-left-radius: 0.5rem;
    border-top-left-radius: 0.5rem;

    border: none;
  }
  &:last-child {
    border-bottom-right-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }
`;
