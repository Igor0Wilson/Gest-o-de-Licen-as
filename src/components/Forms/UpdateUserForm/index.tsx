import React, { useContext, useEffect, useState } from "react";

import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

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
  Radio,
  Stack,
  Switch,
  Text,
} from "native-base";
import { useForm, Controller } from "react-hook-form";
import { FontAwesome5 } from "@expo/vector-icons";
import { Load } from "@components/Controllers/Spinner";
import { showToast } from "@components/ToastMessage";
import { AuthContext } from "../../../contexts/auth";

type UserFormProps = {
  name: string;
  email: string;
  telephone: string;
  isActive: boolean;
  role: string;
};

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function UpdateClientForm({ uid }) {
  const [isLoading, setIsLoading] = useState(false);
  const [usersData, setUsersData] = useState();

  const { userData } = useContext(AuthContext);

  useEffect(() => {
    firestore()
      .collection("Users")
      .doc(uid)
      .get()
      .then((data) => setUsersData(data._data))
      .catch((error) => console.log(error));
  }, []);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserFormProps>();

  console.log(usersData);

  function handleUpdateUser(data: UserFormProps) {
    setIsLoading(true);

    firestore()
      .collection("Users")
      .doc(uid)
      .update({
        name: data.name,
        email: data.email,
        telephone: data.telephone,
        isActive: data.isActive,
        role: data.role,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        showToast(
          "emerald.500",
          "Informações do usuário atualizadas com sucesso!"
        );
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }

  function handleResetPassword(data: UserFormProps) {
    auth().sendPasswordResetEmail(data.email);
  }

  const updatedUsersForm =
    usersData === undefined ? (
      <Load />
    ) : (
      <Form>
        <Title>
          <FontAwesome5 name="user-edit" size={30} color="black" /> Editar
          Cliente
        </Title>

        <Stack mt={3} space={4} w="full" maxW="500px">
          <Controller
            defaultValue={usersData?.name}
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
                message: "Nome do usuário é um campo obrigatório",
              },
            }}
          />
          <ErrorText>{errors.name?.message}</ErrorText>

          <Controller
            defaultValue={usersData?.email}
            control={control}
            name="email"
            render={({ field: { onBlur, value, onChange } }) => (
              <Input
                error={errors.email}
                errorText={errors.email?.message}
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
                isDisabled
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
          />

          <Controller
            defaultValue={usersData?.telephone}
            control={control}
            name="telephone"
            render={({ field: { onBlur, value, onChange } }) => (
              <Input
                placeholder=" Digite o telefone do usuario"
                error={errors.telephone}
                errorText={errors.telephone?.message}
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
                message: "Telefone do usuário é um campo obrigatório",
              },
            }}
          />
          <ErrorText>{errors.telephone?.message}</ErrorText>

          <HStack justifyContent="center">
            <Controller
              defaultValue={usersData?.role}
              control={control}
              name="role"
              render={({ field: { value, onChange } }) => (
                <Radio.Group
                  name="role"
                  accessibilityLabel="favorite number"
                  value={value}
                  onChange={onChange}
                >
                  <Radio value="adm" colorScheme="emerald" size="sm" my={1}>
                    Administrador
                  </Radio>
                  <Radio value="colab" colorScheme="secondary" size="sm" my={1}>
                    Colaborador
                  </Radio>
                </Radio.Group>
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
            onPress={handleSubmit(handleUpdateUser)}
            spinnerPlacement="end"
            isLoadingText="Carregando"
          >
            Concluir
          </Button>
          <Button onPress={handleResetPassword}>Resetar senha</Button>
        </Stack>
      </Form>
    );

  return (
    <Box alignItems="center">
      <FormControl isRequired w="full" maxW="500px">
        {updatedUsersForm}
      </FormControl>
    </Box>
  );
}
