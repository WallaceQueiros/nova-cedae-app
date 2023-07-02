import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import TelaLocalizacao from './src/components/TelaLocalizacao';
import TelaCamera from './src/components/TelaCamera';
import TelaConfirmacao from './src/components/TelaConfirmacao';


const App = () => {
  const [currentScreen, setCurrentScreen] = useState('Localizacao');
  const [notificationData, setNotificationData] = useState({});

  const handleNextScreen = (data) => {
    
    if (currentScreen === 'Localizacao') {
      setNotificationData(data);
      setCurrentScreen('Camera');
    } else if (currentScreen === 'Camera') {
      notificationData.image = data
      setNotificationData(notificationData);
      setCurrentScreen('Confirmacao');
    } else if (currentScreen === 'Confirmacao') {
      setCurrentScreen('Confirmacao');
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Localizacao':
        return <TelaLocalizacao onNext = {handleNextScreen} />;
      case 'Camera':
        return <TelaCamera onNext = {handleNextScreen} />;
      case 'Confirmacao':
        return <TelaConfirmacao dadosLocalizacao={notificationData} />;
      default:
        return null;
    }
  };

  return <View style={styles.container}>{renderScreen()}</View>;
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
});

export default App;
