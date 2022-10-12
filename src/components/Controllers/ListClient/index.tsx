import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
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
  ClientStyleProps,
  GroupsContainer,
} from "./styles";

import { UpdateClient } from "../UpdateClientModal";
import { DeleteClient } from "../Popover/DeleteClient";

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
          <GroupsContainer>
            <UpdateClient uid={uid} />
            <DeleteClient data={data} />
          </GroupsContainer>
        </Footer>
      </Content>
    </Container>
  );
}
