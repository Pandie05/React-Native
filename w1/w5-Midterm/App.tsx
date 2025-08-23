// App.tsx
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import type { RootTabParamList, ScannerStackParamList } from "./types/navigation";
import { FavoritesProvider } from "./context/FavoritesContext";

import BarcodeScannerScreen from "./screens/Scanner/BarcodeScannerScreen";
import ProductDetailScreen from "./screens/Scanner/ProductDetailScreen";
import FavoritesScreen from "./screens/FavoritesScreen";

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createStackNavigator<ScannerStackParamList>();

function ScannerStack() {
  return (
    <Stack.Navigator initialRouteName="Scanner">
      <Stack.Screen
        name="Scanner"
        component={BarcodeScannerScreen}
        options={{ headerTitle: "QR Scanner" }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ headerTitle: "Product Detail" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              const map: Record<string, keyof typeof Ionicons.glyphMap> = {
                ScannerTab: "scan-outline",
                FavoritesTab: "heart-outline",
              };
              return <Ionicons name={map[route.name]} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="ScannerTab" component={ScannerStack} options={{ title: "Scanner" }} />
          <Tab.Screen name="FavoritesTab" component={FavoritesScreen} options={{ title: "Favorites" }} />
        </Tab.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}
