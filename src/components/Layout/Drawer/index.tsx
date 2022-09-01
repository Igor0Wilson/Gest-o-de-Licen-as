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
  const { signOut, userData } = useContext(AuthContext);

  function handleSignOut() {
    signOut();
  }

  return (
    <ContainerNavigation>
      <HeaderContainer>
        <Avatar alignSelf="center" size="lg">
          {userData.name.substr(0, 1)}
        </Avatar>
        <Text>{userData.name}</Text>
        <Text>{userData.email}</Text>
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
