import React, { useState } from "react";

import firestore from "@react-native-firebase/firestore";

import { ErrorText, Form, Title } from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import {
  Box,
  Button,
  FormControl,
  HStack,
  Icon,
  Input,
  Stack,
  Switch,
  Text,
  WarningOutlineIcon,
} from "native-base";
import { useForm, Controller } from "react-hook-form";
import { Alert } from "react-native";

type ClientFormProps = {
  name: string;
  email: string;
  phone: string;
  isValid: boolean;
};

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function ClientForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ClientFormProps>();

  function handleNewClient(data: ClientFormProps) {
    setIsLoading(true);

    firestore()
      .collection("Client")
      .add({
        name: data.name,
        email: data.email,
        telephone: data.phone,
        isValid: data.isValid,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert("Cadastro realizado!", "Cliente cadastrado com sucesso!");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <Box alignItems="center">
      <FormControl isRequired w="full" maxW="500px">
        <Form>
          <Title>
            <AntDesign name="addusergroup" size={30} color="black" /> Adicionar
            Cliente
          </Title>

          <Stack mt={3} space={4} w="full" maxW="500px">
            <Controller
              defaultValue=""
              control={control}
              name="name"
              render={({ field: { onBlur, value, onChange } }) => (
                <Input
                  placeholder=" Digite o nome do cliente"
                  error={errors.name}
                  errorText={errors.name?.message}
                  onBlur={onBlur}
                  value={value}
                  onChangeText={onChange}
                  variant="underlined"
                  // maxLength={23}
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
                  message: "Nome do cliente é um campo obrigatório",
                },
              }}
            />
            <ErrorText>{errors.name?.message}</ErrorText>

            <Controller
              defaultValue=""
              control={control}
              name="email"
              render={({ field: { onBlur, value, onChange } }) => (
                <Input
                  placeholder=" Digite o email do cliente"
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
              name="phone"
              render={({ field: { onBlur, value, onChange } }) => (
                <Input
                  placeholder=" Digite o telefone do cliente"
                  error={errors.phone}
                  errorText={errors.phone?.message}
                  onBlur={onBlur}
                  value={value}
                  onChangeText={onChange}
                  size="lg"
                  variant="underlined"
                  autoCapitalize="none"
                  InputLeftElement={
                    <Icon
                      as={
                        <MaterialIcons
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
                  message: "Telefone do cliente é um campo obrigatório",
                },
              }}
            />
            <ErrorText>{errors.phone?.message}</ErrorText>

            <Controller
              defaultValue={false}
              control={control}
              name="isValid"
              render={({ field: { onBlur, value, onChange } }) => (
                <HStack alignItems="center" space={4}>
                  <Switch size="md" onValueChange={onChange} value={value} />
                  <Text>Validado pelo administrador?</Text>
                </HStack>
              )}
            />

            <Button
              isLoading={isLoading}
              onPress={handleSubmit(handleNewClient)}
              spinnerPlacement="end"
              isLoadingText="Carregando"
            >
              Cadastrar
            </Button>
          </Stack>
        </Form>
      </FormControl>
    </Box>
  );
}
