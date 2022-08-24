import { Box, Popover, Button } from "native-base";
import React, { useState } from "react";

export function LogoutButton() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    function handleSignOut() { console.log("SAIU") }

    return <Box alignItems="center">
        <Popover trigger={triggerProps => {
        return  <Button variant="outline" colorScheme="danger" alignSelf="center" {...triggerProps} onPress={() => setIsOpen(true)}>
                    Sair
                </Button>;
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
                <Button colorScheme="coolGray" variant="ghost" onPress={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button onPress={handleSignOut} colorScheme="danger">Sair</Button>
              </Button.Group>
            </Popover.Footer>
          </Popover.Content>
        </Popover>
      </Box>;
}