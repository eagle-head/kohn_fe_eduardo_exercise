// src/components/SearchBar/SearchBar.tsx
import * as React from 'react';

import { StyledInput } from './styles';

interface SearchBarProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, placeholder = 'Search...', onChange }) => {
  return <StyledInput type="text" placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} />;
};
