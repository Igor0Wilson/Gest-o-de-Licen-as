import React, { useState } from "react";

import { Form, Title } from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Fontisto } from '@expo/vector-icons';
import { Box, Button, FormControl, HStack, Icon, Input, Stack, Switch, Text, WarningOutlineIcon } from "native-base";
import { useForm, Controller } from "react-hook-form";


type UserFormProps = {
  name: string;
  email: string;
  phone: string;
  isValid: boolean;
}

export function ClientForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  function handleNewOrder(data: UserFormProps) {
    
    console.log(data)
    setIsLoading(true);
  }

  return (
    <Box alignItems="center">
      <FormControl isRequired w="full" maxW="500px">
        <Form>
          <Title>
            <AntDesign name="addusergroup" size={30} color="black" /> Adicionar Cliente
          </Title>

          <Stack mt={3} space={4} w="full" maxW="500px">       
            <Controller
              control={control}
              name="email"
              render={({ field: { onBlur, value, onChange } }) => (
                <Input
                  placeholder=" Digite o email do cliente"
                  error={errors.email}
                  errorText={error.email.message}
                  onBlur={onBlur}
                  value={value}
                  onChangeText={onChange}
                  variant="underlined"
                  autoCapitalize="none"
                  size="lg"
                  InputLeftElement={
                    <Icon
                      as={
                        <Fontisto
                          name="email"
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
                required: {
                  value: true,
                  message: "E-mail do cliente é um campo obrigatório"
                } 
                
              }}
            />

            <Controller
              control={control}
              name="name"
              render={({ field: { onBlur, value, onChange } }) => (
                <Input
                  placeholder=" Digite o nome do cliente"
                  error={errors.name}
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
              name="phone"
              render={({ field: { onBlur, value, onChange } }) => (
                <Input
                  placeholder=" Digite o telefone do cliente"
                  error={errors.phone}
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
                          name="phone"
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
              name="phone"
              render={({ field: { onBlur, value, onChange } }) => (
                <HStack alignItems="center" space={4}>
                  <Switch
                    name="isValid"
                    size="md" 
                    onToggle={onChange}
                  />
                  <Text>Validado pelo administrador?</Text>
                </HStack>
              )}
              rules={{
                required: true,
              }}
            />    

            <Button
              isLoading={isLoading}
              onPress={handleSubmit(handleNewOrder)}
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
