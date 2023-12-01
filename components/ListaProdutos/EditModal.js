import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, useWindowDimensions } from 'react-native';
import moment from 'moment';
import Modal from 'react-native-modal';
import DeleteModal from './DeleteModal';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';


const EditModal = ({ isVisible, selectedProduct, onSave, onCancel, chamarModalDelete }) => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';
  const [editedProduct, setEditedProduct] = useState({
    ins_id: null, // Adicione o ins_id ao estado
    ins_nome: '',
    ins_quantidade: 0,
    ins_medida: '',
    ins_cadastro: '',
  });

  const [selectedProductForDeletion, setSelectedProductForDeletion] = useState(null);
  // Adicione o estado para controlar o erro
  const [nomeProdutoError, setNomeProdutoError] = useState('');

  useEffect(() => {
    if (selectedProduct) {
      setEditedProduct({
        ins_id: selectedProduct.ins_id, // Certifique-se de adicionar o ins_id
        ins_nome: selectedProduct.ins_nome,
        ins_quantidade: selectedProduct.ins_quantidade,
        ins_medida: selectedProduct.ins_medida,
        ins_cadastro: moment(selectedProduct.ins_cadastro).format('DD/MM/YYYY'), // Adicione a formatação da data de cadastro
      });
    }
  }, [selectedProduct]);

  const handleSave = () => {
    if (editedProduct.ins_nome == "") {
      setNomeProdutoError('Por favor, insira o nome do produto!');
    } else {
      setNomeProdutoError('');
      if (editedProduct.ins_medida === "") {
        editedProduct.ins_medida = "Indefinido";
      }
      if (editedProduct.ins_id != undefined) {
        // Execute a lógica de validação, se necessário
        onSave(editedProduct);
        setIsModalVisible(false);
      } else {
        console.error('ID do produto não definido ao salvar.');
      }
    }

  };

  const handleTeste = () => {
    chamarModalDelete(selectedProduct);
    onCancel();
  }


  return (
    <Modal isVisible={isVisible} style={[styles.modalContainer, isMobile && styles.mobileModal]}>
      <View style={[styles.modalContent, isMobile && styles.mobileModalContent]}>
        <View style={styles.header}>
          <Text style={styles.modalTitle}>Editar Produto</Text>
        </View>
        <View style={styles.infoColumn}>
          <Text style={styles.infoTitle}>ID do Produto:</Text>
          <View style={styles.borderedTextContainer}>
            <Text style={styles.borderedText}>{editedProduct?.ins_id}</Text>
          </View>

          <View style={styles.infoColumn}>
            <Text style={styles.infoTitle}>Nome do Produto:</Text>
            <TextInput
              style={styles.input}
              value={editedProduct?.ins_nome}
              onChangeText={(text) => {
                setNomeProdutoError('');
                setEditedProduct({ ...editedProduct, ins_nome: text });
              }}
            />
            {editedProduct.ins_nome == "" && (
            <Text style={styles.errorMessage}>{nomeProdutoError}</Text>
            )}
          </View>

          <View style={styles.infoColumn}>
            <Text style={styles.infoTitle}>Quantidade:</Text>
            <TextInput
              style={styles.input}
              value={editedProduct?.ins_quantidade.toString()}
              onChangeText={(text) => setEditedProduct({ ...editedProduct, ins_quantidade: Number(text) })}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.infoColumn}>
            <Text style={styles.infoTitle}>Unidade de Medida:</Text>
            <TextInput
              style={styles.input}
              value={editedProduct?.ins_medida}
              onChangeText={(text) => setEditedProduct({ ...editedProduct, ins_medida: text })}
            />
          </View>

          <View style={styles.infoColumn}>
            <Text style={styles.infoTitle}>Data de Cadastro:</Text>
            <View style={styles.borderedTextContainer}>
              <Text style={styles.borderedText}>{editedProduct?.ins_cadastro}</Text>
            </View>
          </View>
        </View>


        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onCancel}>
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
  mobileModal: {
    width: '90%', // Ajuste o valor conforme necessário
  },
  mobileModalContent: {
    height: '60%', // Ajuste o valor conforme necessário
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
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoColumn: {
    flex: 1,
    marginRight: 10,
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
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1a1a27',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  borderedTextContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 5,
    backgroundColor: '#f0eded', // Adicione a cor cinza de fundo
  },
  borderedText: {
    height: 40,
  },
  red: {
    backgroundColor: 'red',
  },
  errorMessage: {
    color: 'red',
  }

});

export default EditModal;