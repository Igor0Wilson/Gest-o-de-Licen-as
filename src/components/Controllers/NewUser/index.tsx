import React, { useRef } from 'react';
import { BottomSheetView, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import { Background } from './styles';
import { RegisterForm } from '@components/Forms/RegisterForm';
import { Button } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

export function NewUser() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  function handleSnapPress() {
    bottomSheetRef.current?.present();
  }

  return (
    <>
      <Button variant="solid" leftIcon={<MaterialIcons name="person-add" size={24} color="white" />} onPress={handleSnapPress}>Novo Usuário</Button>

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetRef}
          snapPoints={['50%']}
          style={{ padding: 24 }}
          enablePanDownToClose={true}
          backdropComponent={() => <Background />}
        >
          <BottomSheetView>
            <RegisterForm />
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  );
}