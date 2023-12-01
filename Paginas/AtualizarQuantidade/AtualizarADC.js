import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet, Modal,} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const App = () => {
  const [quantityProduct, setQuantityProduct] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('kg');
  const [modalVisible, setModalVisible] = useState(false);

  const handleSaveButtonPress = () => {
    setModalVisible(true);
  };

  const handleModalButton1Press = () => {
    setModalVisible(false);
  };

  const handleModalButton2Press = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Digite quanto quer adicionar de ...</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, styles.quantityInput]}
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

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSaveButtonPress}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSaveButtonPress}>
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
              Deseja realmente cadastrar?
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
                <Text style={styles.modalButtonText}>Adicionar</Text>
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
});

export default App;
