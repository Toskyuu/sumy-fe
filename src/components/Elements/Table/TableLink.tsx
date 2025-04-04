import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface TableLinkProps {
  to: string;
  children: ReactNode;
}

export const TableLink = ({ to, children }: TableLinkProps) => {
  return <StyledLink to={to}>{children}</StyledLink>;
};

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text.themeDark};
  cursor: pointer;
  font-weight: 600;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;
