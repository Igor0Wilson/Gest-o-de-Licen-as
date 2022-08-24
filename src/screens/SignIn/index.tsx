import React from 'react';
import { KeyboardAvoidingView, Platform, Image } from 'react-native';

import signInAnimation from '@assets/animations/signin.json';

import { SignInForm } from '@components/Forms/SignInForm';
import { Lottie } from '@components/Animations/Lottie';

import { Container, Content, Title } from './styles';

export function SignIn() {
  return (
    <Container>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Content>
          <Title>Área restrita!</Title>
          <SignInForm />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}
