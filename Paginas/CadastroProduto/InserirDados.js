import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, BackHandler, ScrollView, Picker } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment'; 
import axios from 'axios';



// Lista de unidades
const unidades = ['ML', 'LT', 'UN', 'g', 'KG'];

// Função para cadastrar produto
const cadastrarProduto = async (dadosProduto) => {
  try {
    const response = await axios.post('http://localhost:3000/inserir-produto', dadosProduto);

    if (response.status === 200) {
      console.log('Produto cadastrado com sucesso!');
      return true;
    } else {
      console.error('Erro ao cadastrar o produto na API:', response.data.message);
      return false;
    }
  } catch (error) {
    console.error('Erro ao cadastrar o produto na API:', error.message);
    return false;
  }
};

const generateRandomCode = () => {
  // Gera um número aleatório de 9 dígitos
  const randomCode = Math.floor(100000000 + Math.random() * 900000000);
  return randomCode.toString();
};

const RegistrationProduct = () => {
  const navigation = useNavigation();

  const [codigoProduto, setCodigoProduto] = useState('');
  const [erroCodigo, setErroCodigo] = useState('');
  const [codigoGerado, setCodigoGerado] = useState(false);

  const [nomeProduto, setNomeProduto] = useState('');
  const [erroNome, setErroNome] = useState('');

  const [quantityProduct, setQuantityProduct] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('ML');

  const [quantityMinimo, setQuantityMinimo] = useState('');

  const [batchNumber, setBatchNumber] = useState('');
  const [showBatchError, setShowBatchError] = useState(false);

  


  const onPressRandomCode = () => {
    const randomCode = generateRandomCode();
    setCodigoProduto(randomCode);
    setErroCodigo('');
    setCodigoGerado(true); // Define codigoGerado como true
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleGoBack);

    return () => backHandler.remove();
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
    return true;
  };

  const onPressFinalizar = async () => {
    const codigoValido = codigoProduto.trim() !== '';
    const nomeValido = nomeProduto.trim() !== '';
    const loteValido = batchNumber !== '';

    setErroCodigo(codigoValido ? '' : 'Digite um código válido!!!');
    setErroNome(nomeValido ? '' : 'Digite um nome válido!!!');
    setShowBatchError(loteValido ? false : true);
    

    if (codigoValido && nomeValido && loteValido) {
      // Calcula a data de vencimento (data atual + 90 dias)
      const ins_cadastro = moment().format('YYYY-MM-DD HH:mm:ss');
      const dataVencimento = moment().add(90, 'days').format('YYYY-MM-DD HH:mm:ss');
  
      const dadosProduto = {
        codigoProduto,
        nomeProduto,
        quantityProduct,
        quantityMinimo,
        batchNumber,
        ins_medida: selectedUnit,
        ins_cadastro,
        ins_vencimento: dataVencimento,
      };

      try {
        const cadastradoComSucesso = await cadastrarProduto(dadosProduto);
  
        if (cadastradoComSucesso) {
          navigation.navigate('RegisteredProduct');
        } else {
          // Tratar o caso de falha ao cadastrar o produto, se necessário
        }
      } catch (error) {
        console.error('Erro ao cadastrar o produto:', error);
        // Tratar o erro, se necessário
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Icon
        name="arrow-left"
        size={24}
        color="#1A1A27"
        style={styles.backIcon}
        onPress={handleGoBack}
      />
      <Text style={styles.title}>CADASTRO DE PRODUTO</Text>

      <View style={styles.column}>
      <Text style={styles.label}>CÓDIGO DO PRODUTO</Text>
        <View style={styles.codeInputContainer}>
          <TextInput
            style={[
              styles.input,
              erroCodigo && styles.inputError,
              codigoGerado && styles.generatedCodeInput,
            ]}
            placeholder="Digite o código do produto"
            onChangeText={() => {}}
            value={codigoProduto}
            editable={false}
          />
          <Pressable
            style={styles.randomCodeButton}
            onPress={onPressRandomCode}
          >
            <Icon name="sync" size={16} color="#fff" />
          </Pressable>
        </View>
        <Text style={styles.errorMessage}>{erroNome}</Text>

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
        <View style={styles.quantityContainer}>
          <TextInput
            style={[styles.input, styles.quantityInput]}
            placeholder="Digite a quantidade"
            onChangeText={(text) => setQuantityProduct(text.replace(/[^0-9]/g, ''))}
            value={quantityProduct}
            keyboardType="numeric"
          />
          <Picker
            selectedValue={selectedUnit}
            style={[styles.input, styles.picker, styles.quantityInput]}
            onValueChange={(itemValue, itemIndex) => setSelectedUnit(itemValue)}
          >
            {unidades.map((unidade, index) => (
              <Picker.Item key={index} label={unidade} value={unidade} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>QUANTIDADE MÍNIMA:</Text>
        <View style={styles.quantityContainer}>
          <TextInput
            style={[styles.input, styles.quantityInput]}
            placeholder="Digite a quantidade mínima"
            onChangeText={(text) => setQuantityMinimo(text.replace(/[^0-9]/g, ''))}
            value={quantityMinimo}
            keyboardType="numeric"
          />
        </View>

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
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={onPressFinalizar}
        >
          <Text style={styles.buttonText}>CADASTRAR</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 50,
    padding: 16,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    padding: 10,
    marginBottom: 20,
  },
  column: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1A1A27',
  },
  input: {
    height: 40,
    width: 300,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: 'white',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 16,
  },
  inputError: {
    borderColor: 'red',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  button: {
    backgroundColor: '#1A1A27',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 50,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityInput: {
    flex: 1,
  },
  picker: {
    height: 40,
    width: 20, // Largura desejada
    borderRadius: 12,
    borderWidth: 1,
    marginLeft: 8, // Espaçamento entre o TextInput e o Picker
    backgroundColor: 'white',  // Cor de fundo branca
  },
  backIcon: {
    position: 'absolute',
    top: 16,
    left: 80,
    zIndex: 1,
  },
  codeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  randomCodeButton: {
    backgroundColor: '#1A1A27',
    borderRadius: 50, // Valor grande para tornar o botão redondo
    padding: 10, // Ajuste conforme necessário
  },
  generatedCodeContainer: {
    backgroundColor: '#f2f2f2', // Cor de fundo cinza claro
  },
  generatedCodeInput: {
    backgroundColor: '#f2f2f2', // Cor de fundo cinza claro
  },
});

export default RegistrationProduct;
