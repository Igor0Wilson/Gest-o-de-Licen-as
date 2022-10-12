import React, { useState } from "react";

import { Button, Center, Modal } from "native-base";
import { UpdateClientForm } from "@components/Forms/UpdateClientForm";
import { Entypo } from "@expo/vector-icons";

type Props = {
  uid: string;
};

export function UpdateClient({ uid }: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <Center>
      <Button size={10} ml={-6} onPress={() => setShowModal(true)}>
        <Entypo name="edit" size={20} color="black" />
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
