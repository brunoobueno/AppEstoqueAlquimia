import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import SplashScreenComponent from '../../Paginas/TelaCarregamento/TelaCarregamento'; // Importe a SplashScreen
import LoginScreen from '../../Paginas/TelaLogin/TelaLogin'; // Importe a tela de login
import OperatorDashboardScreen from '../../Paginas/TelaInicialOPE/OperatorDashboardScreen'; // Importe a Tela Inicial do Operador
import RegistrationProduct from '../../Paginas/CadastroProduto/InserirDados';// Importe a Tela de Cadastro do Produto
import RegisteredProduct from '../../Paginas/CadastroProduto/RegistroConcluido'; // Importe a tela de Produto Registrado


const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>

        <Stack.Screen name="OperatorDashboard" component={OperatorDashboardScreen} />
        <Stack.Screen name="RegistrationProduct" component={RegistrationProduct} />
        <Stack.Screen name="RegisteredProduct" component={RegisteredProduct} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
