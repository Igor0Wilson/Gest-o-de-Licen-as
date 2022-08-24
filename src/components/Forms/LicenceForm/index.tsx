import React, { useState } from "react";

import { Form, Title } from "./styles";
import { TextArea } from "@components/Controllers/TextArea";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Box, Button, FormControl, Icon, Input, Stack, WarningOutlineIcon } from "native-base";
import { useForm, Controller } from "react-hook-form";

export function LicenceForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  function handleNewOrder() {
    setIsLoading(true);
  }

  return (
    <Box alignItems="center">
      <FormControl isRequired w="full" maxW="500px">
        <Form>
          <Title>
            <AntDesign name="idcard" size={30} color="black" /> Adicionar Licença
          </Title>

          <Stack mt={3} space={4} w="full" maxW="500px">       
            <Controller
              control={control}
              name="mac"
              render={({ field: { onBlur, value, onChange } }) => (
                <Input
                  placeholder="Digite o Mac do cliente"
                  onBlur={onBlur}
                  value={value}
                  onChangeText={onChange}
                  variant="underlined"
                  autoCapitalize="none"
                  size="lg"
                  InputLeftElement={
                    <Icon
                      as={
                        <MaterialIcons
                          name="person"
                          size={5}
                          ml={2}
                          color="muted.400"
                        />
                      }
                    />
                  }
                />
              )}
              rules={{
                required: true,
              }}
            />

            <Controller
              control={control}
              name="expireIn"
              render={({ field: { onBlur, value, onChange } }) => (
                <Input
                  placeholder="Digite a data de vencimento"
                  onBlur={onBlur}
                  value={value}
                  onChangeText={onChange}
                  variant="underlined"
                  size="lg"
                  autoCapitalize="none"
                  InputLeftElement={
                    <Icon
                      as={
                        <MaterialIcons
                          name="person"
                          size={5}
                          ml={2}
                          color="muted.400"
                        />
                      }
                    />
                  }
                />
              )}
              rules={{
                required: true,
              }}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onBlur, value, onChange } }) => (
                <Input
                  placeholder="seu@email.com"
                  onBlur={onBlur}
                  value={value}
                  onChangeText={onChange}
                  size="lg"
                  variant="underlined"
                  autoCapitalize="none"
                  InputLeftElement={
                    <Icon
                      as={
                        <MaterialIcons
                          name="person"
                          size={5}
                          ml={2}
                          color="muted.400"
                        />
                      }
                    />
                  }
                />
              )}
              rules={{
                required: true,
              }}
            />

            <Button
              isLoading={isLoading}
              onPress={handleNewOrder}
              spinnerPlacement="end"
              isLoadingText=""
            >
              Cadastrar Licença
            </Button>
          </Stack> 
        </Form>
      </FormControl>
    </Box>
  );
}
