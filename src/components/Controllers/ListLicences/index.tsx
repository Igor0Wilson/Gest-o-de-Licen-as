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
  ClientDiv,
  LicencesStyleProps,
  GroupsContainer,
  UserDiv,
} from "./styles";

import { HStack, Image, VStack } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { UpdateLicense } from "../UpdateLicenceModal";
import { DeleteLicence } from "../Popover/DeleteLicences";

export type LicencesProps = LicencesStyleProps & {
  id: string;
  mac: string;
  day: Number;
  month: Number;
  client: string;
  imageName: string;
  imagePath: string;
  year: Number;
  isValid: boolean;
  created_by: string;
  updated_by: string;
};

type Props = {
  data: LicencesProps;
};

export function LicencesData({ data }: Props) {
  const theme = useTheme();

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
              mt={5}
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
                <Label>{data.updated_by}</Label>
              </Info>
            </VStack>
          </HStack>
          <GroupsContainer>
            <UpdateLicense data={data} />
            <DeleteLicence data={data} />
          </GroupsContainer>
        </Footer>
      </Content>
    </Container>
  );
}
