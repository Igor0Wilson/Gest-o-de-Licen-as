import React from "react";
import {
  Pressable,
  Text,
  Box,
  HStack,
  Spacer,
  Flex,
  Center,
  NativeBaseProvider,
  Badge,
} from "native-base";

export function Message() {
  return (
    <Center>
      <Pressable mt={10}>
        {() => {
          return (
            <Box maxW="96" p="5" rounded="8">
              <HStack alignItems="center">
                <Badge
                  colorScheme="red"
                  _text={{
                    color: "white",
                  }}
                  variant="solid"
                  rounded="4"
                >
                  Sem Permissão!
                </Badge>
                <Spacer />
              </HStack>
              <Text
                color="coolGray.800"
                mt="3"
                fontWeight="medium"
                fontSize="xl"
              >
                Usuário sem permissão
              </Text>
              <Text mt="2" fontSize="sm" color="coolGray.700">
                Usuários colaboradores não tem acesso aos demais usuários do
                sistema!
              </Text>
            </Box>
          );
        }}
      </Pressable>
    </Center>
  );
}
