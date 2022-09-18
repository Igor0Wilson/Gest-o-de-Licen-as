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
  GroupsContainer,
} from "./styles";

import { Button } from "native-base";
import { Entypo } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { AuthContext } from "../../../contexts/auth";
import { showToast } from "@components/ToastMessage";
import { UpdateUser } from "../UpdateUserModal";

export type UsersProps = {
  id: string;
  name: string;
  email: string;
  telephone: string;
  isActive: boolean;
  role: string;
};

type Props = {
  data: UsersProps;
};

export function UserData({ data }: Props) {
  const { userData } = useContext(AuthContext);

  const roleTitle = data.role === "adm" ? "Administrador" : "Colaborador";

  const theme = useTheme();

  const uid = data.id;

  function handleDeleteUser() {
    if (userData.role === "adm") {
      firestore()
        .collection("Users")
        .doc(uid)
        .delete()
        .then(() => showToast("emerald.500", "Usuário deletado com sucesso!"))
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
          <Info>
            <EvilIcons name="user" size={24} color="black" />
            <Label>{roleTitle}</Label>
          </Info>
          <GroupsContainer>
            <UpdateUser uid={uid} />
            <Button
              ml={1}
              colorScheme="danger"
              size={8}
              onPress={handleDeleteUser}
            >
              <Entypo name="trash" size={15} color="black" />
            </Button>
          </GroupsContainer>
        </Footer>
      </Content>
    </Container>
  );
}
