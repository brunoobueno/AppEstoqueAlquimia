import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, FlatList, Picker } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ListaProdutos from '../../components/ListaProdutos/ListaProdutos';
import axios from 'axios';
import Modal from 'react-native-modal';
import moment from 'moment';


const OperatorDashboardScreen = () => {
  const [userType, setUserType] = useState('Administrador');
  const [currentDate, setCurrentDate] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [estoqueBaixo, setEstoqueBaixo] = useState(0);
  const [vencimentoProximo, setVencimentoProximo] = useState(0);
  const [itensComLacunas, setItensComLacunas] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigation = useNavigation();

  // Função para obter a data atual formatada
  const getCurrentDate = () => {
    const date = new Date();
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return formattedDate;
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const openModal = async () => {
    try {
      const response = await axios.get('http://localhost:3000/lista-estoque-baixo');
      setSelectedProducts(response.data.produtosEstoqueBaixo);
      toggleModal();
    } catch (error) {
      console.error('Erro ao buscar produtos com estoque baixo:', error);
    }
  };

  const handleUserTypeChange = (value) => {
    setUserType(value);

    if (value === 'administrador') {
      // Implemente a navegação para a página do administrador
      console.log('Navegar para a página do administrador');
    }
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

    const fetchVencimentoProximo = async () => {
      try {
        const response = await axios.get('http://localhost:3000/vencimento-proximo');
        setVencimentoProximo(response.data.quantidadeVencimentoProximo);
      } catch (error) {
        console.error('Erro ao buscar itens com vencimento próximo:', error);
      }
    };

    const fetchItensComLacunas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/produtos-com-lacunas');
        setItensComLacunas(response.data.quantidadeProdutosComLacunas);
      } catch (error) {
        console.error('Erro ao buscar itens com lacunas:', error);
      }
    };

    fetchItensComLacunas();
    fetchVencimentoProximo();
    setCurrentDate(getCurrentDate());
    fetchProducts();
    fetchEstoqueBaixo();
  }, []);

  return (
    <View style={styles.container}>
<View style={styles.header}>
        <Picker
          style={styles.picker}
          selectedValue={userType}
          onValueChange={(itemValue) => handleUserTypeChange(itemValue)}
        >
          <Picker.Item label="Administrador" value="administrador" />
          <Picker.Item label="Operador" value="operador" />
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
          <View style={styles.dashboardItem1} onTouchEnd={openModal}>
  <View style={styles.dashboardValueContainer}>
    <Text style={styles.dashboardValue} onPress={openModal}>{estoqueBaixo}</Text>
    <Text style={styles.dashboardUnit}>Un.</Text>
  </View>
  <Text style={styles.dashboardTitle} onPress={openModal}>Produtos com Estoque Baixo</Text>
</View>


          {/* Dashboard Item 2 */}
          <View style={styles.dashboardItem2}>
          <View style={styles.dashboardValueContainer}>
              <Text style={styles.dashboardValue}>{vencimentoProximo}</Text>
              <Text style={styles.dashboardUnit}>Un.</Text>
            </View>
            <Text style={styles.dashboardTitle}>Validade Próxima do Vencimento</Text>
          </View>

          {/* Dashboard Item 3 */}
          <View style={styles.dashboardItem3}>
          <View style={styles.dashboardValueContainer}>
              <Text style={styles.dashboardValue}>{itensComLacunas}</Text>
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

 {/* Modal */}
 <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
  <View style={styles.modalContainer}>
    <Text style={styles.modalTitle}>Produtos com Estoque Baixo</Text>
    <FlatList
      data={selectedProducts}
      keyExtractor={(item) => item.ins_id.toString()}
      renderItem={({ item, index }) => (
        <View style={[styles.modalItem, { backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }]}>
          <View style={styles.column}>
            <Text style={styles.modalLabel}>Nome do Produto:</Text>
            <Text style={styles.modalItemText}>{item.ins_nome.length > 25 ? `${item.ins_nome.substring(0, 22)}...` : item.ins_nome}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.modalLabel}>Quantidade:</Text>
            <Text style={styles.modalItemText}>{item.ins_quantidade}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.modalLabel}>Unidade de Medida:</Text>
            <Text style={styles.modalItemText}>{item.ins_medida}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.modalLabel}>Data de Vencimento:</Text>
            <Text style={styles.modalItemText}>{moment(item.ins_vencimento).format('DD/MM/YYYY')}</Text>
          </View>
        </View>
      )}
    />
    <Button title="Fechar" onPress={toggleModal} />
  </View>
</Modal>
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalItem: {
    flexDirection: 'column',
    padding: 12,
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
  column: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
  },
});

export default OperatorDashboardScreen;
