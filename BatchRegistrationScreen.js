// BatchRegistrationScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BatchRegistrationScreen = () => {
  const [batchNumber, setBatchNumber] = useState('');
  const navigation = useNavigation();

  const handleBatchRegistration = () => {
    console.log('Número do Lote:', batchNumber);

    navigation.navigate('OperatorDashboard');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Lote</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o número do lote"
        onChangeText={(text) => setBatchNumber(text)}
        value={batchNumber}
      />
       <Button
          title="Próximo"
          onPress={() => {
            navigation.navigate('RegisteredProduct'); // Navegar para a tela de cadastro de Quantidade
          }}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
});

export default BatchRegistrationScreen;
