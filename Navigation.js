import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import SplashScreenComponent from './SplashScreen'; // Importe a SplashScreen
import LoginScreen from './LoginScreen'; // Importe a tela de login
import OperatorDashboardScreen from './OperatorDashboardScreen'; // Importe a Tela Inicial do Operador
import CadastroProduto from './RegistrationProduct';// Importe a Tela de Cadastro do Produto



const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreenComponent} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OperatorDashboard" component={OperatorDashboardScreen} />
        <Stack.Screen name="RegistrationProduct" component={CadastroProduto} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
