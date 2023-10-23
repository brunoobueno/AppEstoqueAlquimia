import * as React from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontSize, Color, FontFamily, Padding } from './GlobalStyles';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


const LoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [errorText, setErrorText] = React.useState('');

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
          setErrorText1('Senha incorreta');
        } else if (response.data.message === 'E-mail não cadastrado') {
          setErrorText2('E-mail não cadastrado');
        } else {
          setErrorText3('Erro desconhecido');
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
      <Image source={require('./assets/logo.png')} style={styles.logo} />
      <Text style={styles.emailContainer}>Email</Text>
      <TextInput
        placeholder="Digite seu e-mail"
        onChangeText={handleEmailChange}
        style={[styles.input, !isEmailValid ? styles.errorInput : null]}
      />
      {errorText !== '' && <Text style={styles.errorText}>{errorText}</Text>}
      <Text style={styles.senhaContainer}>Senha</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Digite sua senha"
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
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 70,
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    fontFamily: FontFamily.montserratRegular,
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
