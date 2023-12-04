import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TextInput, TouchableOpacity, Modal } from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';



const ListaProdutos = ({ products }) => {
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortConfig, setSortConfig] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedProductForDeletion, setSelectedProductForDeletion] = useState(null);
  const [pageKey, setPageKey] = useState(Date.now()); // Adicione o estado pageKey



  useEffect(() => {
    setSortedProducts(products);
  }, [products]);

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

  const handleSearch = (text) => {
    setSearchTerm(text);
    const filteredProducts = products.filter(
      (product) =>
        product.ins_nome.toLowerCase().includes(text.toLowerCase()) ||
        product.ins_quantidade.toString().includes(text) ||
        product.ins_medida.toLowerCase().includes(text.toLowerCase()) ||
        moment(product.novaDataVencimento).format('DD/MM/YYYY').includes(text)
    );
    setSortedProducts(filteredProducts);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleSaveEdit = async (editedProduct) => {
    const productId = editedProduct.ins_id; // Supondo que ins_id seja a chave correta para identificar o produto no backend

    try {
      const response = await fetch(`http://192.168.1.2:3000/atualizar-produto/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ins_nome: editedProduct.ins_nome,
          ins_quantidade: editedProduct.ins_quantidade,
          ins_medida: editedProduct.ins_medida,
        }),
      });

      if (response.ok) {
        console.log('Produto atualizado com sucesso!');
        // Atualize a lista de produtos após a edição
        const updatedProducts = sortedProducts.map((product) =>
          product.ins_id === productId ? editedProduct : product
        );
        setSortedProducts(updatedProducts);
        setIsModalVisible(false);
      } else {
        console.error('Erro ao atualizar produto:', response.statusText);
        // Trate o erro de acordo com a sua necessidade
      }
    } catch (error) {
      console.error('Erro ao atualizar produto:', error.message);
      // Trate o erro de acordo com a sua necessidade
    }
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

    const handleDeleteCallback = (deletedProduct) => {
      // Atualize a lista de produtos após a exclusão
      const updatedProducts = sortedProducts.filter((p) => p.ins_id !== deletedProduct.ins_id);
      setSortedProducts(updatedProducts);
      
      // Chame a função para resetar a página
      resetPage();
    };
  
    const resetPage = () => {
      // Altere o valor de pageKey para forçar o reset da página
      setPageKey(Date.now());
    };

    return buttons;
    };

    const renderProductItem = ({ item, index }) => (
      <TouchableOpacity onPress={() => handleEdit(item)}>
        <View style={[styles.productItem, { backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }]}>
          <Text style={styles.productItemText}>{item.ins_nome}</Text>
          <Text style={styles.productItemText}>{item.ins_quantidade.toString()}</Text>
          <Text style={styles.productItemText}>{item.ins_medida}</Text>
          <Text style={styles.productItemText}>{moment(item.ins_vencimento).format('DD/MM/YYYY').toString()}</Text>
        </View>
      </TouchableOpacity>
    );
    

  const handleDelete = (product) => {
    setSelectedProductForDeletion(product);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteCallback = (deletedProduct) => {
    // Atualize a lista de produtos após a exclusão
    const updatedProducts = sortedProducts.filter((p) => p.ins_id !== deletedProduct.ins_id);
    setSortedProducts(updatedProducts);
  };

  const chamarModalDelete = (item) => {
    handleDelete(item, handleDeleteCallback);
  }

  return (
    <View style={styles.container}>
            <Text style={styles.textoTitulo}>Lista de Produtos Cadastrados</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Insira o que deseja Pesquisar..."
        value={searchTerm}
        onChangeText={handleSearch}
      />
                  <Text style={styles.textoTitulo}></Text>

      <FlatList
  data={sortedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
  keyExtractor={(item) => item.ins_id.toString()}
  renderItem={renderProductItem}
  ListHeaderComponent={() => (
    <View style={styles.header}>
      <Text style={[styles.headerText, { backgroundColor: '#1a1a27' }]} onPress={() => handleSort('ins_nome')}>
        Nome Produto
      </Text>
      <Text style={[styles.headerText, { backgroundColor: '#1a1a27' }]} onPress={() => handleSort('ins_quantidade')}>
        Quantidade
      </Text>
      <Text style={[styles.headerText, { backgroundColor: '#1a1a27' }]} onPress={() => handleSort('ins_medida')}>
        Unidade de Medida
      </Text>
      <Text
        style={[styles.headerText, { backgroundColor: '#1a1a27' }]}
        onPress={() => handleSort('novaDataVencimento')}
      >
        Data de Vencimento
      </Text>
    </View>
  )}
/>

      <View style={styles.paginationContainer}>{renderPaginationButtons()}</View>

      <EditModal
        isVisible={isModalVisible}
        selectedProduct={selectedProduct}
        onSave={handleSaveEdit}
        onCancel={() => setIsModalVisible(false)}  // Atualize aqui
        chamarModalDelete={chamarModalDelete}
      />

      <DeleteModal
        isVisible={isDeleteModalVisible}
        product={selectedProductForDeletion}
        onDelete={handleDeleteCallback}
        onCancel={() => setIsDeleteModalVisible(false)}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flex: 1
  },
  container: {
    flex: 1,
    textAlign: 'center',
    marginRight: 80,
    marginLeft: 80,
    marginBottom: 30,
    marginTop: 10,
  },
  textoTitulo: {
    textAlign: 'center', 
    color: '#1A1A27',
     marginTop: 20, 
     fontWeight: 'bold', 
     marginBottom: 20,
     fontSize: 30,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop: 10,
    paddingLeft: 10,
    marginHorizontal: 50,
    paddingHorizontal: 50,

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
    textAlign: 'center',
    padding: 8,
    color: 'white',
    flex: 1,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign:'center',
    padding: 5,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  productItemText: {
    width: '20%',
    textAlign: 'center',
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
});

export default ListaProdutos;
