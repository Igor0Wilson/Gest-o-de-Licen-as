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
import { AntDesign } from "@expo/vector-icons";

export function Drawer({ ...props }) {
  // @ts-ignore
  const { signOut, userData } = useContext(AuthContext);

  function handleSignOut() {
    signOut();
  }

  return (
    <ContainerNavigation>
      <HeaderContainer>
        <Avatar bg="cyan.500" alignSelf="center" size="lg">
          <AntDesign name="user" size={35} color="black" />
        </Avatar>
        <Text>{userData?.name}</Text>
        <Text>{userData?.email}</Text>
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
