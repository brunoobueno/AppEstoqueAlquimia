import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const ListaProdutos = ({ products }) => {
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortConfig, setSortConfig] = useState(null);

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

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.ins_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text>{item.ins_nome}</Text>
            <Text>{item.ins_quantidade}</Text>
            <Text>{item.ins_medida}</Text>
            <Text>{item.ins_vencimento}</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerText}>Nome Produto</Text>
            <Text style={styles.headerText}>Quantidade</Text>
            <Text style={styles.headerText}>Unidade de Medida</Text>
            <Text style={styles.headerText}>Data de Vencimento</Text>
          </View>
        )}
      />
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      textAlign: 'center',
      
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderColor: '#ccc',
      backgroundColor: '#f2f2f2',
      padding: 8,
    },
    headerText: {
      fontWeight: 'bold',
    },
    productItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 8,
    },
  });
  
  export default ListaProdutos;