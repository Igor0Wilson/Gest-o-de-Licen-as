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

import { Button } from "native-base";
import { Entypo } from "@expo/vector-icons";
import { AuthContext } from "../../../contexts/auth";
import { showToast } from "@components/ToastMessage";
import { UpdateLicense } from "../UpdateLicenceModal";

export type LicencesProps = LicencesStyleProps & {
  id: string;
  mac: string;
  day: Number;
  month: Number;
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
        <Header>
          <Title>{data.mac}</Title>
        </Header>

        <Footer>
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
            <Label>{data.created_by}</Label>
          </Info>
          <GroupsContainer>
            <UpdateLicense uid={uid} />
            <Button
              ml={1}
              colorScheme="danger"
              size={8}
              onPress={handleDeleteLicences}
            >
              <Entypo name="trash" size={15} color="black" />
            </Button>
          </GroupsContainer>
        </Footer>
      </Content>
    </Container>
  );
}
