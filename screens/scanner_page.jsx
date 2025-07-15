import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Linking, Platform, AppState, TextInput } from 'react-native';
// Ensure you are using V4 imports (which you are)
import { Camera, useCameraDevices, CameraPermissionStatus, useCodeScanner } from 'react-native-vision-camera';
import { useIsFocused } from '@react-navigation/native';
import { useRideContext } from '../routeConfig/rideContext';
import QRCode from 'react-native-qrcode-svg'; // You'll need to install this: npm install react-native-qrcode-svg
import { useAuth } from '../routeConfig/authContext';

const MinimalCameraScreen = ({ navigation }) => {
  const [cameraPermissionStatus, setCameraPermissionStatus] = useState('not-determined');
  const [microphonePermissionStatus, setMicrophonePermissionStatus] = useState('not-determined');
  const [showCamera, setShowCamera] = useState(false);
  const [mode, setMode] = useState('scanner'); // 'scanner' or 'generator'
  const [qrText, setQrText] = useState('');
  const isFocused = useIsFocused();
  const { isScanned } = useRideContext();
  const { user } = useAuth();


  // ------------------------------------------------------
  // THIS IS THE KEY HOOK
  // If this returns empty, it's usually an emulator/simulator issue.
  const devices = useCameraDevices();
  const backCamera = devices[0];
  // ------------------------------------------------------

  const [lastScannedCode, setLastScannedCode] = useState(null);

  // --- QR Scan Handler (Using the hook approach recommended in V4) ---
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      if (codes.length > 0) {
        const scannedData = codes[0].value;
        console.log('QR Scanned (Vision Camera):', scannedData);

        setLastScannedCode(scannedData);
        // Temporarily stop the camera while the alert is shown
        setShowCamera(false);

        if (scannedData && (scannedData.startsWith('http://') || scannedData.startsWith('https://'))) {
          Linking.openURL(scannedData).catch(() => {
            Alert.alert('Invalid Link', `Could not open: ${scannedData}`, [
              { text: 'OK', onPress: () => setShowCamera(true) }, // Re-enable on close
            ]);
          });
        } else {
          Alert.alert('Done', `Code: ${scannedData}`, [
            { text: 'OK', onPress: () => setShowCamera(true) }, // Re-enable on close
          ]);
          isScanned(scannedData)
          setTimeout(() => {
            navigation.navigate('ridestart');
          }, 300);
          // navigation.navigate('Home');
        }
      }
    },
  })

  // --- Permission Request Logic ---
  useEffect(() => {
    async function getPermissions() {
      console.log('useEffect: Requesting initial permissions...');
      const cameraStatus = await Camera.requestCameraPermission();
      setCameraPermissionStatus(cameraStatus);
      console.log('Initial Camera Permission Status:', cameraStatus);
    }

    getPermissions();

    // Handle permission changes made in OS settings while the app was backgrounded
    const subscription = AppState.addEventListener('change', async (nextAppState) => {
      if (nextAppState === 'active') {
        console.log('App foregrounded. Re-checking permissions...');
        const currentCameraStatus = await Camera.getCameraPermissionStatus();
        setCameraPermissionStatus(currentCameraStatus);
      }
    });

    return () => {
      subscription.remove();
    };

  }, []);

  // --- Camera Activation Logic ---
  useEffect(() => {
    console.log('DIAGNOSTIC: All available devices from hook:', JSON.stringify(devices, null, 2));
    console.log('useEffect (Activation Check): isFocused =', isFocused, 'Permission =', cameraPermissionStatus);
    console.log('Back Camera Device:', backCamera ? 'Found' : 'Not Found');

    if (isFocused && cameraPermissionStatus === 'granted' && backCamera != null && mode === 'scanner') {
      console.log('Conditions met. Activating camera.');
      setShowCamera(true);
    } else {
      console.log('Conditions not met. Deactivating camera or waiting.');
      setShowCamera(false);
    }
  }, [isFocused, cameraPermissionStatus, backCamera, devices, mode]);

  // --- Mode Switch Handler ---
  const switchMode = () => {
    const newMode = mode === 'scanner' ? 'generator' : 'scanner';
    setMode(newMode);
    setShowCamera(false); // Reset camera state when switching modes
  };

  // --- QR Generator Component ---
  const renderQRGenerator = () => (
    <View style={styles.container}>
      <Text style={styles.title}>QR Generator</Text>

      {/* <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter text to generate QR code"
          placeholderTextColor="#888"
          value={qrText}
          onChangeText={setQrText}
          multiline
          numberOfLines={3}
        />
      </View> */}

      {user?.uid.length > 0 && (
        <View style={styles.qrContainer}>
          <QRCode
            value={user?.uid}
            size={200}
            color="#000"
            backgroundColor="#fff"
          />
          <Text style={styles.user?.uid}>QR Code for: {user?.uid}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.switchButton} onPress={switchMode}>
        <Text style={styles.switchButtonText}>📱 Switch to Scanner</Text>
      </TouchableOpacity>
    </View>
  );

  // --- Render Permission Request UI ---
  const renderPermissionRequest = () => (
    <View style={styles.container}>
      <Text style={styles.title}>Camera Permission Required</Text>
      <Text style={styles.permissionText}>
        Status: {cameraPermissionStatus}
      </Text>

      <Text style={styles.permissionText}>
        Back Camera Device: {backCamera ? 'Found' : 'Not Found (Check emulator/simulator config)'}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          const newStatus = await Camera.requestCameraPermission();
          setCameraPermissionStatus(newStatus);
        }}>
        <Text style={styles.buttonText}>Grant Camera Permission</Text>
      </TouchableOpacity>

      {cameraPermissionStatus === 'denied' && (
        <TouchableOpacity onPress={() => Linking.openSettings()}>
          <Text style={styles.permissionTextWarn}>
            Permission denied. Tap here to open settings and enable camera access.
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.switchButton} onPress={switchMode}>
        <Text style={styles.switchButtonText}>📝 Switch to Generator</Text>
      </TouchableOpacity>
    </View>
  );

  // --- Main Render Logic ---

  // If in generator mode, show QR generator
  if (mode === 'generator') {
    return renderQRGenerator();
  }

  // Scanner mode logic continues...
  // 1. Check Permissions
  if (cameraPermissionStatus !== 'granted') {
    console.log('Rendering Permission Request UI...');
    return renderPermissionRequest();
  }

  // 2. Check Device Availability
  if (!backCamera) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>No Back Camera Found</Text>
        <Text style={styles.permissionText}>Ensure your Android emulator has a camera configured or that you are using a physical iOS device.</Text>
        <TouchableOpacity style={styles.switchButton} onPress={switchMode}>
          <Text style={styles.switchButtonText}>📝 Switch to Generator</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 3. Wait for Activation (isFocused)
  if (!showCamera) {
    console.log('Rendering Loading UI (waiting for focus/activation)...');
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Initializing camera...</Text>
        <TouchableOpacity style={styles.switchButton} onPress={switchMode}>
          <Text style={styles.switchButtonText}>📝 Switch to Generator</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 4. Render Camera Scanner
  console.log('Rendering Camera UI...');
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>QR Scanner</Text>
        <TouchableOpacity style={styles.miniSwitchButton} onPress={switchMode}>
          <Text style={styles.miniSwitchButtonText}>📝</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cameraContainer}>
        <Camera
          style={StyleSheet.absoluteFill}
          device={backCamera}
          isActive={isFocused && showCamera}
          photo={false}
          audio={false}
          codeScanner={codeScanner}
          onError={(error) => {
            console.error('Vision Camera Error:', error);
            Alert.alert('Camera Error', error.message || 'An unknown camera error occurred.');
          }}
        />
      </View>

      {lastScannedCode && (
        <Text style={styles.scannedText}>Last Scanned: {lastScannedCode}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a23',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
  },
  miniSwitchButton: {
    backgroundColor: '#1c1c40',
    padding: 8,
    borderRadius: 8,
    borderColor: '#2680eb',
    borderWidth: 1,
  },
  miniSwitchButtonText: {
    fontSize: 16,
    color: '#2680eb',
  },
  switchButton: {
    backgroundColor: '#1c1c40',
    padding: 12,
    borderRadius: 12,
    marginTop: 20,
    borderColor: '#2680eb',
    borderWidth: 1.5,
    minWidth: 180,
    alignItems: 'center',
  },
  switchButtonText: {
    color: '#2680eb',
    fontSize: 16,
    fontWeight: '600',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: '#1c1c40',
    color: '#fff',
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    borderColor: '#2680eb',
    borderWidth: 1,
    textAlignVertical: 'top',
    minHeight: 80,
  },
  qrContainer: {
    alignItems: 'center',
    marginVertical: 20,
    padding: 20,
    backgroundColor: '#1c1c40',
    borderRadius: 12,
    borderColor: '#2680eb',
    borderWidth: 1,
  },
  qrText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
    maxWidth: 200,
  },
  permissionText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  permissionTextWarn: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  button: {
    width: '80%',
    backgroundColor: '#1c1c40',
    padding: 15,
    borderRadius: 12,
    marginVertical: 10,
    alignItems: 'center',
    borderColor: '#2680eb',
    borderWidth: 1.5,
  },
  buttonText: {
    color: '#2680eb',
    fontSize: 18,
    fontWeight: '600',
  },
  cameraContainer: {
    width: '100%',
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#222',
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0a0a23',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 15,
  },
  scannedText: {
    color: '#0cf',
    marginTop: 10,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default MinimalCameraScreen;