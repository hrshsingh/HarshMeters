import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomDrawerContent from './customDrawerContent';
import DashboardScreen from '../screens/home';
import MinimalCameraScreen from '../screens/scanner_page';
import RideStartScreen from '../screens/ride_startScreen';
import RideScreen from '../screens/ride_screen';
import AccountScreen from '../screens/accountScreen';
import TermsAndConditionsScreen from '../screens/termsScreen';
import RideHistoryScreen from '../screens/rideHistory';
import InviteScreen from '../screens/inviteScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// Main app flow (home and ride related screens)
const MainStackNavigator = () => {
  return (
    <Stack.Navigator 
      initialRouteName="home"
      screenOptions={{ 
        headerShown: false,
        animation: 'slide_from_right'
      }}
    >
      <Stack.Screen name="home" component={DashboardScreen} />
      <Stack.Screen name="scannerpage" component={MinimalCameraScreen} />
      <Stack.Screen name="locationpicker" component={MinimalCameraScreen} />
      <Stack.Screen name="ridestart" component={RideStartScreen} />
      <Stack.Screen 
        name="meterDown" 
        component={RideScreen}
        options={{
          gestureEnabled: false, // Prevent going back during ride
        }}
      />
    </Stack.Navigator>
  );
};

// Profile related screens stack
const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        animation: 'slide_from_right'
      }}
    >
      <Stack.Screen name="Account" component={AccountScreen} />
    </Stack.Navigator>
  );
};

// Ride History stack
const RideHistoryStackNavigator = () => {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        animation: 'slide_from_right'
      }}
    >
      <Stack.Screen name="RideHistory" component={RideHistoryScreen} />
    </Stack.Navigator>
  );
};

// Invite stack
const InviteStackNavigator = () => {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        animation: 'slide_from_right'
      }}
    >
      <Stack.Screen name="Invite" component={InviteScreen} />
    </Stack.Navigator>
  );
};

// Terms stack
const TermsStackNavigator = () => {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        animation: 'slide_from_right'
      }}
    >
      <Stack.Screen name="Terms" component={TermsAndConditionsScreen} />
    </Stack.Navigator>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Main"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ 
        headerShown: false,
        swipeEnabled: true,
        drawerType: 'slide',
        overlayColor: 'rgba(0,0,0,0.5)',
      }}
    >
      {/* Main app flow */}
      <Drawer.Screen 
        name="Main" 
        component={MainStackNavigator}
        options={{ 
          headerShown: false,
          title: 'Home'
        }}
      />
      
      {/* Profile section */}
      <Drawer.Screen 
        name="Profile" 
        component={ProfileStackNavigator}
        options={{ 
          headerShown: false,
          title: 'My Account'
        }}
      />
      
      {/* Ride History */}
      <Drawer.Screen 
        name="History" 
        component={RideHistoryStackNavigator}
        options={{ 
          headerShown: false,
          title: 'Ride History'
        }}
      />
      
      {/* Invite Friends */}
      <Drawer.Screen 
        name="InviteFriends" 
        component={InviteStackNavigator}
        options={{ 
          headerShown: false,
          title: 'Invite Friends'
        }}
      />
      
      {/* Terms and Conditions */}
      <Drawer.Screen 
        name="TermsConditions" 
        component={TermsStackNavigator}
        options={{ 
          headerShown: false,
          title: 'Terms & Conditions'
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
