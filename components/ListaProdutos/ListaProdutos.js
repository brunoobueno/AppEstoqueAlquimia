import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';

const ListaProdutos = ({ products }) => {
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortConfig, setSortConfig] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const renderPaginationButtons = () => {
    const totalPages = Math.ceil(products.length / itemsPerPage);

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
    <View style={[styles.productItem, { backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }]}>
      <Text style={styles.productItemText}>{item.ins_nome}</Text>
      <Text style={styles.productItemText}>{item.ins_quantidade}</Text>
      <Text style={styles.productItemText}>{item.ins_medida}</Text>
      <Text style={styles.productItemText}>{item.ins_vencimento}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
        keyExtractor={(item) => item.ins_id.toString()}
        renderItem={renderProductItem}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={[styles.headerText, { backgroundColor: '#1a1a27' }]}>Nome Produto</Text>
            <Text style={[styles.headerText, { backgroundColor: '#1a1a27' }]}>Quantidade</Text>
            <Text style={[styles.headerText, { backgroundColor: '#1a1a27' }]}>Unidade de Medida</Text>
            <Text style={[styles.headerText, { backgroundColor: '#1a1a27' }]}>Data de Vencimento</Text>
          </View>
        )}
      />
      <View style={styles.paginationContainer}>
        {renderPaginationButtons()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    margin: 10,
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
    flex: 1, // Para ocupar o espaço total disponível na largura
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
    flex: 1, // Distribuir o espaço igualmente
    textAlign: 'left', // Centralizar o texto
    marginLeft: 15,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default ListaProdutos;
