import { Box, Popover, Button } from "native-base";
import React, { useState } from "react";
import { AntDesign } from '@expo/vector-icons';

export function LogoutButton() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    function handleSignOut() { console.log("SAIU") }

    return <Box alignItems="center">
        <Popover trigger={triggerProps => {
        return  <Button leftIcon={<AntDesign name="logout" size={18} color="red" />} variant="subtle" colorScheme="danger" alignSelf="center" {...triggerProps} onPress={() => setIsOpen(true)}/>
                }} isOpen={isOpen} onClose={() => setIsOpen(!isOpen)}>
          <Popover.Content accessibilityLabel="Delete Customerd" w="56">
            <Popover.Arrow />
            <Popover.CloseButton />
            <Popover.Header>Sair</Popover.Header>
            <Popover.Body>
              Deseja realmente sair do sistema?
            </Popover.Body>
            <Popover.Footer justifyContent="flex-end">
              <Button.Group space={2}>
                <Button colorScheme="warning" leftIcon={<AntDesign name="closecircleo" size={18} color="white" />}  onPress={() => setIsOpen(false)}/>
                <Button onPress={handleSignOut} leftIcon={<AntDesign name="logout" size={18} color="white" />} size={10}  colorScheme="danger"/>
              </Button.Group>
            </Popover.Footer>
          </Popover.Content>
        </Popover>
      </Box>;
}