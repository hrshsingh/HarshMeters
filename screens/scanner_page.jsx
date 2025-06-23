// ScannerPage.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import useCameraPermission from '../component/useCameraPermission';

const ScannerPage = () => {
  const [scanned, setScanned] = useState(false);
  const hasPermission = useCameraPermission();

  const handleQRCodeRead = (e) => {
    if (!scanned) {
      setScanned(true);
      Alert.alert('QR Code Scanned', e.data, [
        { text: 'OK', onPress: () => setScanned(false) },
      ]);
    }
  };

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Requesting camera permission...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.camera}
        onBarCodeRead={handleQRCodeRead}
        captureAudio={false}
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
      >
        <View style={styles.overlay}>
          <Text style={styles.text}>Align the QR code within the frame</Text>
        </View>
      </RNCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,
  },
});

export default ScannerPage;
