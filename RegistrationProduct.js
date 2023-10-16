// RegistrationProduct.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CadastroProduto = () => {
  const [nomeProduto, setNomeProduto] = useState('');
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do produto"
        onChangeText={(text) => setNomeProduto(text)}
        value={nomeProduto}
      />
       <Button
          title="Próximo"
          onPress={() => {
            navigation.navigate('QuantilyProduct'); // Navegar para a tela de cadastro de Quantidade
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
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
});

export default CadastroProduto;
