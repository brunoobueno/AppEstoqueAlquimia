import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

const AtualizarADC = ({ route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState('');
  const [quantityProduct, setQuantityProduct] = useState('');
  const navigation = useNavigation();

  const { insNome, insMedida, insId } = route.params || {};

  const handleGoBack = () => {
    navigation.goBack();
    return true;
  };

  const handleAdd = () => {
    // Verifique se há erros antes de abrir o modal
    if (!error) {
      setModalVisible(true); // Mostrar modal para confirmação
    }
  };

  const confirmarAdicao = async () => {
    try {
      setModalVisible(false); // Ocultar modal após a confirmação

      const response = await axios.put(`http://db-alquimia.mysql.database.azure.com:3000/adicionar-quantidade/${insId}`, {
        quantidade: parseInt(quantityProduct),
      });

      if (response.status === 200) {
        console.log('Quantidade adicionada com sucesso:', response.data.novaQuantidade);
        navigation.navigate('Confirmar', {
          // Passe quaisquer parâmetros necessários para a próxima página
        });
      } else {
        console.error('Erro ao adicionar quantidade:', response.data.message);
      }
    } catch (error) {
      console.error('Erro na solicitação para adicionar quantidade:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Icon
        name="arrow-left"
        size={24}
        color="#1A1A27"
        style={styles.backIcon}
        onPress={handleGoBack}
      />

      <Text style={styles.title}>Digite a Quantidade que Deseja Adicionar ao Produto:</Text>
      <Text style={styles.title1}>{insNome}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, styles.quantityInput, error ? styles.errorInput : null]}
          placeholder="Digite a quantidade"
          onChangeText={(text) => setQuantityProduct(text.replace(/[^0-9]/g, ''))}
          value={quantityProduct}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, styles.unidadeMedidaInput]}
          value={insMedida}
          editable={false}
        />
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAdd}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleGoBack}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Deseja realmente Adicionar?</Text>

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={confirmarAdicao} 
              >
                <Text style={styles.modalButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  title1: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 40,
    color: 'green',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    width: 150,
    marginRight: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  quantityInput: {},
  unidadeMedidaInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    width: 60,
    marginLeft: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#1A1A27',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    width: 100,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    marginBottom: 10,
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalContent: {
    padding: 20,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#1A1A27',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    backgroundColor: '#1A1A27',
    padding: 10,
    borderRadius: 5,
    width: 100,
  },
  modalButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  backIcon: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
});

export default AtualizarADC;