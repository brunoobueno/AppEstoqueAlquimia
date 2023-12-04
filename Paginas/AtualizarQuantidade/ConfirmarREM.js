import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const SuccessScreen = ({ navigation }) => {
  const handleOkPress = () => {
    // Navegar para a tela "OperadorDashboardScreen"
    navigation.navigate('OperadorDashboardScreen');
  };



  return (
    <View style={styles.container}>
      <Text style={styles.message}>Produto REMOVIDO com sucesso!</Text>
      <TouchableOpacity style={styles.button} onPress={handleOkPress}>
        <Text style={styles.buttonText}>Voltar ao inicio</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1A1A27',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default SuccessScreen;
