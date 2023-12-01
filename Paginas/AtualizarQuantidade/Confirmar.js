// Status.js
import React from 'react';
import { View, Text } from 'react-native';

const Status = ({ route }) => {
  const { mensagem } = route.params;

  return (
    <View>
      <Text>{mensagem}</Text>
    </View>
  );
};

export default Status;
