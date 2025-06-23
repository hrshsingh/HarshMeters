// useCameraPermission.js
import { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform, Alert } from 'react-native';

const UseCameraPermission = () => {
  const [hasPermission, setHasPermission] = useState(false);

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'We need access to your camera to scan QR codes',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setHasPermission(true);
        } else {
          setHasPermission(false);
          Alert.alert('Permission Denied', 'Camera permission is required.');
        }
      } catch (err) {
        console.warn('Camera permission error:', err);
      }
    } else {
      // iOS or other platforms
      setHasPermission(true);
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return hasPermission;
};

export default UseCameraPermission;
