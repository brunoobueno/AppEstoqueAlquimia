import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, FlatList, Picker} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ListaProdutos from '../../components/ListaProdutos/ListaProdutos'; // Importe o componente ListaProdutos
import axios from 'axios';

const OperatorDashboardScreen = () => {
  const [userType, setUserType] = useState('administrador'); // Defina o estado inicial de userType
  const [currentDate, setCurrentDate] = useState(''); // Defina o estado inicial de currentDate
  const [allProducts, setAllProducts] = useState([]);
  const [estoqueBaixo, setEstoqueBaixo] = useState(0); // Novo estado para a quantidade de produtos com estoque baixo
  const navigation = useNavigation();

  const handleUserTypeChange = (value) => {
    setUserType(value);

    // Navegar para a página do administrador quando o tipo for 'administrador'
    if (value === 'operador') {
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
        setAllProducts(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    const fetchEstoqueBaixo = async () => {
      try {
        const response = await axios.get('http://localhost:3000/estoque-baixo');
        setEstoqueBaixo(response.data.quantidadeEstoqueBaixo);
      } catch (error) {
        console.error('Erro ao buscar produtos com estoque baixo:', error);
      }
    };

    setCurrentDate(getCurrentDate());
    fetchProducts();
    fetchEstoqueBaixo(); // Chame a função para buscar a quantidade de produtos com estoque baixo
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

        <View style={styles.bottomButtons1}>
        <Button
          title="Cadastrar Produto"
          onPress={() => {
            navigation.navigate('RegistrationProduct'); // Navegar para a tela de cadastro de produto
          }}
          color="#1a1a27" // Cor do botão alterada para rgb(26, 26, 39)
        />
        </View>
        <View style={styles.bottomButtons2}>
        <Button
          title="Atualizar Produto"
          onPress={() => {
            // Navegar para a tela de atualização de produto
            // Implemente a navegação de acordo com sua configuração de rotas
          }}
          color="#1a1a27" // Cor do botão alterada para rgb(26, 26, 39)
        />
      </View>

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


        <View style={styles.dashboard}>
        <View style={styles.dashboardInfo}>
          {/* Dashboard Item 1 */}
          <View style={styles.dashboardItem1}>
          <View style={styles.dashboardValueContainer}>
              <Text style={styles.dashboardValue}>{estoqueBaixo}</Text>
              <Text style={styles.dashboardUnit}>Un.</Text>
            </View>
            <Text style={styles.dashboardTitle}>Produtos com Estoque Baixo</Text>
          </View>

          {/* Dashboard Item 2 */}
          <View style={styles.dashboardItem2}>
          <View style={styles.dashboardValueContainer}>
              <Text style={styles.dashboardValue}>{98}</Text>
              <Text style={styles.dashboardUnit}>Un.</Text>
            </View>
            <Text style={styles.dashboardTitle}>Validade Próxima do Vencimento</Text>
          </View>

          {/* Dashboard Item 3 */}
          <View style={styles.dashboardItem3}>
          <View style={styles.dashboardValueContainer}>
              <Text style={styles.dashboardValue}>{46}</Text>
              <Text style={styles.dashboardUnit}>Un.</Text>
            </View>
            <Text style={styles.dashboardTitle}>Itens que requerem atenção no Cadastro</Text>
          </View>

          {/* Dashboard Item 4 */}
          <View style={styles.dashboardItem4}>
          <View style={styles.dashboardValueContainer}>
              <Text style={styles.dashboardValue}>{9.3}</Text>
              <Text style={styles.dashboardUnit}>Dias</Text>
            </View>
            <Text style={styles.dashboardTitle}>Tempo médio de Reposição</Text>
          </View>

        </View>
      </View>
      </View>


      <ListaProdutos products={allProducts} /> {/* Passe os dados da API para o componente ListaProdutos */}

      
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
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default OperatorDashboardScreen;
