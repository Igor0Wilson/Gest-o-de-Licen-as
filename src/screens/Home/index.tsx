import React, { useContext } from 'react';

import { Background, Container } from './styles';
import { Header } from '@components/Layout/Header';
import { Licences } from '@components/Lists/Licences';
import { NewLicence } from '@components/Controllers/NewLicence';
import { AuthContext } from '../../contexts/auth';

export function Home() {

  return (
    <Background>
      <Header />
      <Container>
        <Licences />
        <NewLicence />
      </Container>
    </Background>
  );
}