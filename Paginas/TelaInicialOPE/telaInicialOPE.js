import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import ListaProdutos from '../../components/ListaProdutos/ListaProdutos';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

// Defina a função getCurrentDate
const getCurrentDate = () => {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, '0'); // Adiciona zero à esquerda se necessário
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Adiciona zero à esquerda se necessário
  const year = now.getFullYear();
  return `${day}/${month}/${year}`;
};

const OperadorDashboardScreen = ({ route }) => {
  const [userType, setUserType] = useState('Operador');
  const [currentDate, setCurrentDate] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [pageKey, setPageKey] = useState(Date.now());
  const [isScannerActive, setScannerActive] = useState(false);
  const navigation = useNavigation();

  const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const handleAdicionarQuantidade = () => {
    navigation.navigate('ScannerScreen');
  };  

  const handleUserTypeChange = (value) => {
    setUserType(value);
    if (value === 'administrador') {
      console.log('Navegar para a página do administrador');
    }
  };

  const handleRemoverQuantidade = () => {
    navigation.navigate('ScannerScreen', { action: 'remover' });
  };

  const IniciaInventario = () => {
    navigation.navigate('TelaInventario');
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://db-alquimia.mysql.database.azure.com:3000/produtos');
        setAllProducts(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
    setCurrentDate(getCurrentDate());
  }, []);

  const logout = async () => {
    await storeData('userLogin', null);
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>ALQUIMIA INDUSTRIA { }</Text>
        <View style={styles.dateContainer}>
          <View style={styles.dateLabelContainer}>
            <Text style={styles.dateLabel}>Data Atual:</Text>
          </View>
          <View style={styles.dateValueContainer}>
            <Text style={styles.dateValue}>{currentDate}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Sair" onPress={logout} color="#1a1a27" />
        </View>
      </View>

      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity onPress={handleAdicionarQuantidade} style={styles.botaoREM}>
          <Text style={styles.botaoTexto}>Adicionar</Text>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.botaoTexto}>Quantidade</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleRemoverQuantidade} style={styles.botaoREM}>
          <Text style={styles.botaoTexto}>Remover </Text>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.botaoTexto}>Quantidade</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={IniciaInventario} style={styles.botaoREM}>
          <Text style={styles.botaoTexto}>Iniciar </Text>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.botaoTexto}>Inventário</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Exibe o restante do conteúdo da tela sem o BarCodeScanner */}
      <ListaProdutos key={pageKey} products={allProducts} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1a1a27', // Cor de fundo alterada para rgb(26, 26, 39)
    textAlign: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 18,
    color: 'white',
    marginTop: 20,
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
    width: '15%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#1a1a27',
  },
  picker: {
    color: 'white',
    backgroundColor: '#1a1a27',
    width: 150,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  dateLabelContainer: {
    backgroundColor: '#1a1a27',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  dateLabel: {
    fontSize: 16,
    fontFamily: 'Montserrat',
    color: 'white',
  },
  dateValueContainer: {
    backgroundColor: '#1a1a27',
    padding: 10,
    borderRadius: 5,
  },
  dateValue: {
    fontSize: 16,
    fontFamily: 'Montserrat',
    color: 'white',
  },
  dashboard: {
    marginBottom: 16,
    marginLeft: 15,
    marginRight: 15,
  },
  container: {
    flex: 1,
  },
  dashboardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    alignItems: 'center',
  },
  dashboardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dashboardItem1: {
    flex: 1,
    backgroundColor: '#ff6961', // Cor de fundo do retângulo arredondado
    borderRadius: 10, // Borda arredondada
    padding: 16,
    margin: 8,
  },
  dashboardItem2: {
    flex: 1,
    backgroundColor: '#77dd77', // Cor de fundo do retângulo arredondado
    borderRadius: 10, // Borda arredondada
    padding: 16,
    margin: 8,
  },
  dashboardItem3: {
    flex: 1,
    backgroundColor: '#dfd880', // Cor de fundo do retângulo arredondado
    borderRadius: 10, // Borda arredondada
    padding: 16,
    margin: 8,
  },
  dashboardItem4: {
    flex: 1,
    backgroundColor: '#77dd77', // Cor de fundo do retângulo arredondado
    borderRadius: 10, // Borda arredondada
    padding: 16,
    margin: 8,
  },
  dashboardValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center'
  },
  dashboardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 4,
  },
  dashboardUnit: {
    fontSize: 16,
  },
  productList: {
    flex: 1,
  },
  productListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  modalContainer: {
    flex: 1,
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#F2F2F2', // Cor de fundo do modal
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white', // Cor do texto do título
    backgroundColor: '#1a1a27',
    padding: 10,
  },
  modalItem: {
    flexDirection: 'column',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  modalItemText: {
    fontSize: 16,
    marginBottom: 8,
  },
  modalLabel: {
    fontWeight: 'bold',
    marginRight: 4,
  },
  centeredColumn: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalButtonContainer: {
    marginTop: 20, // Espaço acima do botão
    alignSelf: 'center', // Alinha o botão ao centro horizontalmente
  },
  modalCloseButton: {
    width: 120, // Aumente a largura do botão
    padding: 12, // Aumente o espaçamento interno do botão
    marginBottom: 10, // Mantenha o espaçamento abaixo do botão
  },
  icone1: {
    marginRight: 10,
  },
  icone2: {
    marginRight: 10,
  },
  bottomButtons: {
    flexDirection: 'row',
    marginLeft: 100,
    marginTop: 20,
    justifyContent: 'space-between',
  },
  botaoADC: {
    backgroundColor: '#1A1A27',
    paddingVertical: 10,
    paddingHorizontal: 30, // Ajustar tamanho horizontal
    marginLeft: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  botaoREM: {
    backgroundColor: '#1A1A27',
    marginRight: 50,
    marginLeft: 50,
    paddingVertical: 8, // Ajustar tamanho vertical
    paddingHorizontal: 35, // Ajustar tamanho horizontal
    borderRadius: 5,
    marginVertical: 10,
  },
  botaoTexto: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default OperadorDashboardScreen;
