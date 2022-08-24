import React from 'react';
import { LogoutButton } from '../LogoutButton';

import { Container, Greeting, Title, SubTitle } from './styles';

export function Header() {
  

  return (
    <Container>
      <Greeting>
        <Title>Gestão De Licenças</Title>
        <SubTitle>Sistema de controle de licenças de aplicações</SubTitle>
      </Greeting>
    </Container>
  );
}