import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ContainerNavigation, HeaderContainer, LogOutContainer } from "./styles";
import { Avatar, Divider, Text } from "native-base";

export function Drawer({ ...props }) {
  function handleSignOut() {
    console.log("SAIU");
  }

  return (
    <ContainerNavigation>
      <HeaderContainer>
        <Avatar alignSelf="center" size="lg" >IW</Avatar>
        <Text>Igor Wilson</Text>
        <Text>igorwilsonsimiao@gmail.com</Text>
      </HeaderContainer>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <LogOutContainer>
          <Divider />
          <DrawerItem
            label="Sair"
            icon={() => (
              <MaterialCommunityIcons name="logout" size={24} color="black" />
            )}
            onPress={handleSignOut}
          />
        </LogOutContainer>
      </DrawerContentScrollView>
    </ContainerNavigation>
  );
}
