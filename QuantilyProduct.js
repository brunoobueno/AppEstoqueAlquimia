// QuantilyProduct.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const QuantilyProduct = () => {
  const [quantityProduct, setQuantityProduct] = useState('');
  const navigation = useNavigation();

  const handleNext = () => {
    // Ir para a tela de cadastro do lote)
    navigation.navigate('batchregistration', { quantityProduct });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite a quantidade do produto"
        onChangeText={(text) => setQuantityProduct(text)}
        value={quantityProduct}
      />
       <Button
          title="Próximo"
          onPress={() => {
            navigation.navigate('BatchRegistrationScreen'); // Navegar para a tela de cadastro de Lote
          }}
        />    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
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

export default QuantilyProduct;
