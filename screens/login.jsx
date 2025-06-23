// LoginScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';

const LoginScreen = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSendCode = () => {
    navigation.navigate("otpverifiction")
    
  };

  const handleSignUp = () => {
   navigation.navigate("register")
  };

  return (
    <SafeAreaView style={styles.container}>
             <Image source={require('../assets/logo.png')} style={styles.logo} />

      <Text style={styles.loginTitle}>Login</Text>
      <Text style={styles.subText}>Login with your phone number</Text>

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor="#aaa"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      <TouchableOpacity style={styles.sendButton} onPress={handleSendCode}>
        <Text style={styles.sendButtonText}>Send Code</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom:30
  },

  loginTitle: {
    fontSize: 36,
    color: '#555',
    marginBottom: 20,
  },
  subText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    height: 50,
    marginBottom: 20,
    fontSize: 16,
  },
  sendButton: {
    width: '100%',
    backgroundColor: '#1E1E26',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    marginTop: 40,
    flexDirection: 'row',
  },
  signupText: {
    color: '#4339F2',
    fontWeight: '600',
  },
});
