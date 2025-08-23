import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import BarcodeScannerScreen from "./screens/BarcodeScannerScreen";
import { DrawerParamList, BarcodeStackParamList } from "./types/navigation";

const Drawer = createDrawerNavigator<DrawerParamList>();
const Stack = createStackNavigator<BarcodeStackParamList>();

function BarcodeStack() {
  return (
    <Stack.Navigator initialRouteName="Scanner">
      <Stack.Screen name="Scanner" component={BarcodeScannerScreen} options={{ title: "QR Scanner" }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Barcode Scanner" component={BarcodeStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
