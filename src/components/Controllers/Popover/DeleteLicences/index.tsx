import React, { useContext, useState } from "react";
import { Popover, Button, VStack, Box } from "native-base";
import { Entypo } from "@expo/vector-icons";

import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { AuthContext } from "../../../../contexts/auth";
import { showToast } from "@components/ToastMessage";
import { LicencesProps } from "@components/Controllers/ListLicences";

type Props = {
  data: LicencesProps;
};

export function DeleteLicence({ data }: Props) {
  const [position, setPosition] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const { userData } = useContext(AuthContext);

  async function handleDeleteLicences(data: LicencesProps) {
    if (userData.role === "colab") {
      showToast(
        "danger.400",
        "Você não tem permissão para executar esta ação!"
      );
    } else {
      await storage().ref(data.imageName).delete();
      firestore()
        .collection("Licences")
        .doc(data.id)
        .delete()
        .then(() => showToast("emerald.500", "Licença deletada com sucesso!"))
        .catch((error) => console.log(error));
    }
  }

  return (
    <Box w="100%" alignItems="center">
      <VStack space={6} w="100%">
        <Popover // @ts-ignore
          placement={position === "auto" ? undefined : position}
          trigger={(triggerProps) => {
            return (
              <Button
                ml={1}
                colorScheme="danger"
                size={10}
                {...triggerProps}
                onPress={() => {
                  setIsOpen(true);
                }}
              >
                <Entypo name="trash" size={20} color="black" />
              </Button>
            );
          }}
          isOpen={isOpen}
          onClose={() => setIsOpen(!isOpen)}
        >
          <Popover.Content w="56">
            <Popover.Arrow />
            <Popover.CloseButton onPress={() => setIsOpen(false)} />
            <Popover.Header>Deletar Licença</Popover.Header>
            <Popover.Body>
              Tem certeza que deseja deletar esta licença?
            </Popover.Body>
            <Popover.Footer justifyContent="flex-end">
              <Button.Group space={2}>
                <Button
                  colorScheme="coolGray"
                  variant="ghost"
                  onPress={() => setIsOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  colorScheme="danger"
                  onPress={() => handleDeleteLicences(data)}
                >
                  Deletar
                </Button>
              </Button.Group>
            </Popover.Footer>
          </Popover.Content>
        </Popover>
      </VStack>
    </Box>
  );
}
