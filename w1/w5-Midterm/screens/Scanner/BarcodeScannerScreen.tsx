// screens/Scanner/BarcodeScannerScreen.tsx
import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { Camera, CameraView, BarcodeScanningResult } from "expo-camera";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import type { ScannerStackParamList } from "../../types/navigation";

type Nav = StackNavigationProp<ScannerStackParamList, "Scanner">;

function extractUrlOrId(data: string) {
  // expects like https://dummyjson.com/products/1
  const m = data.match(/https?:\/\/.*?dummyjson\.com\/products\/(\d+)/i);
  if (!m) return { url: data, id: undefined };
  return { url: `https://dummyjson.com/products/${m[1]}`, id: Number(m[1]) };
}

const BarcodeScannerScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const scannedRef = useRef(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ data }: BarcodeScanningResult) => {
    if (scannedRef.current) return;
    scannedRef.current = true;
    setScanned(true);

    const { url } = extractUrlOrId(data);
    if (!/^https?:\/\//i.test(url)) {
      Alert.alert("Invalid QR", "This QR code is not a product URL.");
      return;
    }

    navigation.navigate("ProductDetail", { url });
  };

  const resetScanner = () => {
    scannedRef.current = false;
    setScanned(false);
  };

  if (hasPermission === null) return <Text>Requesting camera permission...</Text>;
  if (hasPermission === false) return <Text>No access to camera</Text>;

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scannedRef.current ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }} // QR only
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title="Scan another code" onPress={resetScanner} />}
    </View>
  );
};

export default BarcodeScannerScreen;

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "column", justifyContent: "center" },
});
