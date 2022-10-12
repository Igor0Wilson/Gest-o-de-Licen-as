import React, { useRef } from "react";
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import { Button } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { ClientForm } from "@components/Forms/ClientForm";

export function NewClient() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  function handleSnapPress() {
    bottomSheetRef.current?.present();
  }

  return (
    <>
      <Button
        bg={"primary.800"}
        variant="solid"
        leftIcon={<AntDesign name="addusergroup" size={24} color="white" />}
        onPress={handleSnapPress}
      >
        Adicionar Cliente
      </Button>

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetRef}
          snapPoints={["100%"]}
          style={{ padding: 24 }}
          enablePanDownToClose={true}
        >
          <BottomSheetView>
            <ClientForm />
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  );
}
