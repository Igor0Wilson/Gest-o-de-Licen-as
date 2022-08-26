import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Icon, HStack, Container } from "native-base";

export function Drawer({ ...props }) {
  function handleSignOut() {
    console.log("SAIU");
  }

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Sair"
        icon={() => (
          <MaterialCommunityIcons name="logout" size={24} color="black" />
        )}
        onPress={handleSignOut}
      />
    </DrawerContentScrollView>
  );
}
