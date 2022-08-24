//Importação do Drawer navigation
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Clients } from "@screens/Clients";
import { Home } from "@screens/Home";
import { Register } from "@screens/Register";

const { Screen, Navigator } = createDrawerNavigator();

export default function AppRoutes() {
  return (
    <Navigator>
      <Screen options={{ headerTransparent: true, headerShown: false}} name="Home" component={Home} />
      <Screen options={{ headerTransparent: true, headerShown: false}} name="Register" component={Register} />
      <Screen options={{ headerTransparent: true, headerShown: false}} name="Clients" component={Clients} />
    </Navigator>
  );
}
