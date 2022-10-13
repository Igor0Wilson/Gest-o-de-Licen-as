import React, { useState, useContext } from "react";

import { Form, Title, Footer } from "./styles";
import { Box, Button, FormControl, Icon, Input, Stack } from "native-base";
import { useForm, Controller } from "react-hook-form";
import { ErrorText } from "../RegisterForm/styles";
import { AuthContext } from "../../../contexts/auth";

import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

type SignInFormProps = {
  email: string;
  password: string;
};

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function SignInForm() {
  const [show, setShow] = useState(false);

  const { signIn } = useContext(AuthContext);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignInFormProps>();

  function handleSignIn(data: SignInFormProps) {
    // @ts-ignore
    signIn(data);
  }

  function handleForgotPassword() {}

  return (
    <Box alignItems="center">
      <FormControl isRequired w="full" maxW="500px">
        <Form>
          <Title>Entrar</Title>
          <Stack space={2} w="full" maxW="500px">
            <Controller
              defaultValue=""
              control={control}
              name="email"
              render={({ field: { onBlur, value, onChange } }) => (
                <Input
                  placeholder="Digite o email do usuário"
                  // @ts-ignore
                  error={errors.email}
                  errorText={errors.email?.message}
                  onBlur={onBlur}
                  value={value}
                  onChangeText={onChange}
                  variant="underlined"
                  autoCapitalize="none"
                  isRequired
                  size="lg"
                  InputLeftElement={
                    <Icon
                      mr={2}
                      as={<Fontisto name="email" size={5} color="muted.400" />}
                    />
                  }
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: "E-mail do cliente é um campo obrigatório",
                },
                pattern: {
                  value: EMAIL_REGEX,
                  message: "E-mail inválido",
                },
              }}
            />
            <ErrorText>{errors.email?.message}</ErrorText>

            <Controller
              defaultValue=""
              control={control}
              name="password"
              render={({ field: { onBlur, value, onChange } }) => (
                <Input
                  placeholder="Digite a senha do usuário"
                  // @ts-ignore
                  error={errors.password}
                  errorText={errors.password?.message}
                  onBlur={onBlur}
                  value={value}
                  onChangeText={onChange}
                  size="lg"
                  variant="underlined"
                  autoCapitalize="none"
                  type={show ? "text" : "password"}
                  InputRightElement={
                    <Icon
                      as={
                        <MaterialIcons
                          name={show ? "visibility" : "visibility-off"}
                        />
                      }
                      size={5}
                      mr={2}
                      color="muted.400"
                      onPress={() => setShow(!show)}
                    />
                  }
                  InputLeftElement={
                    <Icon
                      as={<Entypo name="lock" size={24} color="black" />}
                      size={5}
                      mr={2}
                      color="muted.400"
                      onPress={() => setShow(!show)}
                    />
                  }
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: "Senha do usuário é um campo obrigatório",
                },
              }}
            />
            <ErrorText>{errors.password?.message}</ErrorText>

            <Button
              // isLoading={loading}
              onPress={handleSubmit(handleSignIn)}
              spinnerPlacement="end"
              isLoadingText="Carregando"
            >
              Entrar
            </Button>

            {/* <Footer>
              <FooterButton
                title="Esqueci senha"
                icon="email"
                onPress={handleForgotPassword}
              />
            </Footer> */}
          </Stack>
        </Form>
      </FormControl>
    </Box>
  );
}
