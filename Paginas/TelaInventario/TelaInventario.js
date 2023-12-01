import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Modal, TouchableOpacity, Picker, StyleSheet } from 'react-native';
import ListaInventario from '../../components/ListaInventario/ListaInvetario';


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

  const toggleModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(!isModalVisible);
  };

  const handleConfirmModal = () => {
    // Lógica para confirmar a quantidade e atualizar a lista de produtos
    // ...

    setModalVisible(!isModalVisible);
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
      <Text style={styles.title}>Inventário de Estoque</Text>

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
        <Text style={styles.label}>Data: {currentDate.toLocaleDateString()}</Text>
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

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

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

      <ListaInventario products={sortedProducts} onProductPress={toggleModal} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
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
});

export default TelaInventario;
