import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './authContext';
import AuthNavigator from './authNavigator';
import DrawerNavigator from './drawerNavigator';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { RideProvider } from './rideContext';

const Stack = createNativeStackNavigator();

// Loading component
const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#007bff" />
  </View>
);

// Main Navigator Component
const AppNavigatorContent = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading screen while checking auth
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false, // Disable swipe gestures to prevent navigation issues
          animation: 'fade'
        }}
      >
        {isAuthenticated ? (
          // User is authenticated - show main app with drawer
          <Stack.Screen name="App" component={DrawerNavigator} />
        ) : (
          // User is not authenticated - show auth flow
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Main App Component with AuthProvider
const AppNavigator = () => {
  
  return (
    <AuthProvider>
      <RideProvider>
        <AppNavigatorContent />
      </RideProvider>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default AppNavigator;