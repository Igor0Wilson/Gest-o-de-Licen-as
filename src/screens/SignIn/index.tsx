import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SignInForm } from "@components/Forms/SignInForm";
import { Container, Content, Title } from "./styles";
import { Center } from "native-base";

export function SignIn() {
  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Center>
          <Content>
            <Title>Gestão de Licenças</Title>
            <SignInForm />
          </Content>
        </Center>
      </KeyboardAvoidingView>
    </Container>
  );
}
