import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";

import firestore from "@react-native-firebase/firestore";

import { Filters } from "@components/Controllers/Filters";
import {
  LicencesData,
  LicencesProps,
} from "@components/Controllers/ListLicences";
import { Container, Header, Title, Counter } from "./styles";
import { Load } from "@components/Controllers/Spinner";

export function Licences() {
  const [expired, setExpired] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [licences, setLicences] = useState<LicencesProps[]>([]);

  const date = new Date();
  const currentDay = date.getDate() - 1;
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();

  function updatedExpired(id: string) {
    firestore().collection("Licences").doc(id).update({
      expired: true,
      updatedAt: firestore.FieldValue.serverTimestamp(),
    });
  }

  useEffect(() => {
    setIsLoading(true);

    const subscriber = firestore()
      .collection("Licences")
      .where("expired", "==", expired)
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as LicencesProps[];

        setLicences(data);
        setIsLoading(false);
      });

    return () => subscriber();
  }, [expired]);

  useEffect(() => {
    function expiredLicence() {
      licences.forEach((data) => {
        if (
          data.day < currentDay &&
          data.month == currentMonth &&
          data.year == currentYear
        ) {
          updatedExpired(data.id);
        } else if (
          data.day >= currentDay &&
          data.month < currentMonth &&
          data.year == currentYear
        ) {
          updatedExpired(data.id);
        } else if (data.year < currentYear) {
          updatedExpired(data.id);
        }
      });
    }

    if (licences) {
      expiredLicence();
    }
  }, []);

  return (
    <Container>
      <Filters onFilter={setExpired} />

      <Header>
        <Title>Licenças {expired === false ? "Válidas" : "Expiradas"}</Title>
        <Counter>{licences.length}</Counter>
      </Header>

      {isLoading ? (
        <Load />
      ) : (
        <FlatList
          data={licences}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <LicencesData data={item} />}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        />
      )}
    </Container>
  );
}
