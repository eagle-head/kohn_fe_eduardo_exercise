import styled from 'styled-components';

export const StyledInput = styled.input`
  min-width: 300px;
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  transition: border 0.3s;

  &:focus {
    border-color: #555;
  }
`;
