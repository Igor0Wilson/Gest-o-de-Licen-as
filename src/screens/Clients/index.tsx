import React from 'react';

import { Background, Container } from './styles';
import { Header } from '@components/Layout/Header';;
import { NewClient } from '@components/Controllers/NewClient';
import { ClientList } from '@components/Lists/Client';

export function Clients() {
  return (
    <Background>
      <Header />
      <Container>
        <ClientList />
        <NewClient/>
      </Container>
    </Background>
  );
}