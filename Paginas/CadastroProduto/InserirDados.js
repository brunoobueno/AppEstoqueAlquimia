import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { FontSize, Color, FontFamily, Padding } from '../../EstilosGlobais/GlobalStyles';

const RegistrationProduct = () => {
  const navigation = useNavigation();

  const [nomeProduto, setNomeProduto] = useState('');
  const [erroNome, setErroNome] = useState('');

  const [quantityProduct, setQuantityProduct] = useState('');
  const [showQuantityError, setShowQuantityError] = useState(false);

  const [batchNumber, setBatchNumber] = useState('');
  const [showBatchError, setShowBatchError] = useState(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleGoBack);

    return () => backHandler.remove();
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
    return true;
  };

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
      <Pressable
        style={styles.backButton}
        onPress={handleGoBack}
      >
        <Ionicons name="arrow-back" size={24} color="#1A1A27" />
      </Pressable>
      {/* Registro do Nome do Produto */}
      <Text style={styles.label}>NOME</Text>
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

      <Text style={styles.label}>QUANTIDADE:</Text>
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

      <Text style={styles.label}>LOTE:</Text>
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

<Pressable
        style={styles.button}
        onPress={onPressFinalizar}
      >
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
    fontFamily: FontFamily.montserratRegular,
  },
  labelContainer: {
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1A1A27',
      fontFamily: FontFamily.montserratRegular,
  },
  input: {
    height: 40,
    width: 300,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 16,
    fontFamily: FontFamily.montserratRegular,
  },
  inputError: {
    borderColor: 'red',
    fontFamily: FontFamily.montserratRegular,
  },
  button: {
    backgroundColor: '#1A1A27',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 50,
    elevation: 2,
    marginTop: 16,
    fontFamily: FontFamily.montserratRegular,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: FontFamily.montserratRegular,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
  },
});

export default RegistrationProduct;
