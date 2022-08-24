import { HStack, Spinner, Heading } from "native-base";
import React from "react";

export function Load() {

  return (
    <HStack space={2} alignItems="center">
      <Spinner color="cyan.500" size="sm" accessibilityLabel="Loading posts" />
      <Heading color="cyan.500" fontSize="md">
        Carregando
      </Heading>
    </HStack>
  );
}
