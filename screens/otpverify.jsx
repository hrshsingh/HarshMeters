import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // If you're using Expo

const VerificationScreen = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (/^\d$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (index < 3) {
        inputs.current[index + 1].focus();
      }
    } else if (text === '') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  const handleVerify = () => {
  navigation.navigate("home")
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
   <Image source={require("../assets/icons/backicon.png")}></Image>
  
      </TouchableOpacity>

      <Text style={styles.title}>Enter verification code</Text>
      <Text style={styles.subtitle}>
        A code has been sent to <Text style={styles.phone}>+91 4545454710</Text>
      </Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            style={[
              styles.otpInput,
              digit ? styles.otpFilled : styles.otpEmpty,
            ]}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
          />
        ))}
      </View>

      <Text style={styles.resendText}>
        Don’t receive a code?{' '}
        <Text style={styles.resendLink}>Resend</Text>
      </Text>

      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.verifyButtonText}>Verify Now</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default VerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FF',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#fff',
 paddingVertical:8,
    paddingHorizontal:11,
    borderRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 60,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
    marginBottom: 30,
    textAlign: 'center',
  },
  phone: {
    fontWeight: 'bold',
    color: '#333',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 30,
  },
  otpInput: {
    borderWidth: 1.5,
    borderRadius: 10,
    width: 50,
    height: 55,
    fontSize: 20,
    textAlign: 'center',
  },
  otpEmpty: {
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  otpFilled: {
    borderColor: '#4339F2',
    backgroundColor: '#fff',
  },
  resendText: {
    color: '#333',
    marginBottom: 40,
  },
  resendLink: {
    color: '#4339F2',
    fontWeight: '600',
  },
  verifyButton: {
    backgroundColor: '#1E1E26',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
