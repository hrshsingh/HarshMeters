import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth'; // Firebase module
import { useAuth } from '../routeConfig/authContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
 const { login } = useAuth();
  // const handleLogin = async () => {
  //   if (!email || !password) {
  //     Alert.alert('Error', 'Please fill in all fields');
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     await auth().signInWithEmailAndPassword(email.trim(), password);
  //     navigation.replace('Home'); // Navigate to home screen after successful login
  //     // You may navigate to the home screen here if needed
  //     // Example: navigation.replace('Home');
  //   } catch (error) {
  //     let message = 'Login failed. Please try again.';
  //     if (error.code === 'auth/user-not-found') {
  //       message = 'No user found with this email.';
  //     } else if (error.code === 'auth/wrong-password') {
  //       message = 'Incorrect password.';
  //     } else if (error.code === 'auth/invalid-email') {
  //       message = 'Invalid email address.';
  //     }
  //     Alert.alert('Login Error', message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


   const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await auth().signInWithEmailAndPassword(email.trim(), password);
      const firebaseUser = userCredential.user;

      // ✅ Get ID token
      const token = await firebaseUser.getIdToken();

      // ✅ Create userData object
      const userData = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        phoneNumber: firebaseUser.phoneNumber,
      };

      const success = await login(token, userData);
      if (success) {
        navigation.replace('Home'); // ✅ Navigate to Home
      } else {
        Alert.alert('Login Error', 'Failed to save user data.');
      }

    } catch (error) {
      console.error('Login error:', error);
      let message = 'Login failed. Please try again.';
      if (error.code === 'auth/user-not-found') message = 'No user found with this email.';
      if (error.code === 'auth/wrong-password') message = 'Incorrect password.';
      if (error.code === 'auth/invalid-email') message = 'Invalid email address.';
      Alert.alert('Error', message);
    } finally {
      setLoading(false);
    }
  };


  const handleSignUp = () => {
    navigation.navigate("register");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      <Text style={styles.loginTitle}>Login</Text>
      <Text style={styles.subText}>Login with your email and password</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.sendButton} onPress={handleLogin} disabled={loading}>
        <Text style={styles.sendButtonText}>{loading ? 'Logging in...' : 'Login'}</Text>
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
