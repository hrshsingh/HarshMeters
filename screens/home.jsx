import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Carousel from '../component/carousel';

const DashboardScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        <TouchableOpacity style={styles.menuButton} onPress={() => { navigation.openDrawer() }}>
          <Image source={require("../assets/icons/ic_menu.png")} />
        </TouchableOpacity>

        <Image source={require('../assets/logo.png')} style={styles.logo} />

        <View style={styles.tittleContainer}>
          <Text style={styles.tittle}>Welcome Home</Text>
          <Text style={styles.titbold}>Harsh</Text>
        </View>

        <Text style={styles.centerText}> Scan and go</Text>

        <Pressable style={styles.button} onPress={() => navigation.navigate('ridestart')}>
          <Text style={styles.buttonText}>For Hire</Text>
        </Pressable>
        
    
        <Text> How our pricing works</Text>
        <View style={styles.carosel}>
              <Carousel />
        </View>

        <Text style={styles.rewardtxt} >
          Rewards
        </Text>

        <View style={styles.offercontainer}>
          <Text style={styles.offertext} >
            New offers
          </Text>
          <Text style={styles.offertext}>
            every ride
          </Text>
        </View>

        <Image source={require("../assets/ads_1.png")}>
        </Image>


        </ScrollView>



    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FF',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 8,
    paddingBottom: 30, // Add padding at the bottom for better scrolling
  },
  carosel:{
    height: 300,
    marginVertical: 20,
  },

  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 11,
    borderRadius: 5,
    elevation: 3,
    zIndex: 1,
  },

  logo: {
    width: 126,
    height: 126,
    resizeMode: 'contain',
    marginVertical: 30
  },
  button: {
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: '#F9E353',
    paddingHorizontal: 50,
    marginVertical: 25
  },
  buttonText: {
    color: '#2F0E1B',
    fontWeight: 600,
    fontSize: 34,
  },

  tittle: {
    fontSize: 24,
    marginVertical: 10

  },
  titbold: {
    fontSize: 24,
    fontWeight: 700
  },
  centerText: {
    fontSize: 16,
    marginVertical: 10
  },
  tittleContainer: {
    alignSelf: "flex-start",
    marginLeft: 30
  },
  offercontainer: {
    position: 'absolute',
    top: 685,
    zIndex: 1,
    left: 30
  },
  offertext: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: "600"
  },
  rewardtxt: {
    marginBottom: 10,
    marginLeft: 10,
    alignSelf: 'flex-start'
  }


});

export default DashboardScreen;





