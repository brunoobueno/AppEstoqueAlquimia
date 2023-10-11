import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Navigation'; // Importe o componente de navegação


export default function App() {
  return (
<View style={{ flex: 1 }}>
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
