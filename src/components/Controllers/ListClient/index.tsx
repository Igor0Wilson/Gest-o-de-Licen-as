import React from "react";
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

import { Box, Button, Toast } from "native-base";
import { Entypo } from "@expo/vector-icons";
import { UpdateClient } from "../UpdateClientModal";
import { Feather } from "@expo/vector-icons";

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

function showToast(message: string) {
  Toast.show({
    render: () => {
      return (
        <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
          {message}
        </Box>
      );
    },
  });
}

export function ClientData({ data }: Props) {
  const theme = useTheme();

  const uid = data.id;

  function handleDeleteClient() {
    firestore()
      .collection("Client")
      .doc(uid)
      .delete()
      .then(() => showToast("Cliente deletado com sucesso!"))
      .catch((error) => console.log(error));
  }

  return (
    <Container>
      <Status isValid />
      <Content>
        <Header>
          <Feather name="users" size={20} color="black" />
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
