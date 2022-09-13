import React, { useContext, useState, useEffect } from "react";
import { ErrorText, Form, Title } from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import firestore from "@react-native-firebase/firestore";

import {
  Box,
  Button,
  Center,
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
  day: Number;
  month: Number;
  expired: boolean;
  year: Number;
  isValid: boolean;
};

type props = {
  uid: string;
};

export function UpdateLicenceForm({ uid }: props) {
  const { userData } = useContext(AuthContext);
  const [licencesData, setLicencesData] = useState<LicenceFormProps>({});

  const date = new Date();
  const currentDay = date.getDate() - 1;
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();

  useEffect(() => {
    firestore()
      .collection("Licences")
      .doc(uid)
      .get()
      .then((data) => setLicencesData(data._data))
      .catch((error) => console.log(error));
  }, []);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LicenceFormProps>();

  function handleUpdateLicences(data: LicenceFormProps) {
    let isExpired = false;

    if (
      data.day < currentDay &&
      data.month <= currentMonth &&
      data.year <= currentYear
    ) {
      isExpired = true;
    } else if (
      data.day >= currentDay &&
      data.month >= currentMonth &&
      data.year < currentYear
    ) {
      isExpired = true;
    } else if (
      data.day > currentDay &&
      data.month < currentMonth &&
      data.year > currentYear
    ) {
      isExpired = true;
    } else if (
      data.day < currentDay &&
      data.month < currentMonth &&
      data.year < currentYear
    ) {
      isExpired = true;
    } else if (
      data.day < currentDay &&
      data.month > currentMonth &&
      data.year < currentYear
    ) {
      isExpired = true;
    }

    firestore()
      .collection("Licences")
      .doc(uid)
      .update({
        mac: data.mac,
        day: data.day,
        month: data.month,
        year: data.year,
        isValid: data.isValid,
        expired: isExpired,
        updated_by: userData.name,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        showToast("emerald.500", "Licença atualizada com sucesso!");
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
            <AntDesign name="idcard" size={30} color="black" /> Editar Licenças
          </Title>

          <Stack mt={3} space={4} w="full" maxW="500px">
            <Controller
              defaultValue={licencesData?.mac}
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

            <Center>
              <Text>Selecione a data de validade</Text>
              <ErrorText>{errors.day?.message}</ErrorText>
              <HStack space={3}>
                <Controller
                  defaultValue={licencesData?.day}
                  control={control}
                  name="day"
                  render={({ field: { onBlur, value, onChange } }) => (
                    <Input
                      w="20"
                      placeholder="Dia"
                      error={errors.day}
                      errorText={errors.day?.message}
                      onBlur={onBlur}
                      value={value}
                      onChangeText={onChange}
                      variant="underlined"
                      autoCapitalize="none"
                      maxLength={2}
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
                      message: "É necessário definir a data de vencimento!",
                    },
                  }}
                />

                <Controller
                  defaultValue={licencesData?.month}
                  control={control}
                  name="month"
                  render={({ field: { onBlur, value, onChange } }) => (
                    <Input
                      w="20"
                      placeholder="Mês"
                      error={errors.month}
                      errorText={errors.month?.message}
                      onBlur={onBlur}
                      value={value}
                      onChangeText={onChange}
                      variant="underlined"
                      maxLength={2}
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
                      message:
                        "É necessário definir a data de vencimento da licença!",
                    },
                  }}
                />

                <Controller
                  defaultValue={licencesData?.year}
                  control={control}
                  name="year"
                  render={({ field: { onBlur, value, onChange } }) => (
                    <Input
                      w="20"
                      placeholder="Ano"
                      error={errors.year}
                      errorText={errors.year?.message}
                      onBlur={onBlur}
                      value={value}
                      maxLength={4}
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
                      message:
                        "É necessário definir a data de vencimento da licença!",
                    },
                  }}
                />
              </HStack>
            </Center>

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
              defaultValue={licencesData?.isValid}
              control={control}
              name="isValid"
              render={({ field: { onBlur, value, onChange } }) => (
                <HStack alignItems="center" space={4}>
                  <Switch size="md" onValueChange={onChange} value={value} />
                  <Text>Validado pelo administrador?</Text>
                </HStack>
              )}
            />

            <Button onPress={handleSubmit(handleUpdateLicences)}>
              Concluir
            </Button>
          </Stack>
        </Form>
      </FormControl>
    </Box>
  );
}
