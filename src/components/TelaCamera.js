import React, { useState, useRef } from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import TelaConfirmacao from '../components/TelaConfirmacao';
import TelaLocalizacao from './TelaLocalizacao';

const TelaCamera = ({ onNext }) => {
  const [image, setImage] = useState(null);
  const [showGratitude, setShowGratitude] = useState(false);
  const cameraRef = useRef(null);

  const handleCaptureImage = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setImage(data.uri);
    }
  };

  const handleSubmit = () => {
    setShowGratitude(true);
    onNext(image);
  };

  if (showGratitude) {
    return <TelaConfirmacao/>;
  }

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Camera
        style={styles.camera}
        ref={cameraRef}
        type={Camera.Constants.Type.back}
        flashMode={Camera.Constants.FlashMode.off}
        captureAudio={false}
      />
      <TouchableOpacity style={styles.touchTirar} onPress={handleCaptureImage}>
        <Text style={styles.textTirar}>Tirar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.touchEnviar} onPress={handleSubmit} disabled={!image}>
        <Text style={styles.textEnviar}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  camera: {
    width: '100%',
    height: '50%',
    top: 30,
  },

  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    top: 35,
  },

  touchTirar: {
    width: 100,
    height: 100,
    backgroundColor: '#FFA500',
    alignItems: 'center',
    justifyContent: 'center',
    left: 90,
    top: 70,
    borderRadius: 60,
    borderWidth: 2,
  },

  touchEnviar: {
    width: 100,
    height: 100,
    backgroundColor: '#00FFFF',
    alignItems: 'center',
    justifyContent: 'center',
    right: 95,
    top: -30,
    borderRadius: 60,
    borderWidth: 2,
  },

  textTirar: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  
  textEnviar: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default TelaCamera;
