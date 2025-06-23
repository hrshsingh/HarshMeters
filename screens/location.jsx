import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity ,Image } from 'react-native';

const AllowLocation = ({navigation}) => {

    const handleGetStarted = () => {
        navigation.navigate('login'); // Navigate to Home screen
      };

  return (
    <View style={styles.container}>
    <View style={styles.upperitem} >

     
        <Image style={styles.itemimage}  source={require('../assets/Splash5.png')}  />
        <Text style={styles.smalltext}>
            Don't worry your data is private</Text>
        
    </View>
    <View style={styles.loweritem}> 
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Allow Location</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

export default AllowLocation;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "space-between", alignItems: 'center',margin:30 },
  upperitem:{ justifyContent: "center", alignItems: 'center',paddingTop:40},
  maintext: { fontSize: 36, fontWeight:'bold',alignItems:"center",marginVertical:5 },
  smalltext: { fontSize: 22, fontWeight:"bold",textAlign:"center",color:"#525252"  },
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
