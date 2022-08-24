import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '@components/Layout/Header';

import { Background, Container } from './styles';
import { NewUser } from '@components/Controllers/NewUser';
import { Users } from '@components/Lists/Users';


export function Register() {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <Background>
      <Header />
      <Container>
        <Users />
        <NewUser />
      </Container>
    </Background>
  );
}

