import React, { useRef } from 'react';
import { BottomSheetView, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import { useForm, Controller } from "react-hook-form";
import { Button } from 'native-base';
import { ClientForm } from '@components/Forms/ClientForm';
import { AntDesign } from '@expo/vector-icons';

export function NewClient() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  function handleSnapPress() {
    bottomSheetRef.current?.present();
  }

  return (
    <>

      <Button variant="solid" leftIcon={<AntDesign name="addusergroup" size={24} color="white" />} onPress={handleSnapPress}>Adicionar Cliente</Button>
      
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetRef}
          snapPoints={['100%']}
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