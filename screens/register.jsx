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

const RegisterScreen = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');

const handleSignIn = () =>{
    navigation.navigate("login")
}


const handleSendCode = () =>{
    navigation.navigate("otpverifiction")
}




  return (
    <SafeAreaView style={styles.container}>
             <Image source={require('../assets/logo.png')} style={styles.logo} />

      <Text style={styles.loginTitle}>Sign Up</Text>


      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
        <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#aaa"
        keyboardType="default"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
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
        <TouchableOpacity onPress={handleSignIn}>
          <Text style={styles.signupText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  logo: {
    width: 126,
    height: 126,
    resizeMode: 'contain',
    marginBottom:30
  },
  loginTitle: {
    fontSize: 36,
    color: '#555',
    marginBottom: 20,
  },

  subText: {
    fontSize: 14,
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
