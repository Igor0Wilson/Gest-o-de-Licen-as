import React, { useContext, useState } from "react";
import { ErrorText, Form, Title } from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import firestore from "@react-native-firebase/firestore";

import {
  Box,
  Button,
  FormControl,
  HStack,
  Icon,
  Input,
  Stack,
  Text,
} from "native-base";
import { useForm, Controller } from "react-hook-form";
import { Switch } from "react-native-gesture-handler";
import { AuthContext } from "../../../contexts/auth";
import { showToast } from "@components/ToastMessage";

type LicenceFormProps = {
  mac: string;
  expiresIn: string;
  isValid: boolean;
};

export function LicenceForm() {
  const { userData } = useContext(AuthContext);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LicenceFormProps>();

  function handleNewLicence(data: LicenceFormProps) {
    firestore()
      .collection("Licences")
      .add({
        mac: data.mac,
        expiresIn: data.expiresIn,
        isValid: data.isValid,
        created_by: userData.name,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        showToast("emerald.500", "Licença cadastrada com sucesso!");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <Box alignItems="center">
      <FormControl isRequired w="full" maxW="500px">
        <Form>
          <Title>
            <AntDesign name="idcard" size={30} color="black" /> Adicionar
            Licenças
          </Title>

          <Stack mt={3} space={4} w="full" maxW="500px">
            <Controller
              defaultValue=""
              control={control}
              name="mac"
              render={({ field: { onBlur, value, onChange } }) => (
                <Input
                  placeholder=" Digite o mac do cliente"
                  error={errors.mac}
                  errorText={errors.mac?.message}
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
                          name="computer"
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
                  message: "Mac do cliente é um campo obrigatório",
                },
              }}
            />
            <ErrorText>{errors.mac?.message}</ErrorText>

            <Controller
              defaultValue=""
              control={control}
              name="expiresIn"
              render={({ field: { onBlur, value, onChange } }) => (
                <Input
                  placeholder=" Digite a data de validade da licença"
                  error={errors.expiresIn}
                  errorText={errors.expiresIn?.message}
                  onBlur={onBlur}
                  value={value}
                  onChangeText={onChange}
                  variant="underlined"
                  autoCapitalize="none"
                  size="lg"
                  InputLeftElement={
                    <Icon
                      as={
                        <MaterialIcons
                          name="date-range"
                          size={24}
                          color="black"
                        />
                      }
                    />
                  }
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: "Data de validade da licença é um campo obrigatório",
                },
              }}
            />
            <ErrorText>{errors.expiresIn?.message}</ErrorText>

            <Input
              placeholder=" Digite o telefone do cliente"
              size="lg"
              isDisabled
              defaultValue={userData.name}
              variant="underlined"
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
              onPress={handleSubmit(handleNewLicence)}
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
