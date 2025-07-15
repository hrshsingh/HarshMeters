import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QrScreen from '../screens/scanner_page'; // Assuming this is your QR scanner
import RideStartScreen from '../screens/ride_startScreen';
import RideScreen from '../screens/ride_screen';
// Import other ride-related screens like RideSummary, etc.

const Stack = createNativeStackNavigator();

const RideStackNavigator = () => {

  const handleScan = (e) => {
    console.log('Scanned:', e.data);
    // You can also navigate or save the scanned result
  };
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false, // Prevent going back unintentionally during a ride
        animation: 'slide_from_right',
      }}
    >
      {/* Scanner page where the ride initiation begins */}
      {/* <Stack.Screen
        name="Scanner"
        component={<QrScreen onRead={handleScan} />}
        options={{ gestureEnabled: false }}
      /> */}

      <Stack.Screen name="Scanner">
        {(props) => <QrScreen {...props} onRead={handleScan} />}
      </Stack.Screen>

      {/* Screen to confirm ride details and initiate */}
      <Stack.Screen
        name="RideStart"
        component={RideStartScreen}
        options={{ gestureEnabled: false }}
      />
      {/* Actual ride in progress screen */}
      <Stack.Screen
        name="MeterDown"
        component={RideScreen}
        options={{ gestureEnabled: false }}
      />
      {/* Add other ride-related screens here, e.g., RideSummaryScreen */}
      {/* <Stack.Screen name="RideSummary" component={RideSummaryScreen} /> */}
    </Stack.Navigator>
  );
};

export default RideStackNavigator;

