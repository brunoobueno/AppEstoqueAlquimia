import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Color, FontFamily, FontSize } from '../../EstilosGlobais/GlobalStyles';
import md5 from 'md5';


const SplashScreenComponent = () => {

  const navigation = useNavigation();

  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {

    const isValidEmail = (email) => {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zAZ.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(email);
    };

    const getLogin = async () => {
      return await getData('userLogin');
    }

    const authOrApp = async () => {
      const getLoginObj = await getLogin();
      if (getLoginObj == null) {
        setTimeout(async () => {
          await SplashScreen.hideAsync();
          navigation.replace('LoginScreen'); // Navegue para a tela de login após 2 segundos
        }, 2000);
      } else {
        if (!isValidEmail(getLoginObj.email)) {
          console.log('E-mail inválido. Por favor, insira um e-mail válido.');
          return;
        }

        try {

          const response = await axios.post('http://db-alquimia.mysql.database.azure.com:3000/login', {
            email: getLoginObj.email,
            password: getLoginObj.password,
          });

          if (response.status === 200) {
            // Autenticação bem-sucedida
            const userType = response.data.userType;

            // Verifique o tipo de usuário e navegue para a tela apropriada
            if (userType === 'ADM') {
              navigation.navigate('AdministradorDashboardScreen');
            } else if (userType === 'OPE') {
              navigation.navigate('OperadorDashboardScreen');
            } else {
              // Tipo de usuário desconhecido
              console.log('Tipo de usuário desconhecido');
            }
          } else {
            // Autenticação falhou
            if (response.data.message === 'Senha incorreta') {
              console.log('Senha incorreta');
            } else if (response.data.message === 'E-mail não cadastrado') {
              console.log('E-mail não cadastrado');
            } else {
              console.log('Erro desconhecido');
            }
          }
        } catch (error) {
          console.error('Erro ao fazer a chamada HTTP:', error);
          console.log('Houve um erro ao conectar-se ao servidor');
        }
      }
    }
    authOrApp()
  }, []);

  return (
    <View style={styles.splashScreen}>
      <View style={styles.centered}>
        <Image
          style={styles.logoIcon}
          contentFit="cover"
          source={require('../../imagens/logo-branca.png')}
        />
      </View>

      <View style={styles.centered}>
        <Image
          style={styles.loadingGif}
          source={require('../../imagens/animacao.gif')} // Substitua com o caminho do seu gif
        />
      </View>

      <View style={styles.centered}>
        <Text style={styles.textTypo}>
          {`desenvolvido`}
        </Text>
        <Text style={styles.textTypo}>
          {`SPECTRUM SOLUTIONS`}
        </Text>
        <Text style={styles.textTypo}>
          {`© 2023 alquimia indústria. Todos os direitos reservados.`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  splashScreen: {
    flex: 1,
    backgroundColor: '#1a1a27',
    justifyContent: 'space-around',
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTypo: {
    color: Color.colorWhite,
    fontFamily: FontFamily.montserratRegular,
    textAlign: 'center',
    fontSize: FontSize.size_xs,
    marginVertical: 2, // Ajuste o espaçamento vertical entre os textos
  },
  logoIcon: {
    width: 151,
    height: 151,
    marginTop: 200,
  },
  loadingGif: {
    width: 80,
    height: 80,
  },
});
export default SplashScreenComponent;
