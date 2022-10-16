import React, { useContext, useRef } from "react";
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import { AuthContext } from "../../../contexts/auth";

import { Register } from "@components/Forms/RegisterForm";
import { Button } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

export function NewUser() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const { userData } = useContext(AuthContext);

  const disabled =
    userData?.role === "adm" ? (
      <Button
        bg={"primary.800"}
        variant="solid"
        leftIcon={<MaterialIcons name="person-add" size={24} color="white" />}
        onPress={handleSnapPress}
      >
        Novo Usuário
      </Button>
    ) : (
      <Button
        bg={"light.600"}
        variant="solid"
        disabled
        leftIcon={<MaterialIcons name="person-add" size={24} color="white" />}
        onPress={handleSnapPress}
      >
        Novo Usuário (Não permitido)
      </Button>
    );

  function handleSnapPress() {
    bottomSheetRef.current?.present();
  }

  return (
    <>
      {disabled}
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetRef}
          snapPoints={["100%"]}
          style={{ padding: 24 }}
          enablePanDownToClose={true}
        >
          <BottomSheetView>
            <Register />
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  );
}
