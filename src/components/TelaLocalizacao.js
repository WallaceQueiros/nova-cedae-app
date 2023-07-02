import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import * as Location from 'expo-location';

const TelaLocalizacao = ({ onNext }) => {
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [rua, setRua] = useState('');
  const [numeroCasa, setNumeroCasa] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dadosLocalizacao, setDadosLocalizacao] = useState({});

  const cidades = [
    'Vassouras',
    'Barra do Piraí',
    'Mendes',
    'Três Rios',
    'Paraíba do Sul',
    'Miguel Pereira',
    'Valença',
    'Rio das Flores'
  ];

  const handleCidadeChange = (value) => {
    setCidade(value);
  };

  
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Acesso a localização negada!!');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const handleNextScreen = () => {
    const dadosLocalizacao = {
      cidade,
      bairro,
      rua,
      numeroCasa,
      descricao,
    };
  
    setDadosLocalizacao(dadosLocalizacao);
    onNext(dadosLocalizacao); 
  };


  return (
    <View style={styles.container}>

       <TouchableWithoutFeedback style = {styles.bordaCidade}>
          <View style = { styles.ViewBorda}></View>
        </TouchableWithoutFeedback>
      
        <Picker
          selectedValue={cidade}
          onValueChange={handleCidadeChange}
          style={styles.picker}
        >
          <Picker.Item label="Selecione sua cidade" value="" />
          {cidades.map((cidadeName, index) => (
            <Picker.Item label={cidadeName} value={cidadeName} key={index} />
          ))}
        </Picker>
        <Text style = {styles.text}>Informe a Cidade</Text>

      <Text style = {styles.textBairro}>Informe o Bairro</Text>
      <TextInput
        style={styles.input1}
        value={bairro}
        onChangeText={setBairro}
      />

      <Text style = {styles.textRua}>Informe a Rua</Text>
      <TextInput
        style={styles.input2}
        value={rua}
        onChangeText={setRua}
      />

      <Text style = {styles.textNumero}>Informe o Número</Text>
      <TextInput
        style={styles.input3}
        value={numeroCasa}
        onChangeText={setNumeroCasa}
        keyboardType='numeric'
      />

      <Text style = {styles.textDescricao}>Descrição</Text>
      <TextInput
        style={styles.input4}
        value={descricao}
        onChangeText={setDescricao}
      />
      <TouchableOpacity
        style = {styles.touchNotificar}
        onPress={handleNextScreen}
        disabled={!cidade || !bairro || !rua || !numeroCasa}
      ><Text style = {styles.textNotificar}>Notificar</Text></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  bordaCidade: {
    borderWidth: 2
  },

  input1: {
    width: '90.5%',
    height: 55,
    marginVertical: 10,
    backgroundColor: '#FFFFFF',
    top: -3,
    borderColor: '#000000',
    borderWidth: 2,
    fontSize: 17,
    textAlign: 'center',
  },

  input2: {
    width: '90.5%',
    height: 55,
    marginVertical: 10,
    backgroundColor: '#FFFFFF',
    top: 10,
    borderColor: '#000000',
    borderWidth: 2,
    textAlign: 'center',
    fontSize: 17
  },

  input3: {
    width: '90.5%',
    height: 55,
    marginVertical: 10,
    backgroundColor: '#FFFFFF',
    top: 20,
    borderColor: '#000000',
    borderWidth: 2,
    fontSize: 17,
    textAlign: 'center',
  },

  input4: {
    width: '90%',
    height: 120,
    marginVertical: 10,
    backgroundColor: '#FFFFFF',
    top: 30,
    borderColor: '#000000',
    borderWidth: 2,
    fontSize: 17,
    textAlign: 'center',
  },

  text: {
    top: -103,
    right: 70,
    fontSize: 25,
    fontWeight: 'bold'
  },

  textBairro: {
    top: -5,
    right: 74,
    fontSize: 25,
    fontWeight: 'bold'
  },

  textRua: {
    top: 3,
    right: 86,
    fontSize: 25,
    fontWeight: 'bold'
  },

  textNumero: {
    top: 15,
    right: 62,
    fontSize: 25,
    fontWeight: 'bold'
  },

  textDescricao: {
    top: 26,
    right: 109,
    fontSize: 25,
    fontWeight: 'bold'
  },

  textNotificar: {
    fontWeight: 'bold',
    fontSize: 20,
  },

  picker: {
    width: 366,
    height: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    top: 14  
  },

  touchNotificar: {
    width: 160,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#B0E0E6',
    alignItems: 'center',
    justifyContent: 'center',
    top: 60,
    borderWidth: 2,
    borderColor: '#000000'
  },

  ViewBorda: {
    width: '90%',
    height: 59,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    top: 70
  }

});

export default TelaLocalizacao;
