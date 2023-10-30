// src/components/Header/index.tsx
import * as React from 'react';

import { useNavigate } from 'react-router-dom';

import { HeaderContainer, NavigationHeader, BackButton } from './styles';

type HeaderProps = {
  title: string;
  showBackButton?: boolean;
};

export function Header({ title, showBackButton = true }: HeaderProps) {
  const navigate = useNavigate();

  const goBackHandler = () => {
    navigate(-1);
  };

  return (
    <HeaderContainer>
      <NavigationHeader>
        {showBackButton ? <BackButton onClick={goBackHandler}>🔙</BackButton> : null}
        <h1>{title}</h1>
      </NavigationHeader>
    </HeaderContainer>
  );
}
