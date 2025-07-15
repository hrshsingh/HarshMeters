// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import React from "react";
// import SplashScreen from "../screens/splash";
// import OnboardingScreen from "../screens/onbordingScreen";
// import OnboardingScreen2 from "../screens/onboardScreen2";
// import OnboardingScreen3 from "../screens/onBordScreen3";
// import AllowLocation from "../screens/location";
// import LoginScreen from "../screens/login";
// import VerificationScreen from "../screens/otpverify";
// import RegisterScreen from "../screens/register";
// import DashboardScreen from "../screens/home";
// import ScannerPage from "../screens/scanner_page";
// import RideStartScreen from "../screens/ride_startScreen";
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import CustomDrawerContent from "./drawer";
// import RideScreen from "../screens/ride_screen";
// import AccountScreen from "../screens/accountScreen";
// import TermsAndConditionsScreen from "../screens/termsScreen";
// import RideHistoryScreen from "../screens/rideHistory";
// import InviteScreen from "../screens/inviteScreen";

// const Stack = createNativeStackNavigator()

// const StackRoutes = () => {
//     return (
//         <Stack.Navigator initialRouteName='splash' screenOptions={{ headerShown: false }} >
//             <Stack.Screen name='splash' component={SplashScreen}></Stack.Screen>
//             <Stack.Screen name='Onboarding' component={OnboardingScreen}></Stack.Screen>
//             <Stack.Screen name='Onboarding2' component={OnboardingScreen2}></Stack.Screen>
//             <Stack.Screen name='Onboarding3' component={OnboardingScreen3}></Stack.Screen>
//             <Stack.Screen name='allowlocation' component={AllowLocation}></Stack.Screen>
//             <Stack.Screen name='login' component={LoginScreen}></Stack.Screen>
//             <Stack.Screen name='otpverifiction' component={VerificationScreen}></Stack.Screen>
//             <Stack.Screen name='register' component={RegisterScreen}></Stack.Screen>
//             <Stack.Screen name='home' component={DashboardScreen}></Stack.Screen>
//             <Stack.Screen name='scannerpage' component={ScannerPage}></Stack.Screen>
//             <Stack.Screen name='locatonpicker' component={ScannerPage}></Stack.Screen>
//             <Stack.Screen name='ridestart' component={RideStartScreen}></Stack.Screen>
//             <Stack.Screen name='meterDown' component={RideScreen}></Stack.Screen>
//         </Stack.Navigator>
//     )
// }

// const ProfileRoute = () => {
//     return (
//        <Stack.Navigator screenOptions={{ headerShown: false }} >
          
//             <Stack.Screen name='Account' component={AccountScreen}></Stack.Screen>
//             <Stack.Screen name='Terms' component={TermsAndConditionsScreen}></Stack.Screen>
//             <Stack.Screen name='RideHistory' component={RideHistoryScreen}></Stack.Screen>
//             <Stack.Screen name='Invite' component={InviteScreen}></Stack.Screen>
//         </Stack.Navigator>
//     )
// }

// const AppNavigation = () => {

//     const Drawer = createDrawerNavigator();

//     return <>
//         <NavigationContainer>
//             <Drawer.Navigator initialRouteName="Main"
         
//                 drawerContent={(props) => <CustomDrawerContent {...props} />}
//              screenOptions={{ headerShown: false }}
           
//             >
//                 <Drawer.Screen name="Main" component={StackRoutes}
//                 options={{headerShown:false}}
//                 />
                
//                      <Drawer.Screen name="Account" component={ProfileRoute}
//                 options={{headerShown:false}}/>

//                      <Drawer.Screen name="Terms" component={TermsAndConditionsScreen}
//                 options={{headerShown:false}} 
//                 />
//                     <Drawer.Screen name="RideHistory" component={RideHistoryScreen}
//                 options={{headerShown:false}}
//                 />
//                     <Drawer.Screen name="Invite" component={InviteScreen}
//                 options={{headerShown:false}}
//                 />
//                 <Drawer.Screen name="Logout" component={LoginScreen}
//                 options={{headerShown:false}}
//                 />

                 
              
              

//             </Drawer.Navigator>

//         </NavigationContainer >
//     </>
// }

// export default AppNavigation;