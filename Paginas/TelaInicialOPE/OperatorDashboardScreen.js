import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, FlatList, Picker} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ListaProdutos from '../../components/ListaProdutos/ListaProdutos'; // Importe o componente ListaProdutos
import axios from 'axios';

const OperatorDashboardScreen = () => {
  const [userType, setUserType] = useState('operador'); // Defina o estado inicial de userType
  const [currentDate, setCurrentDate] = useState(''); // Defina o estado inicial de currentDate
  const [allProducts, setAllProducts] = useState([]);
  const navigation = useNavigation();

  const handleUserTypeChange = (value) => {
    setUserType(value);

    // Navegar para a página do administrador quando o tipo for 'administrador'
    if (value === 'administrador') {
      // Implemente a navegação para a página do administrador
      console.log('Navegar para a página do administrador');
    }
  };

  // Função para obter a data atual formatada
  const getCurrentDate = () => {
    const date = new Date();
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return formattedDate;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/produtos');
        setAllProducts(response.data); // Defina todos os produtos da resposta da API
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    setCurrentDate(getCurrentDate());
    fetchProducts();
  }, []);

  return (
    <View style={styles.container}>
<View style={styles.header}>
        <Picker
          style={styles.picker}
          selectedValue={userType}
          onValueChange={(itemValue) => handleUserTypeChange(itemValue)}
        >
          <Picker.Item label="Operador" value="operador" />
          <Picker.Item label="Administrador" value="administrador" />
        </Picker>

        <View style={styles.dateContainer}>
          <View style={styles.dateLabelContainer}>
            <Text style={styles.dateLabel}>Data Atual</Text>
          </View>
          <View style={styles.dateValueContainer}>
            <Text style={styles.dateValue}>{currentDate}</Text>
          </View>
        </View>
      </View>

      <View style={styles.dashboard}>
        <br></br>
        <br></br>
        <View style={styles.dashboardInfo}>
          {/* Informações da dashboard lado a lado */}
          <View style={styles.dashboardItem}>
            <Text>Info 1:</Text>
            <Text>Valor</Text>
          </View>
          <View style={styles.dashboardItem}>
            <Text>Info 2:</Text>
            <Text>Valor</Text>
          </View>
          <View style={styles.dashboardItem}>
            <Text>Info 3:</Text>
            <Text>Valor</Text>
          </View>
          <View style={styles.dashboardItem}>
            <Text>Info 4:</Text>
            <Text>Valor</Text>
          </View>
        </View>
      </View>

      <br></br>
      <br></br>
      <br></br>
      <ListaProdutos products={allProducts} /> {/* Passe os dados da API para o componente ListaProdutos */}

      <View style={styles.bottomButtons}>
        <Button
          title="Cadastrar Produto"
          onPress={() => {
            navigation.navigate('RegistrationProduct'); // Navegar para a tela de cadastro de produto
          }}
        />
        <Button
          title="Atualizar Produto"
          onPress={() => {
            // Navegar para a tela de atualização de produto
            // Implemente a navegação de acordo com sua configuração de rotas
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    textAlign: 'center',
    alignItems: 'center',
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
  },
  container: {
    flex: 1,
  }, 
  dashboardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dashboardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dashboardItem: {
    flex: 1,
    alignItems: 'center',
  },
  productList: {
    flex: 1,
  },
  productListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default OperatorDashboardScreen;
