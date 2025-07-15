import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const AllowLocation = ({ navigation }) => {
  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'App needs access to your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true; // iOS auto handles it
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const handleGetStarted = async () => {
    const hasPermission = await requestLocationPermission();

    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Location permission is required to proceed.');
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        console.log('User Location:', position);

        // Optionally save location to state, context, or Firebase here

        navigation.navigate('login'); // ✅ Go to login after allowing location
      },
      (error) => {
        let message = 'Failed to fetch location';
        if (error && error.code) {
          switch (error.code) {
            case 1:
              message = 'Permission denied. Please enable location permissions.';
              break;
            case 2:
              message = 'Location unavailable. Please check your device settings.';
              break;
            case 3:
              message = 'Location request timed out. Try again.';
              break;
            default:
              message = error.message || message;
          }
        }
        console.error(error);
        Alert.alert('Location Error', message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 10000,
      },
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperitem}>
        <Image style={styles.itemimage} source={require('../assets/Splash5.png')} />
        <Text style={styles.smalltext}>Don't worry your data is private</Text>
      </View>
      <View style={styles.loweritem}>
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Allow Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AllowLocation;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'space-between', alignItems: 'center', margin: 30 },
  upperitem: { justifyContent: 'center', alignItems: 'center', paddingTop: 40 },
  smalltext: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', color: '#525252' },
  itemimage: { alignItems: 'center', marginVertical: 25 },
  loweritem: { marginBottom: 40 },
  button: {
    backgroundColor: '#28272F',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});
