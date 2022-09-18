import React, { useState } from "react";

import { Button, Center, Modal } from "native-base";
import { Entypo } from "@expo/vector-icons";
import {
  LicenceFormProps,
  UpdateLicenceForm,
} from "@components/Forms/UpdateLicencesForm";

export function UpdateLicense({ uid }: LicenceFormProps) {
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
            <UpdateLicenceForm uid={uid} />
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Center>
  );
}
