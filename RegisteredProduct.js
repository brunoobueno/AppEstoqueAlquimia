// QuantilyProduct.js
import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const QuantilyProduct = () => {

  const navigation = useNavigation();

  const handleFinished = () => {
    // Ir para a tela de Inicio)
    navigation.navigate('OperatorDashboard');}


  return (
    <View style={styles.container}><p>REGISTRO CONCLUÍDO</p>
                 <Button title="Próximo" onPress={handleFinished} /> 
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
  });

export default QuantilyProduct;
