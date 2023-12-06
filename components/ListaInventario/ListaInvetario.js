import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TextInput, TouchableOpacity, Modal } from 'react-native';
import axios from 'axios';
import EditQuantityModal from './EditQuantityModal';

const ListaInventario = () => {
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortConfig, setSortConfig] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isConfirmationModalVisible, setConfirmationModalVisible] = useState(false);
  const [selectedProductForEdit, setSelectedProductForEdit] = useState(null);
  const [newQuantity, setNewQuantity] = useState('');

  const handleEdit = (product) => {
    setSelectedProductForEdit(product);
    setEditModalVisible(true);
  };

  const handleEditConfirmation = (quantity) => {
    // Aqui você pode mostrar outro modal de confirmação se desejar

    // Defina a nova quantidade no estado ou faça o que for necessário
    setNewQuantity(quantity);

    // Abre o modal de confirmação
    setConfirmationModalVisible(true);
  };

  const handleConfirmationResult = (confirmed) => {
    if (confirmed) {
      // Faça a atualização no banco de dados com newQuantity
      console.log(`Atualizar ${selectedProductForEdit.ins_nome} com a quantidade ${newQuantity}`);
    }

     // Limpe os estados e feche os modais
     setNewQuantity('');
     setEditModalVisible(false);
     setConfirmationModalVisible(false);
   };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://db-alquimia.mysql.database.azure.com:3000/produtos');
      setSortedProducts(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sorted = [...sortedProducts];
    sorted.sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setSortedProducts(sorted);
    setSortConfig({ key, direction });
  };

  const renderPaginationButtons = () => {
    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <Button
          key={i}
          title={i.toString()}
          onPress={() => setCurrentPage(i)}
          color={currentPage === i ? '#1a1a27' : '#313140'}
        />
      );
    }

    return buttons;
  };

  const renderProductItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleEdit(item)}>
      <View style={[styles.productItem, { backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }]}>
        <Text style={styles.productItemText}>{item.ins_nome}</Text>
        <Text style={styles.productItemText}>{item.ins_quantidade}</Text>
        <Text style={styles.productItemText}>{item.ins_medida}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleDelete = (product) => {
    setSelectedProductForDeletion(product);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteCallback = (deletedProduct) => {
    const updatedProducts = sortedProducts.filter((p) => p.ins_id !== deletedProduct.ins_id);
    setSortedProducts(updatedProducts);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
        keyExtractor={(item) => item.ins_id.toString()}
        renderItem={renderProductItem}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={[styles.headerText, { backgroundColor: '#1a1a27' }]} onPress={() => handleSort('ins_nome')}>
              Produto
            </Text>
            <Text style={[styles.headerText, { backgroundColor: '#1a1a27' }]} onPress={() => handleSort('ins_quantidade')}>
              Qtd. Atual
            </Text>
            <Text style={[styles.headerText, { backgroundColor: '#1a1a27' }]} onPress={() => handleSort('ins_medida')}>
              Medida
            </Text>
            <Text
              style={[styles.headerText, { backgroundColor: '#1a1a27' }]}
              onPress={() => handleSort('novaDataVencimento')}
            >
              Qtd. Real
            </Text>
          </View>
        )}
      />
      <View style={styles.paginationContainer}>{renderPaginationButtons()}</View>

      <EditQuantityModal
        isVisible={isEditModalVisible}
        product={selectedProductForEdit}
        onCancel={() => setEditModalVisible(false)}
        onConfirm={handleEditConfirmation}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    margin: 10,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  productItemText: {
    flex: 1,
    textAlign: 'left',
    marginLeft: 15,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  icone1: {
    marginRight: 10,
  },
  icone2: {
    marginRight: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#1a1a27',
    padding: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  headerText: {
    fontWeight: 'bold',
    padding: 8,
    color: 'white',
    flex: 1,
  },
});

export default ListaInventario;