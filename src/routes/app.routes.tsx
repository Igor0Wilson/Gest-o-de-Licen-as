//Importação do Drawer navigation
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Clients } from "@screens/Clients";
import { Home } from "@screens/Home";
import { Register } from "@screens/Register";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Drawer } from "@components/Layout/Drawer";

const { Screen, Navigator } = createDrawerNavigator();

export default function AppRoutes() {
  return (
    // @ts-ignore
    <Navigator drawerContent={(props) => <Drawer {...props} />}>
      <Screen
        options={{
          headerTransparent: true,
          headerShown: false,
          drawerIcon: () => (
            // @ts-ignore
            <FontAwesome5 name="home" size={20} color="black" />
          ),
        }}
        name="Home"
        component={Home}
      />

      <Screen
        options={{
          headerTransparent: true,
          headerShown: false,
          drawerIcon: () => (
            // @ts-ignore
            <MaterialIcons name="person-add" size={20} color="black" />
          ),
        }}
        name="Usuários"
        component={Register}
      />
      <Screen
        options={{
          headerTransparent: true,
          headerShown: false,
          drawerIcon: () => (
            // @ts-ignore
            <AntDesign name="addusergroup" size={20} color="black" />
          ),
        }}
        name="Clients"
        component={Clients}
      />
    </Navigator>
  );
}
