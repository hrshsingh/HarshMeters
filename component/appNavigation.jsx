import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import SplashScreen from "../screens/splash";
import OnboardingScreen from "../screens/onbordingScreen";
import OnboardingScreen2 from "../screens/onboardScreen2";
import OnboardingScreen3 from "../screens/onBordScreen3";
import AllowLocation from "../screens/location";
import LoginScreen from "../screens/login";
import VerificationScreen from "../screens/otpverify";
import RegisterScreen from "../screens/register";
import DashboardScreen from "../screens/home";
import ScannerPage from "../screens/scanner_page";
import RideStartScreen from "../screens/ride_startScreen";
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from "./drawer";
import RideScreen from "../screens/ride_screen";

const Stack = createNativeStackNavigator()

const StackRoutes = () => {
    return (
        <Stack.Navigator initialRouteName='splash' screenOptions={{ headerShown: false }} >
            <Stack.Screen name='splash' component={SplashScreen}></Stack.Screen>
            <Stack.Screen name='Onboarding' component={OnboardingScreen}></Stack.Screen>
            <Stack.Screen name='Onboarding2' component={OnboardingScreen2}></Stack.Screen>
            <Stack.Screen name='Onboarding3' component={OnboardingScreen3}></Stack.Screen>
            <Stack.Screen name='allowlocation' component={AllowLocation}></Stack.Screen>
            <Stack.Screen name='login' component={LoginScreen}></Stack.Screen>
            <Stack.Screen name='otpverifiction' component={VerificationScreen}></Stack.Screen>
            <Stack.Screen name='register' component={RegisterScreen}></Stack.Screen>
            <Stack.Screen name='home' component={DashboardScreen}></Stack.Screen>
            <Stack.Screen name='scannerpage' component={ScannerPage}></Stack.Screen>
            <Stack.Screen name='locatonpicker' component={ScannerPage}></Stack.Screen>
            <Stack.Screen name='ridestart' component={RideStartScreen}></Stack.Screen>
            <Stack.Screen name='meterDown' component={RideScreen}></Stack.Screen>
        </Stack.Navigator>
    )
}

const AppNavigation = () => {

    const Drawer = createDrawerNavigator();

    return <>
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Dashboard"
                drawerContent={(props) => <CustomDrawerContent {...props} />}
             screenOptions={{ headerShown: false }}
            //  drawerContent={({ navigation }) => { }}
            >
                <Drawer.Screen name="Dashboard" component={StackRoutes}
                // options={{ drawerItemStyle: { display: 'none' } }}
                />
                <Drawer.Screen name="HISTORY" component={StackRoutes} />
                <Drawer.Screen name="Transaction" component={StackRoutes} />
                <Drawer.Screen name="T&C" component={StackRoutes} />
                <Drawer.Screen name="LOGOUT" component={StackRoutes} />

            </Drawer.Navigator>

        </NavigationContainer >
    </>
}

export default AppNavigation;