import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import React, { useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ContainerNavigation,
  HeaderContainer,
  LogOutContainer,
} from "./styles";
import { Avatar, Text } from "native-base";
import { AuthContext } from "../../../contexts/auth";

export function Drawer({ ...props }) {
  const { signOut } = useContext(AuthContext);

  function handleSignOut() {
    signOut();
  }

  return (
    <ContainerNavigation>
      <HeaderContainer>
        <Avatar alignSelf="center" size="lg">
          IW
        </Avatar>
        <Text>Igor Wilson</Text>
        <Text>igorwilsonsimiao@gmail.com</Text>
      </HeaderContainer>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <LogOutContainer>
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
