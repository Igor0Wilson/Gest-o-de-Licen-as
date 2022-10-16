import React, { useContext } from "react";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";

import { EvilIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ContainerNavigation,
  HeaderContainer,
  LogOutContainer,
} from "./styles";
import { Avatar, HStack, Text } from "native-base";
import { AuthContext } from "../../../contexts/auth";
import { AntDesign } from "@expo/vector-icons";

export function Drawer({ ...props }) {
  // @ts-ignore
  const { signOut, userData } = useContext(AuthContext);

  function handleSignOut() {
    signOut();
  }

  const role = userData.role === "adm" ? "Administrador" : "Colaborador";

  return (
    <ContainerNavigation>
      <HeaderContainer>
        <Avatar bg="blueGray.400" mb={3} mt={5} alignSelf="center" size="lg">
          <AntDesign name="user" size={35} color="black" />
        </Avatar>
        <HStack>
          <FontAwesome name="user" size={16} color="black" />
          <Text mt={-1} mb={1} ml={2}>
            {userData?.name}
          </Text>
        </HStack>
        <HStack>
          <MaterialIcons name="email" mr={3} size={16} color="black" />
          <Text mt={-1} mb={1} ml={2}>
            {userData?.email}
          </Text>
        </HStack>
        <HStack>
          <EvilIcons name="user" mr={3} size={24} color="black" />
          <Text mt={-1} mb={1} ml={2}>
            {role}
          </Text>
        </HStack>
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
