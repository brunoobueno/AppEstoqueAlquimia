import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

const ConfirmationModal = ({ isVisible, onCancel, onConfirm }) => {
  return (
    <Modal isVisible={isVisible} style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <View style={styles.header}>
          <Text style={styles.modalTitle}>Confirmação</Text>
        </View>
        <View style={styles.infoColumn}>
          <Text style={styles.confirmationText}>Deseja aplicar essa configuração?</Text>
          <Text style={styles.smallText}>(A ação não poderá ser desfeita)</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
            <Text style={styles.buttonText}>Não</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onConfirm}>
            <Text style={styles.buttonText}>Sim</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // restante dos estilos
});

export default ConfirmationModal;