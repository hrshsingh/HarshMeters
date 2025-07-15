import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { useAuth } from './authContext';

const CustomDrawerContent = (props) => {
  const { navigation } = props;
  const { logout, user } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: performLogout,
        },
      ]
    );
  };

  const performLogout = async () => {
    try {
      const success = await logout();
      if (!success) {
        Alert.alert('Error', 'Failed to logout. Please try again.');
      }
      // The auth context will automatically update the navigation state
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollView}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </Text>
          </View>
          <Text style={styles.userName}>
            {user?.name || 'User Name'}
          </Text>
          <Text style={styles.userEmail}>
            {user?.email || 'user@example.com'}
          </Text>
        </View>

        {/* Navigation Items */}
        <View style={styles.navSection}>
          <DrawerItem
            label="Home"
            onPress={() => navigation.navigate('Main', { screen: 'home' })}
            labelStyle={styles.navLabel}
          />
          
          <DrawerItem
            label="My Account"
            onPress={() => navigation.navigate('Profile', { screen: 'Account' })}
            labelStyle={styles.navLabel}
          />
          
          <DrawerItem
            label="Ride History"
            onPress={() => navigation.navigate('History', { screen: 'RideHistory' })}
            labelStyle={styles.navLabel}
          />
          
          <DrawerItem
            label="Invite Friends"
            onPress={() => navigation.navigate('InviteFriends', { screen: 'Invite' })}
            labelStyle={styles.navLabel}
          />
          
          <DrawerItem
            label="Terms & Conditions"
            onPress={() => navigation.navigate('TermsConditions', { screen: 'Terms' })}
            labelStyle={styles.navLabel}
          />
        </View>
      </DrawerContentScrollView>

      {/* Footer with Logout */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flexGrow: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  navSection: {
    flex: 1,
    paddingTop: 10,
  },
  navLabel: {
    fontSize: 16,
    color: '#333',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    padding: 20,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomDrawerContent;