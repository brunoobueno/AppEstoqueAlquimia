import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const OperatorDashboardScreen = () => {
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const navigation = useNavigation();

  

  // Exemplo: Produtos com menor quantidade em estoque
  useEffect(() => {
    // Consulta ao banco de dados ou API para buscar produtos com estoque baixo
    // Atualiza o estado lowStockProducts com os dados obtidos
    // Exemplo:
    const lowStockData = [
      { id: 1, name: 'Produto 1', quantity: 5 },
      { id: 2, name: 'Produto 2', quantity: 10 },
      // Outros produtos com estoque baixo
    ];
    setLowStockProducts(lowStockData);
  }, []);

  // Exemplo: Lista de produtos (25 primeiros ou todos, dependendo da escolha do usuário)
  useEffect(() => {
    // Consulta ao banco de dados ou API para buscar todos os produtos
    // Atualiza o estado allProducts com os dados obtidos
    // Exemplo:
    const allProductsData = [
      { id: 1, name: 'Produto 1', quantity: 50 },
      { id: 2, name: 'Produto 2', quantity: 30 },
      // Outros produtos
    ];
    setAllProducts(allProductsData);
  }, []);

  const toggleShowAllProducts = () => {
    setShowAllProducts(!showAllProducts);
  };
  const handleCadastrarProduto = () => {
    // Navegar para a tela de CadastroProduto
    navigation.navigate('CadastroProduto');
  };

  return (
    <View style={styles.container}>
      <View style={styles.dashboard}>
        <Text style={styles.dashboardTitle}>Dashboard</Text>
        <Text>Produtos com Menor Estoque:</Text>
        <FlatList
          data={lowStockProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text>{`${item.name}: ${item.quantity} unidades`}</Text>
          )}
        />
        {/* Outras informações da dashboard podem ser adicionadas aqui */}
      </View>

      <View style={styles.productList}>
        <Text style={styles.productListTitle}>Lista de Produtos</Text>
        {showAllProducts ? (
          <FlatList
            data={allProducts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Text>{`${item.name}: ${item.quantity} unidades`}</Text>
            )}
          />
        ) : (
          <Button title="Ver Todos" onPress={toggleShowAllProducts} />
        )}
      </View>

      <View style={styles.bottomButtons}>
        <Button title="Cadastrar Produto" onPress={handleCadastrarProduto} /> { /* Navegar para a tela de Cadastrar Produto */ }
        <Button title="Atualizar Estoque" onPress={() => { /* Navegar para a tela de atualização de estoque */ }} />
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
  productList: {
    flex: 1,
  },
  productListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default OperatorDashboardScreen;
