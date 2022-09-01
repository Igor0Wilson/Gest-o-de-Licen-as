import React from "react";
import { Header } from "@components/Layout/Header";

import { Background, Container } from "./styles";
import { NewUser } from "@components/Controllers/NewUser";
import { Users } from "@components/Lists/Users";

export function Register() {
  return (
    <Background>
      <Header />
      <Container>
        <Users />
        <NewUser />
      </Container>
    </Background>
  );
}
