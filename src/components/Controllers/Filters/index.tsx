import React from "react";
import { useTheme } from "styled-components/native";

import { Filter } from "@components/Controllers/Filter";
import { Container, Title, Options } from "./styles";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  onFilter: (status: string) => void;
};

export function Filters({ onFilter }: Props) {
  const theme = useTheme();

  return (
    <Container>
      <Title>
        <AntDesign name="questioncircleo" size={18} color="black" /> - Filtre
        pela validade da licença
      </Title>

      <Options>
        <Filter
          title="Válidas"
          backgroundColor={theme.COLORS.PRIMARY}
          onPress={() => onFilter("open")}
        />

        <Filter
          title="Expiradas"
          backgroundColor={theme.COLORS.SECONDARY}
          onPress={() => onFilter("closed")}
        />
      </Options>
    </Container>
  );
}
