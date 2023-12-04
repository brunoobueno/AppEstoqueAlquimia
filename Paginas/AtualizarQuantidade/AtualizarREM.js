import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';


const App = () => {
  const [quantityProduct, setQuantityProduct] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('kg');
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
    return true;
  };

  const handleSaveButtonPress = () => {
    console.log('handleSaveButtonPress');
    if (!quantityProduct.trim()) {
      setError('Campo obrigatório');
    } else {
      setError('');
      console.log('Before setting modal visible');
      setModalVisible(true);
    }
  };

  const handleCancelButtonPress = () => {
    console.log('handleCancelButtonPress');
    setModalVisible(false);
    // Navegar de volta à página anterior
    navigation.goBack();
  };

  const handleModalButton1Press = () => {
    setModalVisible(false);
  };

  const handleModalButton2Press = () => {  
    setModalVisible(false);
    navigation.navigate('ConfirmarREM');
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
      <Text style={styles.title}>Digite quanto quer Remover de ...</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, styles.quantityInput, error ? styles.errorInput : null]}
          placeholder="Digite a quantidade"
          onChangeText={(text) => setQuantityProduct(text.replace(/[^0-9]/g, ''))}
          value={quantityProduct}
          keyboardType="numeric"
        />

        <RNPickerSelect
          style={pickerSelectStyles}
          value={selectedUnit}
          onValueChange={(itemValue) => setSelectedUnit(itemValue)}
          items={[
            { label: 'kg', value: 'kg' },
            { label: 'g', value: 'g' },
            // Adicione outras unidades conforme necessário
          ]}
        />
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSaveButtonPress}>
          <Text style={styles.buttonText}>Remover</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleCancelButtonPress}>
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
            <Text style={styles.modalText}>
              Deseja realmente Remover QTD?
            </Text>

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleModalButton1Press}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleModalButton2Press}
              >
                <Text style={styles.modalButtonText}>Remover</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    width: 80,
    marginRight: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  inputAndroid: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    width: 80,
    marginRight: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
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
    width: 200,
    marginRight: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  quantityInput: {},
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#1A1A27',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
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
    left: 80,
    zIndex: 1,
  },
});

export default App;
