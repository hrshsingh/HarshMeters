import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/splash';
import OnboardingScreen from '../screens/onbordingScreen';
import OnboardingScreen2 from '../screens/onboardScreen2';
import OnboardingScreen3 from '../screens/onBordScreen3';
import AllowLocation from '../screens/location';
import LoginScreen from '../screens/login';
import VerificationScreen from '../screens/otpverify';
import RegisterScreen from '../screens/register';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator 
      initialRouteName="splash" 
      screenOptions={{ 
        headerShown: false,
        gestureEnabled: false, // Disable swipe back
        animation: 'slide_from_right'
      }}
    >
      <Stack.Screen 
        name="splash" 
        component={SplashScreen}
        options={{
          gestureEnabled: false,
        }}
      />
      <Stack.Screen 
        name="Onboarding" 
        component={OnboardingScreen}
        options={{
          gestureEnabled: false,
        }}
      />
      <Stack.Screen 
        name="Onboarding2" 
        component={OnboardingScreen2}
        options={{
          gestureEnabled: false,
        }}
      />
      <Stack.Screen 
        name="Onboarding3" 
        component={OnboardingScreen3}
        options={{
          gestureEnabled: false,
        }}
      />
      <Stack.Screen 
        name="allowlocation" 
        component={AllowLocation}
        options={{
          gestureEnabled: false,
        }}
      />
      <Stack.Screen 
        name="login" 
        component={LoginScreen}
        options={{
          gestureEnabled: false,
        }}
      />
      <Stack.Screen 
        name="otpverification" 
        component={VerificationScreen}
        options={{
          gestureEnabled: false,
        }}
      />
      <Stack.Screen 
        name="register" 
        component={RegisterScreen}
        options={{
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;

