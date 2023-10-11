import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';
// ...

const SplashScreenComponent = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Lugar adicional para acrescentar uma nova lógica
    setTimeout(async () => {
      await SplashScreen.hideAsync();
      navigation.replace('Login'); // Navegue para a tela de login após 2 segundos
    }, 4000);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('./assets/logo.png')} style={styles.logo} />
      <Text style={styles.footerText}>Todos os direitos reservados para Alquimia Indústria</Text>
      <Image source={require('./assets/animacao.gif')} style={styles.loadingGif} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  footerText: {
    marginTop: 10,
    fontSize: 12,
    color: 'gray', // Cor do texto
    marginTop: 20,
  },
  loadingGif: {
    width: 30,
    height: 30,
    marginTop: 80,
  },
});

export default SplashScreenComponent;
