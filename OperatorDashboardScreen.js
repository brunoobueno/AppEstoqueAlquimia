import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const OperatorDashboardScreen = () => {
  const [allProducts, setAllProducts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://192.168.1.9:3000/produtos');
        setAllProducts(response.data); // Defina todos os produtos da resposta da API
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.dashboard}>
        <Text style={styles.dashboardTitle}>Dashboard</Text>
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

      <View style={styles.productList}>
        <Text style={styles.productListTitle}>Lista de Produtos</Text>
        {allProducts.length > 0 ? (
          <FlatList
            data={allProducts}
            keyExtractor={(item) => item.idProduto_final.toString()} // Atualize a chave para corresponder ao ID real
            renderItem={({ item }) => (
              <Text>{item.nome_produto}</Text> // Use item.nome_produto
            )}
          />
        ) : (
          <Text>Nenhum produto disponível. Realize o cadastro dos produtos na API.</Text>
        )}
      </View>

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
  },
  dashboard: {
    marginBottom: 16,
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
