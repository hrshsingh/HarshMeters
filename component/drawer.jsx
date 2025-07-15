import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileiMG from "../assets/imagePR.png";

const ProfileStack = () => {

    }

const CustomDrawerContent = (props) => {
    const menuItems = [
        { title: 'My Account', onPress: () => console.log('My Account') },
        { title: 'Invite Friends', onPress: () => console.log('Invite Friends') },
        { title: 'Ride History', onPress: () => console.log('Ride History') },
        { title: 'FAQ', onPress: () => console.log('FAQ') },
        { title: 'Trusted Contacts', onPress: () => console.log('Trusted Contacts') },
        { title: 'About', onPress: () => console.log('About') },
        
        { title: 'Terms & Conditions', onPress: () => console.log('Terms & Conditions') },
    ];

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.profileContainer}>
                <Image
                    source={ProfileiMG}
                    style={styles.profileImage}
                />
            </View>
        <DrawerItemList {...props}/>
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    profileContainer: {
        alignItems: 'center',
        margin: 16,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    menuItem: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: '#e0e0e0',
    },
    menuText: {
        fontSize: 16,
        color: '#333',
    },
});

export default CustomDrawerContent;
