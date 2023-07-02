import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

const TelaConfirmacao = ({dadosLocalizacao}) => {

  console.log(dadosLocalizacao)
  console.log('Nome: Gabriel Gomes Flôr Frederico \n Matrícula: 202011021')
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Obrigado pela sua foto!!!</Text>
      <Text style={styles.text}>Agradecemos sua colaboração.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000'
  },
});

export default TelaConfirmacao;
