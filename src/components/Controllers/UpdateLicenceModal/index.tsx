import React, { useState } from "react";

import { Button, Center, Modal } from "native-base";
import { Entypo } from "@expo/vector-icons";
import {
  LicenceFormProps,
  UpdateLicenceForm,
} from "@components/Forms/UpdateLicencesForm";

type Props = {
  data: LicenceFormProps;
};

export function UpdateLicense({ data }: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <Center>
      <Button ml={-5} size={10} onPress={() => setShowModal(true)}>
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
            <UpdateLicenceForm data={data} />
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Center>
  );
}
