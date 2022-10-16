import React, { useState } from "react";

import { Button, Center, Modal } from "native-base";
import { Entypo } from "@expo/vector-icons";
import { UpdateLicenceForm } from "@components/Forms/UpdateLicencesForm";

type Props = {
  uid: string;
};

export function UpdateLicense({ uid }: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <Center>
      <Button ml={-5} size={9} onPress={() => setShowModal(true)}>
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
            <UpdateLicenceForm uid={uid} />
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Center>
  );
}
