import React, { useState } from "react";
import {
  Popover,
  Button,
  VStack,
  Box,
  Center,
  NativeBaseProvider,
} from "native-base";
import { Entypo } from "@expo/vector-icons";
import { deleteOptions } from "./deleteOptions";

export function PopoverDelete(uid: string) {
  const [position, setPosition] = useState("auto");
  const [isOpen, setIsOpen] = useState(false);

  function onPressFunctions(open: boolean, uid: string) {
    deleteOptions(uid);
    setIsOpen(open);
  }

  return (
    <Box w="100%" alignItems="center">
      <VStack space={6} alignSelf="flex-start" w="100%">
        <Popover // @ts-ignore
          placement={position === "auto" ? undefined : position}
          trigger={(triggerProps) => {
            return (
              <Button
                ml={1}
                colorScheme="danger"
                size={8}
                {...triggerProps}
                onPress={() => {
                  setIsOpen(true);
                }}
              >
                <Entypo name="trash" size={15} color="black" />
              </Button>
            );
          }}
          isOpen={isOpen}
          onClose={() => setIsOpen(!isOpen)}
        >
          <Popover.Content w="56">
            <Popover.Arrow />
            <Popover.CloseButton onPress={() => setIsOpen(false)} />
            <Popover.Header>Delete Customer</Popover.Header>
            <Popover.Body>
              This will remove all data relating to Alex. This action cannot be
              reversed. Deleted data can not be recovered.
            </Popover.Body>
            <Popover.Footer justifyContent="flex-end">
              <Button.Group space={2}>
                <Button
                  colorScheme="coolGray"
                  variant="ghost"
                  onPress={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  colorScheme="danger"
                  //   onPress={onPressFunctions(true, uid)}
                >
                  Delete
                </Button>
              </Button.Group>
            </Popover.Footer>
          </Popover.Content>
        </Popover>
      </VStack>
    </Box>
  );
}
