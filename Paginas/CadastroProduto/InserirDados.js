import React, { useState } from 'react';
import { StyleSheet, Text, Pressable, View, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RegistrationProduct = () => {
  const navigation = useNavigation();

  const [nomeProduto, setNomeProduto] = useState('');
  const [erroNome, setErroNome] = useState('');

  const [quantityProduct, setQuantityProduct] = useState('');
  const [showQuantityError, setShowQuantityError] = useState(false);

  const [batchNumber, setBatchNumber] = useState('');
  const [showBatchError, setShowBatchError] = useState(false);

  const onPressFinalizar = () => {
    // Verificar se todas as informações estão corretas
    const nomeValido = nomeProduto.trim() !== '';
    const quantidadeValida = isValidNumber(quantityProduct);
    const loteValido = batchNumber !== '';

    // Atualizar mensagens de erro
    setErroNome(nomeValido ? '' : 'Digite um nome válido!!!');
    setShowQuantityError(quantidadeValida ? false : true);
    setShowBatchError(loteValido ? false : true);

    // Verificar se todas as informações estão corretas
    if (nomeValido && quantidadeValida && loteValido) {
      // Navegar para a próxima tela
      navigation.navigate('RegisteredProduct');
    }
  };

  const isValidNumber = (text) => {
    const numericValue = parseInt(text, 10);
    return /^\d+$/.test(text) && numericValue > 0;
  };

  return (
    <View style={styles.container}>
      {/* Registro do Nome do Produto */}
      <View style={styles.labelContainer}>
        <Text style={styles.label}>NOME</Text>
      </View>
      <TextInput
        style={[styles.input, erroNome && styles.inputError]}
        placeholder="Digite o nome do produto"
        onChangeText={(text) => {
          setNomeProduto(text);
          setErroNome('');
        }}
        value={nomeProduto}
      />
      <Text style={styles.errorMessage}>{erroNome}</Text>

      {/* Quantidade do Produto */}
      <View style={styles.labelContainer}>
        <Text style={styles.label}>QUANTIDADE:</Text>
      </View>
      <TextInput
        style={[styles.input, showQuantityError && styles.inputError]}
        placeholder="Digite a quantidade do produto"
        onChangeText={(text) => {
          setQuantityProduct(text.replace(/[^0-9]/g, ''));
          setShowQuantityError(false);
        }}
        value={quantityProduct}
        keyboardType="numeric"        
      />
      {showQuantityError && (
        <Text style={styles.errorMessage}>
          {quantityProduct.trim() === '' ? 'Digite a quantidade do produto' : 'Digite apenas números maiores que 0!!!'}
        </Text>
      )}

      {/* Número do Lote */}
      <View style={styles.labelContainer}>
        <Text style={styles.label}>LOTE:</Text>
      </View>
      <TextInput
        style={[styles.input, showBatchError && styles.inputError]}
        placeholder="Digite o lote do produto"
        onChangeText={(text) => {
          setBatchNumber(text);
          setShowBatchError(false);
        }}
        value={batchNumber}
      />
      {showBatchError && (
        <Text style={styles.errorMessage}>Digite um lote válido!!!</Text>
      )}

      {/* Botão Finalizar */}
      <Pressable
        style={styles.button}
        onPress={onPressFinalizar}>
        <Text style={styles.buttonText}>CADASTRAR</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    padding: 16,
  },
  labelContainer: {
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1A1A27',
  },
  input: {
    height: 40,
    width: 300,
    borderWidth: 1,
    borderRadius: 360,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 16,
  },
  inputError: {
    borderColor: 'red',
  },
  button: {
    backgroundColor: '#1A1A27',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 50,
    elevation: 2,
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RegistrationProduct;
