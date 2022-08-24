import React from 'react';

import { Container } from './styles';
import { Header } from '@components/Layout/Header';
import { Licences } from '@components/Lists/Licences';
import { NewOrder } from '@components/Controllers/NewOrder';
import { Divider } from 'native-base';

export function Home() {
  return (
    <Container>
      <Header />
      <Divider my="2" />
      <Licences />
      <NewOrder />
    </Container>
  );
}