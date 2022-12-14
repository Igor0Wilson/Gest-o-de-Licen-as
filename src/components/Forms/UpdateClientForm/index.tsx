import React, { useContext, useEffect, useState } from "react";

import firestore from "@react-native-firebase/firestore";
import { TextInputMask } from "react-native-masked-text";

import { ErrorText, Form, Title } from "./styles";
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
} from "native-base";
import { useForm, Controller } from "react-hook-form";
import { FontAwesome5 } from "@expo/vector-icons";
import { Load } from "@components/Controllers/Spinner";
import { showToast } from "@components/ToastMessage";
import { AuthContext } from "../../../contexts/auth";

type ClientFormProps = {
  name: string;
  email: string;
  phone: string;
  isValid: boolean;
};

type Props = {
  uid: string;
};

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function UpdateClientForm({ uid }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [clientData, setClientData] = useState();

  const { userData } = useContext(AuthContext);

  useEffect(() => {
    firestore()
      .collection("Client")
      .doc(uid)
      .get()
      // @ts-ignore
      .then((data) => setClientData(data._data));
  }, []);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ClientFormProps>();

  console.log(userData.role);

  function handleUpdateClient(data: ClientFormProps) {
    setIsLoading(true);
    if (userData?.role !== "adm" && data.isValid === true) {
      showToast(
        "danger.400",
        "Você não tem permissão para validar um cliente!"
      );
    } else {
      if (
        // @ts-ignore
        clientData?.isValid === false ||
        // @ts-ignore
        (clientData?.isValid === true && userData?.role === "adm")
      ) {
        firestore()
          .collection("Client")
          .doc(uid)
          .update({
            name: data.name,
            email: data.email,
            telephone: data.phone,
            isValid: data.isValid,
            updated_by: userData.name,
            updated_at: firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            showToast(
              "emerald.500",
              "Informações do cliente atualizadas com sucesso!"
            );
          })
          .catch((error) => {
            throw error;
          });
      } else {
        showToast(
          "danger.400",
          "Você não tem permissão para executar esta ação!"
        );
      }
    }
  }

  const updateClientForm =
    clientData === undefined ? (
      <Load />
    ) : (
      <Form>
        <Title>
          <FontAwesome5 name="user-edit" size={30} color="black" /> Editar
          Cliente
        </Title>

        <Stack mt={3} space={4} w="full" maxW="500px">
          <Controller
            // @ts-ignore
            defaultValue={clientData?.name}
            control={control}
            name="name"
            render={({ field: { onBlur, value, onChange } }) => (
              <Input
                placeholder=" Digite o nome do cliente"
                // @ts-ignore
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
                message: "Nome do cliente é um campo obrigatório",
              },
            }}
          />
          <ErrorText>{errors.name?.message}</ErrorText>

          <Controller
            // @ts-ignore
            defaultValue={clientData?.email}
            control={control}
            name="email"
            render={({ field: { onBlur, value, onChange } }) => (
              <Input
                placeholder=" Digite o email do cliente"
                // @ts-ignore
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
            // @ts-ignore
            defaultValue={clientData?.telephone}
            control={control}
            name="phone"
            render={({ field: { onBlur, value, onChange } }) => (
              <TextInputMask
                type={"cel-phone"}
                options={{
                  maskType: "BRL",
                  withDDD: true,
                  dddMask: "(99) ",
                }}
                customTextInput={Input}
                placeholder=" Digite o telefone do cliente"
                // @ts-ignore
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
            // @ts-ignore
            defaultValue={clientData?.isValid}
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
            bg={"primary.800"}
            onPress={handleSubmit(handleUpdateClient)}
            spinnerPlacement="end"
          >
            Concluir
          </Button>
        </Stack>
      </Form>
    );

  return (
    <Box alignItems="center">
      <FormControl isRequired w="full" maxW="500px">
        {updateClientForm}
      </FormControl>
    </Box>
  );
}
