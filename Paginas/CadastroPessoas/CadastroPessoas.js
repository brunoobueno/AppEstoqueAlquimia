import React, { useState } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, Picker, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CadastroScreen = () => {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [errorTextNome, setErrorTextNome] = useState('');
  const [errorTextEmail, setErrorTextEmail] = useState('');
  const [errorTextPassword, setErrorTextPassword] = useState('');
  const [errorTextConfirmPassword, setErrorTextConfirmPassword] = useState('');
  const [errorTextUserType, setErrorTextUserType] = useState('');

  const togglePasswordVisibility = (field) => {
    setShowPassword((prevShowPassword) => ({
      ...prevShowPassword,
      [field]: !prevShowPassword[field],
    }));
  };

 

  const handleCadastro = async () => {
    setErrorTextNome('');
    setErrorTextEmail('');
    setErrorTextPassword('');
    setErrorTextConfirmPassword('');
    setErrorTextUserType('');

    let isValid = true;

    if (nome.trim() === '') {
      setErrorTextNome('Insira um nome por favor.');
      isValid = false;
    }

    if (email.trim() === '') {
      setIsEmailValid(false);
      setErrorTextEmail('Insira um email por favor.');
      isValid = false;
    } else if (!isValidEmail(email)) {
      setIsEmailValid(false);
      setErrorTextEmail('Digite um email válido.');
      isValid = false;
    } else {
      setIsEmailValid(true);
      setErrorTextEmail('');
    }

    if (password.trim() === '') {
      setErrorTextPassword('Digite uma senha.');
      isValid = false;
    }

    if (confirmPassword.trim() === '') {
      setErrorTextConfirmPassword('Confirme sua senha.');
      isValid = false;
    } else if (confirmPassword !== password) {
      setErrorTextConfirmPassword('As senhas não coincidem.');
      isValid = false;
    }

    if (userType.trim() === '') {
      setErrorTextUserType('Selecione o tipo de usuário.');
      isValid = false;
    }

    if (isValid) {
      try {
        const response = await fetch('http://localhost:3000/cadastrar-usuario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome: nome,
            email: email,
            password: password,
            userType: userType,
          }),
        });
  
        const data = await response.json();
  
        if (response.status === 200) {
          console.log('Usuário cadastrado com sucesso!');
          navigation.navigate('AdministradorDashboardScreen');
        } else {
          console.error('Erro ao cadastrar usuário:', data.message);
        }
      } catch (error) {
        console.error('Erro ao realizar a requisição de cadastro:', error);
      }
    }
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const handleEmailChange = (text) => {
    setIsEmailValid(true);
    setErrorTextEmail('');
    setEmail(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CADASTRO</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        placeholder="Digite seu nome"
        onChangeText={(text) => {
          setNome(text);
          setErrorTextNome('');
        }}
        style={styles.input}
      />
      {errorTextNome !== '' && <Text style={styles.errorText}>{errorTextNome}</Text>}

      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Digite seu e-mail"
        onChangeText={(text) => {
          handleEmailChange(text);
          if (text.trim() === '') {
            setErrorTextEmail('Insira um email por favor.');
          } else if (!isValidEmail(text)) {
            setIsEmailValid(false);
            setErrorTextEmail('Digite um email válido.');
          }
        }}
        style={[styles.input, !isEmailValid ? styles.errorInput : null]}
      />
      {!isEmailValid && errorTextEmail !== '' && <Text style={styles.errorText}>{errorTextEmail}</Text>}

      <Text style={styles.label}>Senha</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Digite sua senha"
          secureTextEntry={!showPassword.password}
          onChangeText={(text) => {
            setPassword(text);
            setErrorTextPassword('');
          }}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => togglePasswordVisibility('password')} style={styles.eyeIconContainer}>
          <Image
            source={showPassword.password ? require('../../imagens/olho-aberto.png') : require('../../imagens/olho-fechado.png')}
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>
      {errorTextPassword !== '' && <Text style={styles.errorText}>{errorTextPassword}</Text>}

      <Text style={styles.label}>Confirmar Senha</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Confirme sua senha"
          secureTextEntry={!showPassword.confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            setErrorTextConfirmPassword('');
          }}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => togglePasswordVisibility('confirmPassword')} style={styles.eyeIconContainer}>
          <Image
            source={showPassword.confirmPassword ? require('../../imagens/olho-aberto.png') : require('../../imagens/olho-fechado.png')}
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>
      {errorTextConfirmPassword !== '' && <Text style={styles.errorText}>{errorTextConfirmPassword}</Text>}

      <Text style={styles.label}>Tipo de Usuário</Text>
      <Picker
        selectedValue={userType}
        onValueChange={(itemValue) => {
          setUserType(itemValue);
          setErrorTextUserType('');
        }}
        style={styles.input}
      >
        <Picker.Item label="Selecione o tipo de usuário" value="" />
        <Picker.Item label="Operador" value="OPE" />
        <Picker.Item label="Administrador" value="ADM" />
      </Picker>
      {errorTextUserType !== '' && <Text style={styles.errorText}>{errorTextUserType}</Text>}

      <TouchableOpacity onPress={handleCadastro} style={styles.button}>
        <Text style={styles.buttonText}>Cadastrar</Text>
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
    marginBottom: 30,
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
  title: {
    fontSize: 25,
    fontWeight: 'Montserrat-Regular',
    color: 'black',
    padding: 10,
    marginBottom: 20,
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
  button: {
    backgroundColor: '#1A1A27',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'Montserrat-Regular',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 15,
    marginTop: -5,
    marginVertical: 10,
  },
  label: {
    marginVertical: 2,
    fontSize: 15,
    fontFamily: 'Montserrat-Regular',
  },
  Picker: {
    fontSize: 15,
    fontFamily: 'Montserrat-Regular',
  },
});

export default CadastroScreen;
