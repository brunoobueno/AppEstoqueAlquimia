import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importe useNavigation
import axios from 'axios';


const LoginScreen = () => {

  const navigation = useNavigation(); // Inicialize o objeto de navegação

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [errorText, setErrorText] = useState('');


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (!isValidEmail(email)) {
      setIsEmailValid(false);
      setErrorText('E-mail inválido. Por favor, insira um e-mail válido.');
      return;
    }
    try {
      const response = await axios.post('http://192.168.1.9:3000/login', {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        // Autenticação bem-sucedida
        navigation.navigate('OperatorDashboard');
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
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
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
      <Image source={require('./assets/logo.png')} style={styles.logo} />

      <TextInput
        placeholder="E-mail"
        onChangeText={handleEmailChange}
        style={[styles.input, !isEmailValid ? styles.errorInput : null]}
      />

      {errorText !== '' && <Text style={styles.errorText}>{errorText}</Text>}

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Senha"
          secureTextEntry={!showPassword}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIconContainer}>
          <Image
            source={showPassword ? require('./assets/olho-aberto.png') : require('./assets/olho-fechado.png')}
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
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
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
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
    marginTop: 5, // Espaço para evitar sobreposição com outros elementos
  },
});

export default LoginScreen;