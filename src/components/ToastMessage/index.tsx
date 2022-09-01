import { Box, Toast } from "native-base";
import React from "react";

export function showToast(theme: string, message: string) {
  Toast.show({
    render: () => {
      return (
        <Box bg={theme} px="2" py="1" rounded="sm" mb={5}>
          {message}
        </Box>
      );
    },
  });
}
