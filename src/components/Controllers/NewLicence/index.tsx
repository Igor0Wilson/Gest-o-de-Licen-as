import React, { useRef } from "react";
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { LicenceForm } from "@components/Forms/LicenceForm";
import { Button } from "native-base";
import { AntDesign } from "@expo/vector-icons";

export function NewLicence() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  function handleSnapPress() {
    bottomSheetRef.current?.present();
  }

  return (
    <>
      <Button
        variant="solid"
        leftIcon={<AntDesign name="addfile" size={24} color="white" />}
        onPress={handleSnapPress}
        bg={"primary.800"}
      >
        Adicionar Licença
      </Button>

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetRef}
          snapPoints={["100%"]}
          style={{ padding: 24 }}
          enablePanDownToClose={true}
        >
          <BottomSheetView>
            <LicenceForm />
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  );
}
