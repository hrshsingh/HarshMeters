import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity ,Image } from 'react-native';

const OnboardingScreen = ({navigation}) => {
    const handleGetStarted = () => {
        navigation.navigate('Onboarding2'); // Navigate to Home screen
      };
    
    

  return (
    <View style={styles.container}>
    <View style={styles.upperitem} >
        <Text style={styles.maintext}> Fair Fare Promise</Text>
        <Text style={styles.smalltext}>
            Non Commissioned Per KM Government Rate cards implementation For Fare Calculation </Text>
   
        <Image style={styles.itemimage}  source={require('../assets/Splash2.png')}  />
        <Image style={styles.itemimage1} source={require('../assets/SC1.png')}  />
    </View>
    <View style={styles.loweritem}> 
       <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "space-between", alignItems: 'center',margin:30 },
  upperitem:{ justifyContent: "center", alignItems: 'center',paddingTop:40},
  maintext: { fontSize: 36, fontWeight:'bold',alignItems:"center",marginVertical:5 },
  smalltext: { fontSize: 18,textAlign:"center",color:"#525252"  },
  itemimage:{alignItems:"center",marginVertical:25},
  itemimage1:{alignItems:"center",marginTop:35},
  button: {
    backgroundColor: '#28272F',
    paddingVertical: 12, // top and bottom padding
    paddingHorizontal: 40, // left and right padding
    borderRadius: 25, // rounded corners
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },

});


