import React from "react";
import { Header } from "@components/Layout/Header";

import { Background, Container } from "./styles";
import { NewUser } from "@components/Controllers/NewUser";
import { UserList } from "@components/Lists/Users";

export function Register() {
  return (
    <Background>
      <Header />
      <Container>
        <UserList />
        <NewUser />
      </Container>
    </Background>
  );
}
