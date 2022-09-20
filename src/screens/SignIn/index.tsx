import React from "react";
import { KeyboardAvoidingView, Platform, Image } from "react-native";
import { SignInForm } from "@components/Forms/SignInForm";
import { Container, Content, Title } from "./styles";

export function SignIn() {
  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Content>
          <Title>Gestão de Licenças</Title>
          <SignInForm />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}
