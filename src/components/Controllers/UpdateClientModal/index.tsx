import React, { useState } from "react";

import { Button, Center, FormControl, Modal } from "native-base";
import { UpdateClientForm } from "@components/Forms/UpdateClientForm";
import { Entypo } from "@expo/vector-icons";

export function UpdateClient({ uid }) {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <Center>
      <Button onPress={() => setShowModal(true)}>
        <Entypo name="edit" size={12} color="black" />
      </Button>
      <Modal
        size="xl"
        marginTop="10,8px"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Body>
            <UpdateClientForm uid={uid} />
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Center>
  );
}