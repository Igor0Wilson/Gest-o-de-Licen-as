import React, { useState } from "react";

import { ErrorText, Form, Title } from "./styles";

import { Fontisto } from '@expo/vector-icons';
import { Box, Button, FormControl, HStack, Icon, Input, Stack, Switch, Text } from "native-base";
import { useForm, Controller } from "react-hook-form";

//import icones
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from "@expo/vector-icons";


type UserFormProps = {
  name: string;
  email: string;
  phone: string;
  password: string;
  admin: boolean;
  colab: boolean;
  isActive: boolean;
}

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export function Register() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserFormProps>();

  function handleNewUser(data: UserFormProps) {
    
    console.log(data)
    setIsLoading(true);
  }

  return (
    <Box alignItems="center">
      <FormControl isRequired w="full" maxW="500px">
        <Form>
          <Title>
            <FontAwesome5 name="user-plus" size={24} color="black" /> Adicionar Usuário
          </Title>

          <Stack space={2} w="full" maxW="500px">     
            <Controller
              defaultValue=""
              control={control}
              name="name"
              render={({ field: { onBlur, value, onChange } }) => (
                <Input
                  placeholder=" Digite o nome do usuário"
                  error={errors.name}
                  errorText={errors.name?.message}
                  onBlur={onBlur}
                  value={value}
                  onChangeText={onChange}
                  variant="underlined"
                  size="lg"
                  autoCapitalize="none"
                  InputLeftElement={
                    <Icon
                      as={
                        <MaterialIcons
                          name="person"
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
                  message: "Nome do cliente é um campo obrigatório"
                } 
              }}
            />
            <ErrorText>{errors.name?.message}</ErrorText>

            <Controller
              defaultValue=""
              control={control}
              name="email"
              render={({ field: { onBlur, value, onChange } }) => (
                <Input
                  placeholder=" Digite o email do usuário"
                  error={errors.email}
                  errorText={errors.email?.message}
                  onBlur={onBlur}
                  value={value}
                  onChangeText={onChange}
                  variant="underlined"
                  autoCapitalize="none"
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
              name="phone"
              render={({ field: { onBlur, value, onChange } }) => (
                <Input
                  placeholder=" Digite o telefone do usuário"
                  error={errors.phone}
                  errorText={errors.phone?.message}
                  onBlur={onBlur}
                  value={value}
                  onChangeText={onChange}
                  variant="underlined"
                  autoCapitalize="none"
                  size="lg"
                  InputLeftElement={
                    <Icon
                      as={
                        <Fontisto
                          name="phone"
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
                  message: "Telefone do usuário é um campo obrigatório"
                }, 
              }}
            />
            <ErrorText>{errors.phone?.message}</ErrorText>

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
            <HStack  justifyContent="center">
              <Controller
                defaultValue={false}
                control={control}
                name="admin"
                render={({ field: { value, onChange } }) => (
                  <HStack alignItems="center" space={4}>
                    <Text>Administrador</Text>
                    <Switch
                      size="md" 
                      onValueChange={onChange}
                      value={value}
                    />
                    <Text>Colaborador</Text>
                  </HStack>
                )}
              /> 

            </HStack>

                  
              <Controller
                defaultValue={false}
                control={control}
                name="isActive"
                render={({ field: { value, onChange } }) => (
                  <HStack alignItems="center" space={4}>
                    <Switch
                      colorScheme="danger"
                      size="md" 
                      onValueChange={onChange}
                      value={value}
                    />
                    <Text>bloqueado</Text>
                  </HStack>
                )}
              />    


            

            <Button
              isLoading={isLoading}
              onPress={handleSubmit(handleNewUser)}
              spinnerPlacement="end"
              isLoadingText="Carregando"
            >
              Cadastrar Usuário
            </Button>
          </Stack> 
        </Form>
      </FormControl>
    </Box>
  );
}
