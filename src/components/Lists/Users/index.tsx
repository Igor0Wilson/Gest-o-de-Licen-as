import React, { useEffect, useState, useContext } from "react";
import { FlatList } from "react-native";

import firestore from "@react-native-firebase/firestore";

import { Container, Header, Title, Counter } from "./styles";
import { Load } from "@components/Controllers/Spinner";
import { UserData, UsersProps } from "@components/Controllers/ListUsers";
import { UseProps } from "react-native-svg";
import { AuthContext } from "../../../contexts/auth";
import { Text } from "native-base";

export function UserList() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UsersProps[]>([]);

  const { userData } = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);

    const subscriber = firestore()
      .collection("Users")
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as UseProps[];

        setUser(data);
        setIsLoading(false);
      });

    return () => subscriber();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Usuários cadastrados</Title>
        <Counter>{user.length}</Counter>
      </Header>

      {isLoading || user.length === 0 ? (
        <Load />
      ) : (
        <FlatList
          data={user}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <UserData data={item} />}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        />
      )}
    </Container>
  );
}
