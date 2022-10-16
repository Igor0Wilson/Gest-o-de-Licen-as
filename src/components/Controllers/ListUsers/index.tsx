import React from "react";
import { useTheme } from "styled-components/native";

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

import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { UpdateUser } from "../UpdateUserModal";
import { DeleteUser } from "../Popover/DeleteUser";

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
  const roleTitle = data.role === "adm" ? "Administrador" : "Colaborador";

  const isBlock =
    data.isActive === true ? (
      <Info>
        <Entypo name="block" size={16} color="red" />
        <Label>Bloqueado</Label>
      </Info>
    ) : (
      <Info>
        <AntDesign name="check" size={16} color="blue" />
        <Label>Liberado</Label>
      </Info>
    );

  const theme = useTheme();

  const uid = data.id;

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
          {isBlock}
          <GroupsContainer>
            <UpdateUser uid={uid} />
            <DeleteUser data={data} />
          </GroupsContainer>
        </Footer>
      </Content>
    </Container>
  );
}
