import React, { useContext } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

import firestore from "@react-native-firebase/firestore";

import {
  Container,
  Status,
  Content,
  Header,
  Title,
  Label,
  Info,
  Footer,
  LicencesStyleProps,
  GroupsContainer,
} from "./styles";

import { Button, HStack, Image, VStack } from "native-base";
import { Entypo } from "@expo/vector-icons";
import { AuthContext } from "../../../contexts/auth";
import { Ionicons } from "@expo/vector-icons";
import { showToast } from "@components/ToastMessage";
import { UpdateLicense } from "../UpdateLicenceModal";

export type LicencesProps = LicencesStyleProps & {
  id: string;
  mac: string;
  day: Number;
  month: Number;
  client: string;
  imagePath: string;
  year: Number;
  isValid: boolean;
  created_by: string;
};

type Props = {
  data: LicencesProps;
};

export function LicencesData({ data }: Props) {
  const { userData } = useContext(AuthContext);

  const theme = useTheme();

  const uid = data.id;

  function handleDeleteLicences() {
    if (userData.role === "adm") {
      firestore()
        .collection("Licences")
        .doc(uid)
        .delete()
        .then(() => showToast("emerald.500", "Licença deletada com sucesso!"))
        .catch((error) => console.log(error));
    } else {
      showToast(
        "danger.400",
        "Você não tem permissão para executar esta ação!"
      );
    }
  }

  return (
    <Container>
      <Status expired />
      <Content>
        <Footer>
          <HStack>
            <Image
              borderRadius={100}
              source={{
                uri: data.imagePath,
              }}
              alt="Alternate Text"
              size="md"
              mt={8}
            />
            <VStack ml={5}>
              <Header>
                <Title>{data.mac}</Title>
              </Header>
              <Info>
                <MaterialIcons
                  name="date-range"
                  size={16}
                  color={theme.COLORS.SUBTEXT}
                />
                <Label>{`${data.day}/${data.month}/${data.year}`}</Label>
              </Info>

              <Info>
                <MaterialIcons
                  name="person"
                  size={16}
                  color={theme.COLORS.SUBTEXT}
                />
                <Label>{data.client}</Label>
              </Info>

              <Info>
                <Ionicons
                  name="create"
                  size={16}
                  color={theme.COLORS.SUBTEXT}
                />
                <Label>{data.updatedBy}</Label>
              </Info>
            </VStack>
          </HStack>
          <GroupsContainer>
            <UpdateLicense uid={uid} />
            <Button
              ml={2}
              colorScheme="danger"
              size={10}
              onPress={handleDeleteLicences}
            >
              <Entypo name="trash" size={20} color="black" />
            </Button>
          </GroupsContainer>
        </Footer>
      </Content>
    </Container>
  );
}
