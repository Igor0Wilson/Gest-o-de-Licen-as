import React, { useEffect, useState, useContext } from "react";
import { FlatList } from "react-native";

import firestore from "@react-native-firebase/firestore";

import { ClientData, ClientProps } from "@components/Controllers/ListClient";
import { Container, Header, Title, Counter } from "./styles";
import { Load } from "@components/Controllers/Spinner";
import { Text } from "native-base";

export function ClientList() {
  const [isLoading, setIsLoading] = useState(false);
  const [client, setClient] = useState<ClientProps[]>([]);

  useEffect(() => {
    setIsLoading(true);

    const subscriber = firestore()
      .collection("Client")
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ClientProps[];

        setClient(data);
        setIsLoading(false);
      });

    return () => subscriber();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Clientes cadastrados</Title>
        <Counter>{client.length}</Counter>
      </Header>

      {isLoading || client.length === 0 ? (
        <Load />
      ) : (
        <FlatList
          data={client}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ClientData data={item} />}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        />
      )}
    </Container>
  );
}
