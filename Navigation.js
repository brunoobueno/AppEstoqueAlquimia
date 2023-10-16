import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import SplashScreenComponent from './SplashScreen'; // Importe a SplashScreen
import LoginScreen from './LoginScreen'; // Importe a tela de login
import OperatorDashboardScreen from './OperatorDashboardScreen'; // Importe a Tela Inicial do Operador
import CadastroProduto from './RegistrationProduct';// Importe a Tela de Cadastro do Produto
import QuantilyProduct from './QuantilyProduct'; //Importe a Tela de Quantidade
import BatchRegistrationScreen from './BatchRegistrationScreen'; //Importe a Tela de Lote
import RegisteredProduct from './RegisteredProduct'; // Importe a tela de Produto Registrado

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreenComponent} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OperatorDashboard" component={OperatorDashboardScreen} />
        <Stack.Screen name="RegistrationProduct" component={CadastroProduto} />
        <Stack.Screen name="QuantilyProduct" component={QuantilyProduct} />
        <Stack.Screen name="BatchRegistrationScreen" component={BatchRegistrationScreen} />
        <Stack.Screen name="RegisteredProduct" component={RegisteredProduct} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
