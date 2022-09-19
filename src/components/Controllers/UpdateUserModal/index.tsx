import React, { useState } from "react";

import { Button, Center, Modal } from "native-base";
import { Entypo } from "@expo/vector-icons";
import { UpdateUserForm } from "@components/Forms/UpdateUserForm";

type Props = {
  uid: string;
};

export function UpdateUser({ uid }: Props) {
  const [showModal, setShowModal] = useState(false);

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
            <UpdateUserForm uid={uid} />
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Center>
  );
}
