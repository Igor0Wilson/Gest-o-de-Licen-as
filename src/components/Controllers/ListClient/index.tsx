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
  ClientStyleProps,
  GroupsContainer,
} from "./styles";

import { Button } from "native-base";
import { Entypo } from "@expo/vector-icons";
import { UpdateClient } from "../UpdateClientModal";
import { AuthContext } from "../../../contexts/auth";
import { showToast } from "@components/ToastMessage";

export type ClientProps = ClientStyleProps & {
  id: string;
  name: string;
  email: string;
  telephone: string;
  isValid: boolean;
};

type Props = {
  data: ClientProps;
};

export function ClientData({ data }: Props) {
  const { userData } = useContext(AuthContext);

  console.log(userData);

  console.log("Role:", userData.role);

  const theme = useTheme();

  const uid = data.id;

  function handleDeleteClient() {
    if (userData.role !== "adm") {
      firestore()
        .collection("Client")
        .doc(uid)
        .delete()
        .then(() => showToast("emerald.500", "Cliente deletado com sucesso!"))
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
      <Status isValid />
      <Content>
        <Header>
          <Title>{data.name}</Title>
        </Header>

        <Footer>
          <Info>
            <MaterialIcons
              name="email"
              size={16}
              color={theme.COLORS.SUBTEXT}
            />
            <Label>{data.email}</Label>
          </Info>

          <Info>
            <MaterialIcons
              name="phone"
              size={16}
              color={theme.COLORS.SUBTEXT}
            />
            <Label>{data.telephone}</Label>
          </Info>
          <GroupsContainer>
            <UpdateClient uid={uid} />
            <Button
              ml={1}
              colorScheme="danger"
              size={8}
              onPress={handleDeleteClient}
            >
              <Entypo name="trash" size={15} color="black" />
            </Button>
          </GroupsContainer>
        </Footer>
      </Content>
    </Container>
  );
}
