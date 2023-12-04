import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, useWindowDimensions } from 'react-native';
import Modal from 'react-native-modal';
import ConfirmationModal from './ConfirmationModal';

const EditQuantityModal = ({ isVisible, product, onCancel, onConfirm }) => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';
  const [newQuantity, setNewQuantity] = useState('');
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);

  const handleConfirm = () => {
    // Fechar o modal atual
    setConfirmationModalVisible(false);
  };

  const handleCancel = () => {
    // Fechar o modal de confirmação
    setConfirmationModalVisible(false);

    // Fechar o modal atual
    onCancel();
  };

  const handleConfirmation = () => {
    // Fechar o modal de confirmação
    setConfirmationModalVisible(false);

    // Aplicar as alterações
    onConfirm(newQuantity);
  };

  if (!product) {
    return null;
  }

  return (
    <>
      <Modal isVisible={isVisible} style={[styles.modalContainer, isMobile && styles.mobileModal]}>
        <View style={[styles.modalContent, isMobile && styles.mobileModalContent]}>
          <View style={styles.header}>
            <Text style={styles.modalTitle}>{`Editar Produto - ${product.ins_nome}`}</Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoTitle}>Quantidade Real:</Text>
            <TextInput
              style={styles.input}
              placeholder="Quantidade"
              keyboardType="numeric"
              value={newQuantity}
              onChangeText={(text) => setNewQuantity(text)}
            />
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoTitle}>Unidade de Medida:</Text>
            <View style={styles.borderedTextContainer}>
              <Text style={styles.borderedText}>{product.ins_medida}</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setConfirmationModalVisible(true)}>
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de Confirmação */}
      <ConfirmationModal
        isVisible={confirmationModalVisible}
        onCancel={handleCancel}
        onConfirm={handleConfirmation}
      />
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: 400,
  },
  mobileModal: {
    width: '90%',
  },
  mobileModalContent: {
    height: '30%',
  },
  header: {
    backgroundColor: '#1a1a27',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  infoColumn: {
    flex: 1,
    marginBottom: 10,
  },
  infoTitle: {
    fontWeight: 'bold',
    margin: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#1a1a27',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '45%',
  },
  cancelButton: {
    backgroundColor: 'gray',
  },
  borderedTextContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 5,
    backgroundColor: '#f0eded',
  },
  borderedText: {
    height: 40,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Estilos para o Modal de Confirmação
  confirmationText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },
  smallText: {
    fontSize: 12,
    textAlign: 'center',
    color: 'gray',
  },
});

export default EditQuantityModal;
