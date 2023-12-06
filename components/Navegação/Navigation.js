import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import SplashScreenComponent from '../../Paginas/TelaCarregamento/TelaCarregamento'; // Importe a SplashScreen
import LoginScreen from '../../Paginas/TelaLogin/TelaLogin'; // Importe a tela de login
import AdministradorDashboardScreen from '../../Paginas/TelaInicialADM/telaInicialADM'; // Importe a Tela Inicial do Operador
import TelaInventario from '../../Paginas/TelaInventario/TelaInventario';
import RegistrationProduct from '../../Paginas/CadastroProduto/InserirDados';// Importe a Tela de Cadastro do Produto
import RegisteredProduct from '../../Paginas/CadastroProduto/RegistroConcluido';
import CadastroScreen from '../../Paginas/CadastroPessoas/CadastroPessoas';
import OperadorDashboardScreen from '../../Paginas/TelaInicialOPE/telaInicialOPE';
import CadastroConcluido from '../../Paginas/CadastroPessoas/CadastroConcluido';
import AtualizarADC from '../../Paginas/AtualizarQuantidade/AtualizarADC'
import AtualizarREM from '../../Paginas/AtualizarQuantidade/AtualizarREM'
import Confirmar from '../../Paginas/AtualizarQuantidade/Confirmar'
import ConfirmarREM from '../../Paginas/AtualizarQuantidade/ConfirmarREM'
import ScannerScreen from '../../Paginas/AtualizarQuantidade/ScannerScreen';

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name='SplashScreenComponent' component={SplashScreenComponent} />
        <Stack.Screen name='LoginScreen' component={LoginScreen} />
        <Stack.Screen name='OperadorDashboardScreen' component={OperadorDashboardScreen} />
        <Stack.Screen name="RegistrationProduct" component={RegistrationProduct} />
        <Stack.Screen name="CadastroPessoas" component={CadastroScreen} />
        <Stack.Screen name="CadastroConcluido" component={CadastroConcluido} />
        <Stack.Screen name="RegisteredProduct" component={RegisteredProduct} />
        <Stack.Screen name='TelaInventario' component={TelaInventario} />
        <Stack.Screen name='AtualizarADC' component={AtualizarADC}/>
        <Stack.Screen name='AtualizarREM' component={AtualizarREM}/>
        <Stack.Screen name='Confirmar' component={Confirmar}/>
        <Stack.Screen name='ConfirmarREM' component={ConfirmarREM}/>
        <Stack.Screen name='ScannerScreen' component={ScannerScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
