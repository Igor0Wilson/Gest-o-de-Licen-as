import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

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
  ClientStyleProps
} from './styles';
import { Button } from 'native-base';
import { Entypo } from '@expo/vector-icons';
import { Alert } from 'react-native';
import { UpdateClient } from '../UpdateClient';


export type ClientProps = ClientStyleProps & {
  id: string;
  name: string;
  email: string;
  telephone: string;
  isValid: boolean;
}

type Props = {
  data: ClientProps;
};

export function ClientData({ data }: Props) {
  const theme = useTheme();

  const uid = data.id;

  function handleDeleteClient() {
    firestore()
    .collection("Client")
    .doc(uid)
    .delete()
    .then(() => Alert.alert("Cliente deletado!", "Os dados do cliente foram deletado com sucesso!"))
    .catch((error) => console.log(error));
  }


  return (
    <Container>
      <Status status={data.isValid} />
      <Content>
        <Header>
          <Title>{data.name}</Title>
          <MaterialIcons
            name={data.isValid === true ? "error" : "check"  }
            size={24}
            ml={5}
            color={data.isValid === true ? theme.COLORS.SECONDARY : theme.COLORS.PRIMARY}
          />
        </Header>

        <Footer>
          <Info>
            <MaterialIcons name="email" size={16} color={theme.COLORS.SUBTEXT} />
            <Label>
              {data.email}
            </Label>
          </Info>

          <Info>
            <MaterialIcons name="phone" size={16} color={theme.COLORS.SUBTEXT} />
            <Label>
            {data.telephone}
            </Label>
            <UpdateClient uid={uid} />
            <Button onPress={handleDeleteClient} ml={1} size={8}><Entypo name="trash" size={15} color="black" /></Button>
          </Info>
        </Footer>
      </Content>
    </Container>
  );
}