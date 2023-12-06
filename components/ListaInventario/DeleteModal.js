import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

const DeleteModal = ({ isVisible, product, onDelete, onCancel}) => {
  const handleDelete = async () => {
    await confirmDelete(product);
    onDelete(product);
    onCancel();
    //navigation.navigate('DashBoardScreen');
  };

  const confirmDelete = async (product) => {
    // Lógica para enviar solicitação de exclusão para o servidor
    try {
      const response = await fetch(`http://db-alquimia.mysql.database.azure.com:3000/excluir-produto/${product.ins_id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Produto excluído com sucesso!');
      } else {
        console.error('Erro ao excluir produto:', response.statusText);
        // Trate o erro de acordo com a sua necessidade
      }
    } catch (error) {
      console.error('Erro ao excluir produto:', error.message);
      // Trate o erro de acordo com a sua necessidade
    }
  };

  return (
    <Modal isVisible={isVisible} style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalHeaderText}>Deseja excluir o produto:</Text>
        <Text style={styles.productName}>{product?.ins_nome}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleDelete}>
            <Text style={styles.buttonText}>Sim</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.red]} onPress={onCancel}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
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
  modalHeaderText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1a1a27',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10, // Ajuste o valor conforme necessário
    width: '80%', // Ajuste o valor conforme necessário
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  red: {
    backgroundColor: 'red',
  },
});

export default DeleteModal;