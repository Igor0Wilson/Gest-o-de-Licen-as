import React, { useContext, useEffect, useState } from "react";
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
  Select,
  CheckIcon,
} from "native-base";
import { useForm, Controller } from "react-hook-form";
import { Switch } from "react-native-gesture-handler";
import { AuthContext } from "../../../contexts/auth";
import { showToast } from "@components/ToastMessage";
import { Platform } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import { Ionicons } from "@expo/vector-icons";
import { ClientProps } from "@components/Controllers/ListClient";

type LicenceFormProps = {
  mac: string;
  day: Number;
  month: Number;
  year: Number;
  client: string;
  isValid: boolean;
};

export function LicenceForm() {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const { userData } = useContext(AuthContext);
  const [client, setClient] = useState<ClientProps[]>([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection("Client")
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ClientProps[];

        setClient(data);
      });

    return () => subscriber();
  }, []);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<LicenceFormProps>();

  const clientOptions = client.map((client) => (
    <Select.Item
      key={`client_${client.id}`}
      label={client.name}
      value={client.name}
    />
  ));

  const onSelectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      const imageUri = Platform.OS === "ios" ? image.sourceURL : image.path;
      // @ts-ignore
      setImage(imageUri);
    });
  };

  async function handleNewLicence(data: LicenceFormProps) {
    const uploadUri = image;
    let filename = uploadUri?.substring(uploadUri?.lastIndexOf("/") + 1);

    setUploading(true);

    try {
      if (userData?.role !== "adm" && data.isValid === true) {
        showToast(
          "danger.400",
          "Voc?? n??o tem permiss??o para validar uma licen??a!"
        );
      } else {
        if (image !== "") {
          await storage().ref(filename).putFile(uploadUri);
          const url = await storage().ref(filename).getDownloadURL();
          await firestore()
            .collection("Licences")
            .add({
              mac: data.mac,
              day: data.day,
              month: data.month,
              year: data.year,
              client: data.client,
              isValid: data.isValid,
              expired: false,
              imageName: filename,
              imagePath: url,
              created_by: userData.name,
              updated_by: userData.name,
              created_at: firestore.FieldValue.serverTimestamp(),
              updated_at: firestore.FieldValue.serverTimestamp(),
            })
            .then(() => {
              showToast("emerald.500", "Licen??a cadastrada com sucesso!");
            })
            .catch((error) => {
              throw error;
            });

          setLoading(false);
          setUploading(false);
          setValue("mac", "");
          setValue("day", "");
          setValue("month", "");
          setValue("year", "");
          setValue("client", "");
          setValue("isValid", false);
        } else {
          await firestore()
            .collection("Licences")
            .add({
              mac: data.mac,
              day: data.day,
              month: data.month,
              year: data.year,
              client: data.client,
              isValid: data.isValid,
              expired: false,
              created_by: userData.name,
              updated_by: userData.name,
              created_at: firestore.FieldValue.serverTimestamp(),
              updated_at: firestore.FieldValue.serverTimestamp(),
            })
            .then(() => {
              showToast("emerald.500", "Licen??a cadastrada com sucesso!");
            })
            .catch((error) => {
              throw error;
            });

          setLoading(false);
          setUploading(false);
          setValue("mac", "");
          setValue("day", "");
          setValue("month", "");
          setValue("year", "");
          setValue("client", "");
          setValue("isValid", false);
        }
      }
    } catch (error) {
      throw error;
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
          <AntDesign name="idcard" size={30} color="black" /> Adicionar Licen??as
        </Title>

        <Stack mt={-3} space={4} w="full" maxW="500px">
          <Controller
            defaultValue=""
            control={control}
            name="mac"
            render={({ field: { onBlur, value, onChange } }) => (
              <Input
                placeholder=" Digite o mac do cliente"
                // @ts-ignore
                error={errors.mac}
                errorText={errors.mac?.message}
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
                variant="underlined"
                maxLength={17}
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
                message: "Mac do cliente ?? um campo obrigat??rio",
              },
            }}
          />
          <ErrorText>{errors.mac?.message}</ErrorText>

          <Center>
            <Text>Selecione a data de validade</Text>

            <HStack space={3} mb={1}>
              <Controller
                control={control}
                name="day"
                render={({ field: { onBlur, value, onChange } }) => (
                  <Input
                    w="20"
                    placeholder="Dia"
                    error={errors.day}
                    errorText={errors.day?.message}
                    onBlur={onBlur}
                    // @ts-ignore
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
                    message: "?? necess??rio definir a data de vencimento!",
                  },
                }}
              />

              <Controller
                control={control}
                name="month"
                render={({ field: { onBlur, value, onChange } }) => (
                  <Input
                    w="20"
                    placeholder="M??s"
                    error={errors.month}
                    errorText={errors.month?.message}
                    onBlur={onBlur}
                    // @ts-ignore
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
                      "?? necess??rio definir a data de vencimento da licen??a!",
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
                    // @ts-ignore
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
                      "?? necess??rio definir a data de vencimento da licen??a!",
                  },
                }}
              />
            </HStack>
            <ErrorText>{errors.day?.message}</ErrorText>
          </Center>

          <Controller
            control={control}
            name="client"
            render={({ field: { onBlur, value, onChange } }) => (
              <Select
                shadow={20}
                selectedValue={value}
                // @ts-ignore
                error={errors.client}
                errorText={errors.client?.message}
                onBlur={onBlur}
                minWidth="200"
                size="lg"
                variant="underlined"
                placeholder="Selecione o cliente"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="1" />,
                }}
                onValueChange={onChange}
              >
                {clientOptions}
              </Select>
            )}
            rules={{
              required: {
                value: true,
                message:
                  "?? necess??rio definir o cliente proprietario da licen??a!",
              },
            }}
          />
          <ErrorText>{errors.client?.message}</ErrorText>

          <HStack space={3}>
            <Controller
              defaultValue={false}
              control={control}
              name="isValid"
              render={({ field: { value, onChange } }) => (
                <HStack alignItems="center" space={4}>
                  <Switch size="md" onValueChange={onChange} value={value} />
                  <Text>Validado pelo administrador?</Text>
                </HStack>
              )}
            />
          </HStack>

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
                    uri: "https://firebasestorage.googleapis.com/v0/b/controle-de-licencas-e7993.appspot.com/o/pngtree-gallery-vector-icon-png-image_470660.jpg?alt=media&token=1fb2a8c8-a409-458e-9321-bab066921874",
                  }}
                  alt="Alternate Text"
                  size="sm"
                />
              )}
              <Button
                bg={"warning.800"}
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
            spinnerPlacement="end"
            isLoadingText="Carregando"
            bg={"primary.800"}
            onPress={handleSubmit(sendLicenceData)}
          >
            Cadastrar
          </Button>
        </Stack>
      </Form>
    </Box>
  );
}
