import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';

import { FooterButton } from '@components/Controllers/FooterButton';
import { Form, Title, Footer } from './styles';
import { Box, Button, FormControl, HStack, Icon, Input, Stack } from 'native-base';
import { useForm, Controller } from "react-hook-form";
import { ErrorText } from '../RegisterForm/styles';
import { AuthContext } from '../../../contexts/auth';

import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from "@expo/vector-icons";
import { Fontisto } from '@expo/vector-icons';

type SignInFormProps = {
  name: string;
  email: string;
  phone: string;
  password: string;
  admin: boolean;
  colab: boolean;
  isActive: boolean;
}

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export function SignInForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const { user } = useContext(AuthContext);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignInFormProps>();

  function handleSignIn() {
    setIsLoading(true);
    console.log(user);
  }

  function handleForgotPassword() {

  }

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
                  placeholder="  Digite o email do usuário"
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
                      as={
                        <Fontisto
                          name="email"
                          size={5}
                          ml={2}
                          color="muted.400"
                        />
                      }
                    />
                  }
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: "E-mail do cliente é um campo obrigatório"
                }, 
                pattern: {
                  value: EMAIL_REGEX,
                  message: "E-mail inválido"
                }
              }}
            />
            <ErrorText>{errors.email?.message}</ErrorText>

            <Controller
              defaultValue=""
              control={control}
              name="password"
              render={({ field: { onBlur, value, onChange } }) => (
                <Input
                  placeholder=" Digite a senha do usuário"
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
                      as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />}
                      size={5}
                      mr="2"
                      color="muted.400"
                      onPress={() => setShow(!show)}
                    />
                  }
                  InputLeftElement={
                    <Icon
                      as={<Entypo name="lock" size={24} color="black" />}
                      size={5}
                      color="muted.400"
                      onPress={() => setShow(!show)}
                    />
                  }
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: "Senha do usuário é um campo obrigatório"
                } 
              }}
            />
            <ErrorText>{errors.password?.message}</ErrorText>

            <Button
              isLoading={isLoading}
              onPress={handleSubmit(handleSignIn)}
              spinnerPlacement="end"
              isLoadingText="Carregando"
            >
              Entrar
            </Button>

            <Footer>
                <FooterButton title="Esqueci senha" icon="email" onPress={handleForgotPassword} />
            </Footer>
          </Stack> 
        </Form>
      </FormControl>
    </Box>
  );
}