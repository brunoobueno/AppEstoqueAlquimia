import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const ScannerScreen = ({ route }) => {
  const navigation = useNavigation();
  const { action } = route.params || {};
  const [quantityToRemove, setQuantityToRemove] = useState(0);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);

    try {
      const response = await axios.get(`http://db-alquimia.mysql.database.azure.com:3000/produtos?ins_codigo=${parseInt(data, 10)}`);

      if (response.data.length > 0) {
        const insumoEncontrado = response.data.find(product => product.ins_codigo === parseInt(data, 10));
        if (insumoEncontrado) {
          console.log('Insumo encontrado:', insumoEncontrado);

          if (action === 'remover') {
            navigation.navigate('AtualizarREM', {
              insNome: insumoEncontrado.ins_nome,
              insId: insumoEncontrado.ins_id,
              insQuantidade: insumoEncontrado.ins_quantidade || 0,
              insMedida: insumoEncontrado.ins_medida || '',
            });
          } else {
            navigation.navigate('AtualizarADC', {
              insNome: insumoEncontrado.ins_nome,
              insId: insumoEncontrado.ins_id,
              insQuantidade: insumoEncontrado.ins_quantidade || 0,
              insMedida: insumoEncontrado.ins_medida || '',
            });
          }
        } else {
          Alert.alert('Produto não encontrado', 'O produto correspondente ao código não foi encontrado.');
        }
      } else {
        Alert.alert('Produto não encontrado', 'O produto correspondente ao código não foi encontrado.');
      }
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
    }
  };

  if (hasPermission === null) {
    return <Text>Solicitando permissão para acesso à câmera</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso à câmera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ flex: 1 }}
      />
      {scanned && (
        <TouchableOpacity onPress={() => setScanned(false)}>
          <Text style={{ fontSize: 20, color: 'white' }}>Toque para escanear novamente</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ScannerScreen;
