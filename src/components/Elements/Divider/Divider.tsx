import styled from 'styled-components';

const Divider = styled.div`
  ${({ theme }) => `
    width: 100%; 
    height: 3px; 
    background-color: #cdcdcd; 
    margin: ${theme.space[3]} 0; 
  `}
`;

export default Divider;
