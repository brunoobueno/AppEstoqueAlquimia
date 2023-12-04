import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';

const ScannerScreen = () => {
  const navigation = useNavigation();
  const cameraRef = useRef(null);

  const handleBarcodeRead = ({ data }) => {
    console.log('Código de barras lido:', data);
    navigation.goBack();
  };

  useEffect(() => {
    const handleQRCodeRead = ({ data }) => {
      console.log('Código QR lido:', data);
      navigation.navigate('OperadorDashboard', { scannedData: data });
    };

    navigation.setOptions({
      headerShown: false, // Esconda o header nesta tela se necessário
    });

    // Resume a visualização da câmera ao entrar na tela
    const resumeCamera = () => {
      if (cameraRef.current) {
        cameraRef.current.resumePreviewAsync();
      }
    };

    // Pausa a visualização da câmera ao sair da tela
    const pauseCamera = () => {
      if (cameraRef.current) {
        cameraRef.current.pausePreviewAsync();
      }
    };

    const subscriptionFocus = navigation.addListener('focus', resumeCamera);
    const subscriptionBlur = navigation.addListener('blur', pauseCamera);

    return () => {
      subscriptionFocus();
      subscriptionBlur();
    };
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <BarCodeScanner
        ref={(ref) => (cameraRef.current = ref)}
        onBarCodeScanned={handleBarcodeRead}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
};

export default ScannerScreen;
