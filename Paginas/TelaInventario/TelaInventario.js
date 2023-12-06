import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Modal, TouchableOpacity, Picker, StyleSheet } from 'react-native';
import ListaInventario from '../../components/ListaInventario/ListaInvetario';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

const TelaInventario = () => {
  const [supervisorName, setSupervisorName] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [employeesPresent, setEmployeesPresent] = useState('');
  const [observation, setObservation] = useState('');
  const [sortedProducts, setSortedProducts] = useState([]); // Defina sortedProducts
  const [products, setProducts] = useState([]); // Lista de produtos do banco de dados
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantityReal, setQuantityReal] = useState('');

  const navigation = useNavigation();

  const toggleModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(!isModalVisible);
  };

  const handleConfirmModal = async () => {
    try {
      const response = await fetch(`http://db-alquimia.mysql.database.azure.com:3000/atualizar-quantidade-real/${selectedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantidadeReal: quantityReal,
        }),
      });
  
      console.log('Response:', response);
      console.log('Response JSON:', await response.json());
  
      if (!response.ok) {
        throw new Error('Erro ao atualizar a quantidade real do produto');
      }
  
      setModalVisible(false); // Feche o modal após a confirmação bem-sucedida
    } catch (error) {
      console.error('Erro ao atualizar a quantidade real do produto:', error);
    }
  };

  const handleGoBack = () => {
    navigation.navigate('OperadorDashboardScreen');
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => toggleModal(item)}>
      <View style={styles.productItem}>
        <Text>{item.name}</Text>
        {/* Adapte conforme necessário para exibir as outras informações */}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Icon
        name="arrow-left"
        size={24}
        color="#1A1A27"
        style={styles.backIcon}
        onPress={handleGoBack}
      />

      <Text style={styles.title}>Inventário de Estoque</Text>

      <Text style={styles.descricao}> Para realizar o inventário de estoque, insira as informações solicitadas. Ao encontrar um produto, toque sobre ele para inserir a quantidade real. Lembre-se de revisar as informações antes de confirmar."</Text>

      <View style={styles.column}>
        <Text style={styles.label}>Nome do Supervisor</Text>
        <TextInput
          style={[styles.input, styles.textInput]}
          placeholder="Digite o nome do supervisor"
          value={supervisorName}
          onChangeText={(text) => setSupervisorName(text)}
        />
      </View>

      <View style={styles.column}>
        <Text style={styles.label}>Data</Text>
        <TextInput
          style={[styles.input, styles.textInput, styles.nonEditableTextInput]}
          editable={false}
        >
          {currentDate.toLocaleDateString()}
        </TextInput>
      </View>

      <View style={styles.column}>
        <Text style={styles.label}>Funcionários Presentes</Text>
        <TextInput
          style={[styles.input, styles.textInput]}
          placeholder="Digite os funcionários presentes"
          value={employeesPresent}
          onChangeText={(text) => setEmployeesPresent(text)}
        />
      </View>

      <View style={styles.column}>
        <Text style={styles.label}>Observação</Text>
        <TextInput
          style={[styles.input, styles.textInput]}
          placeholder="Digite as observações"
          value={observation}
          onChangeText={(text) => setObservation(text)}
        />
      </View>
       
      <ListaInventario products={products} />

      {/* Modal para a quantidade real do produto */}
      <Modal visible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Quantidade Real do Produto: {selectedProduct?.name}</Text>
          <TextInput
            style={[styles.input, styles.textInput]}
            placeholder="Digite a quantidade"
            keyboardType="numeric"
            value={quantityReal}
            onChangeText={(text) => setQuantityReal(text)}
          />
          {/* Adapte conforme necessário para exibir outras informações do produto */}
          <Button title="Confirmar" onPress={handleConfirmModal} />
          <Button title="Fechar" onPress={() => setModalVisible(!isModalVisible)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
  },
  descricao: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  column: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1A1A27',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: 'white',
  },
  textInput: {
    // Adapte o estilo do TextInput conforme necessário
  },
  nonEditableTextInput: {
    backgroundColor: '#F2F2F2',
  },
  productItem: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  backIcon: {
    position: 'absolute',
    top: 35,
    left: 80,
    zIndex: 1,
  },
});

export default TelaInventario;
