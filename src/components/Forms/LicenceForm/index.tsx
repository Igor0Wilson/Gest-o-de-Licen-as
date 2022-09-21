import React, { useContext, useState } from "react";
import { ErrorText, Form, Title } from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

import {
  Box,
  Button,
  Center,
  HStack,
  Icon,
  Input,
  Stack,
  Text,
  Image,
} from "native-base";
import { useForm, Controller } from "react-hook-form";
import { Switch } from "react-native-gesture-handler";
import { AuthContext } from "../../../contexts/auth";
import { showToast } from "@components/ToastMessage";
import { View, Platform, Alert } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import { Ionicons } from "@expo/vector-icons";

type LicenceFormProps = {
  mac: string;
  day: Number;
  month: Number;
  year: Number;
  isValid: boolean;
};

export function LicenceForm() {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const { userData } = useContext(AuthContext);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<LicenceFormProps>();

  const onSelectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      console.log(image.path);
      const imageUri = Platform.OS === "ios" ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  async function handleNewLicence(data: LicenceFormProps) {
    const uploadUri = image;
    let filename = uploadUri?.substring(uploadUri?.lastIndexOf("/") + 1);

    setUploading(true);

    try {
      await storage().ref(filename).putFile(uploadUri);
      const url = await storage().ref(filename).getDownloadURL();
      await firestore()
        .collection("Licences")
        .add({
          mac: data.mac,
          day: data.day,
          month: data.month,
          year: data.year,
          isValid: data.isValid,
          expired: false,
          imagePath: url,
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

      setLoading(false);
      setUploading(false);
      setValue("mac", "");
      setValue("day", "");
      setValue("month", "");
      setValue("year", "");
      setValue("isValid", false);
    } catch (error) {
      console.log(error);
    }

    setImage("");
  }

  function sendLicenceData(data: LicenceFormProps) {
    setLoading(true);
    handleNewLicence(data);
  }

  return (
    <Box alignItems="center">
      <Form>
        <Title>
          <AntDesign name="idcard" size={30} color="black" /> Adicionar Licenças
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

          <Center>
            <Text>Selecione a data de validade</Text>
            <ErrorText>{errors.day?.message}</ErrorText>
            <HStack space={3}>
              <Controller
                defaultValue=""
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
          <Center>
            <HStack alignItems="center" space={4}>
              {image != "" ? (
                <Image
                  borderRadius={100}
                  alt="Alternate Text"
                  size="sm"
                  source={{ uri: image }}
                />
              ) : (
                <Image
                  borderRadius={100}
                  source={{
                    uri: "https://png.pngtree.com/png-vector/20190120/ourlarge/pngtree-gallery-vector-icon-png-image_470660.jpg",
                  }}
                  alt="Alternate Text"
                  size="sm"
                />
              )}
              <Button
                size="sm"
                onPress={onSelectImage}
                leftIcon={
                  <Icon as={Ionicons} name="cloud-upload-outline" size="sm" />
                }
              >
                Carregar imagem...
              </Button>
            </HStack>
          </Center>
          <Button
            isLoading={loading}
            onPress={handleSubmit(sendLicenceData)}
            spinnerPlacement="end"
            isLoadingText="Carregando"
          >
            Cadastrar
          </Button>
        </Stack>
      </Form>
    </Box>
  );
}
