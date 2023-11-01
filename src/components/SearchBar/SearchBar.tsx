// src/components/SearchBar/SearchBar.tsx
import * as React from 'react';

import { useDebounce } from 'hooks/useDebounce/useDebounce';

import { StyledInput } from './styles';

interface SearchBarProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, placeholder = 'Search...', onChange }: SearchBarProps) {
  const [internalValue, setInternalValue] = React.useState(value);
  const { debouncedValue } = useDebounce({ value: internalValue });

  React.useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  return (
    <StyledInput
      type="text"
      placeholder={placeholder}
      value={internalValue}
      onChange={e => setInternalValue(e.target.value)}
    />
  );
}
