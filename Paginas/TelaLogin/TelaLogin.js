import * as React from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontSize, Color, FontFamily, Padding } from '../../EstilosGlobais/GlobalStyles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [errorText, setErrorText] = React.useState('');
  const [isLoginFocused, setIsLoginFocused] = React.useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const handleLogin = async () => {
    if (!isValidEmail(email)) {
      setIsEmailValid(false);
      setErrorText('E-mail inválido. Por favor, insira um e-mail válido.');
      return;
    }

    if (!password.trim()) {
      setIsPasswordFocused(true);
      setErrorText('Por favor, digite sua senha.');
      return;
    }

    try {
      const response = await axios.post('http://db-alquimia.mysql.database.azure.com:3000/login', {
        email: email,
        password: password,
        timeout: 15000, // Aumente o tempo limite para 15 segundos (ou o valor desejado)
      });

      if (response.status === 200) {
        // Autenticação bem-sucedida
        const userType = response.data.userType;

        // Verifique o tipo de usuário e navegue para a tela apropriada
        if (userType === 'ADM') {
          storeData('userLogin', {
            email: email,
            password: password,
            userType: userType,
          });
          navigation.navigate('AdministradorDashboardScreen');
        } else if (userType === 'OPE') {
          storeData('userLogin', {
            email: email,
            password: password,
            userType: userType,
          });
          navigation.navigate('OperadorDashboardScreen');
        } else {
          // Tipo de usuário desconhecido
          setErrorText('Tipo de usuário desconhecido');
        }
      } else {
        // Autenticação falhou
        if (response.data.message === 'Senha incorreta') {
          setErrorText('Senha incorreta');
        } else if (response.data.message === 'E-mail não cadastrado') {
          setErrorText('E-mail não cadastrado');
        } else {
          setErrorText('Erro desconhecido');
        }
      }
    } catch (error) {
      console.error('Erro ao fazer a chamada HTTP:', error);
      setErrorText('Houve um erro ao conectar-se ao servidor');
    }
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zAZ.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const handleEmailChange = (text) => {
    if (!isEmailValid) {
      setIsEmailValid(true);
      setErrorText('');
    }
    setEmail(text);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../imagens/logo.png')} style={styles.logo} />
      <Text style={styles.emailContainer}>Email</Text>
      <TextInput
        placeholder="Digite seu e-mail"
        onChangeText={handleEmailChange}
        onFocus={() => setIsLoginFocused(true)}
        onBlur={() => setIsLoginFocused(false)}
        style={[
          styles.input,
          !isEmailValid && styles.errorInput,
          isLoginFocused && styles.focusedInput,
        ]}
      />
      {errorText !== '' && <Text style={styles.errorText}>{errorText}</Text>}
      <Text style={styles.senhaContainer}>Senha</Text>
      <View style={[styles.passwordContainer, isPasswordFocused && styles.focusedInput]}>
        <TextInput
          placeholder="Digite sua senha"
          secureTextEntry={!showPassword}
          onChangeText={(text) => setPassword(text)}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
          style={[styles.input, !isEmailValid && styles.errorInput, isPasswordFocused && styles.focusedInput]}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIconContainer}>
          <Image
            source={showPassword ? require('../../imagens/olho-aberto.png') : require('../../imagens/olho-fechado.png')}
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>
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
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 70,
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    fontFamily: FontFamily.montserratRegular,
    borderColor: '#ccc',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 10,
  },
  eyeIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  loginButton: {
    backgroundColor: '#1A1A27',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
    marginVertical: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  focusedInput: {
    borderColor: 'orange',
  },
  entrarContainer: {
    textAlign: 'left',
    marginBottom: 30,
    fontFamily: FontFamily.montserratRegular,
  },
  emailContainer: {
    fontSize: 10,
    fontFamily: FontFamily.montserratRegular,
  },
  senhaContainer: {
    textAlign: 'left',
    fontSize: 10,
    fontFamily: FontFamily.montserratRegular,
  }
});

export default LoginScreen;
