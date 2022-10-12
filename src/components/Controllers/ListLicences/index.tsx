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
  LicencesStyleProps,
  GroupsContainer,
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

  let imagePath = data.imagePath
    ? data.imagePath
    : "https://firebasestorage.googleapis.com/v0/b/controle-de-licencas-e7993.appspot.com/o/pngtree-gallery-vector-icon-png-image_470660.jpg?alt=media&token=1fb2a8c8-a409-458e-9321-bab066921874";

  return (
    <Container>
      <Status expired />
      <Content>
        <Footer>
          <HStack>
            <Image
              borderRadius={100}
              source={{
                uri: imagePath,
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
