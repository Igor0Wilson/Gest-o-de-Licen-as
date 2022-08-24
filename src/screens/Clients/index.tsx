import React from 'react';

import { Background, Container } from './styles';
import { Header } from '@components/Layout/Header';;
import { NewClient } from '@components/Controllers/NewClient';

export function Clients() {
  return (
    <Background>
      <Header />
      <Container>
        {/* <ClientForm /> */}
        <NewClient/>
      </Container>
    </Background>
  );
}