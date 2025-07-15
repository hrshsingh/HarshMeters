// AccountScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Alert,
  ScrollView,
  Modal,
  Dimensions,
} from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../routeConfig/authContext';

const { width } = Dimensions.get('window');


const AccountScreen = ({ navigation }) => {

  const { isLoading, user } = useAuth();

  const [userData, setUserData] = useState({
    name: 'John Doe',
    phone: '+1 234 567 8900',
    email: user ? user.email : 'No Email',
    password: '••••••••',
    profileImage: null,
  });

  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState('');
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);

  useEffect(() => {
    // Load user data from Firebase or AsyncStorage
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const currentUser = auth().currentUser;
      if (currentUser) {
        setUserData(prev => ({
          ...prev,
          email: currentUser.email || prev.email,
          name: currentUser.displayName || prev.name,
        }));
      }
    } catch (error) {
      console.log('Error loading user data:', error);
    }
  };

  const handleEdit = (field) => {
    setEditingField(field);
    setTempValue(userData[field] === '••••••••' ? '' : userData[field]);
  };

  const handleSave = async () => {
    if (!tempValue.trim()) {
      Alert.alert('Error', 'Field cannot be empty');
      return;
    }

    // Validate email format
    if (editingField === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(tempValue)) {
        Alert.alert('Error', 'Please enter a valid email address');
        return;
      }
    }

    // Validate phone format
    if (editingField === 'phone') {
      const phoneRegex = /^[+]?[\d\s\-\(\)]+$/;
      if (!phoneRegex.test(tempValue)) {
        Alert.alert('Error', 'Please enter a valid phone number');
        return;
      }
    }

    try {
      // Update in Firebase or your backend
      if (editingField === 'email') {
        await updateEmail(tempValue);
      } else if (editingField === 'password') {
        await updatePassword(tempValue);
      }

      setUserData(prev => ({
        ...prev,
        [editingField]: editingField === 'password' ? '••••••••' : tempValue,
      }));

      setEditingField(null);
      setTempValue('');
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const updateEmail = async (newEmail) => {
    const user = auth().currentUser;
    if (user) {
      await user.updateEmail(newEmail);
    }
  };

  const updatePassword = async (newPassword) => {
    if (newPassword.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }
    const user = auth().currentUser;
    if (user) {
      await user.updatePassword(newPassword);
    }
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue('');
  };

  const handleImagePicker = () => {
    setShowImagePicker(true);
  };

  const selectImage = (type) => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      quality: 0.8,
    };

    const callback = (response) => {
      if (response.didCancel || response.error) {
        return;
      }

      if (response.assets && response.assets[0]) {
        setUserData(prev => ({
          ...prev,
          profileImage: response.assets[0].uri,
        }));
      }
    };

    if (type === 'camera') {
      launchCamera(options, callback);
    } else {
      launchImageLibrary(options, callback);
    }

    setShowImagePicker(false);
  };

  const ProfileField = ({ label, value, field, icon, keyboardType = 'default' }) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.fieldRow}>
        <Icon name={icon} size={20} color="#666" style={styles.fieldIcon} />
        {editingField === field ? (
          <View style={styles.editContainer}>
            <TextInput
              style={styles.editInput}
              value={tempValue}
              onChangeText={setTempValue}
              keyboardType={keyboardType}
              secureTextEntry={field === 'password'}
              autoFocus
            />
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <Icon name="check" size={20} color="#4CAF50" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
              <Icon name="close" size={20} color="#f44336" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.displayContainer}>
            <Text style={styles.fieldValue}>{value}</Text>
            <TouchableOpacity onPress={() => handleEdit(field)} style={styles.editButton}>
              <Icon name="edit" size={18} color="#666" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Account</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Profile Image */}
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={() => setShowFullImage(true)}>
            <Image
              source={
                userData.profileImage
                  ? { uri: userData.profileImage }
                  : require('../assets/default-avatar.png')
              }
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleImagePicker} style={styles.cameraButton}>
            <Icon name="camera-alt" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* User Fields */}
        <View style={styles.fieldsContainer}>
          <ProfileField
            label="Full Name"
            value={userData.name}
            field="name"
            icon="person"
          />
          <ProfileField
            label="Phone Number"
            value={userData.phone}
            field="phone"
            icon="phone"
            keyboardType="phone-pad"
          />
          <ProfileField
            label="Email Address"
            value={userData.email}
            field="email"
            icon="email"
            keyboardType="email-address"
          />
          <ProfileField
            label="Password"
            value={userData.password}
            field="password"
            icon="lock"
          />
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={() => {
          Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Logout',
                onPress: async () => {
                  await auth().signOut();
                  navigation.navigate('login');
                }
              }
            ]
          );
        }}>
          <Icon name="logout" size={20} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Image Picker Modal */}
      <Modal
        visible={showImagePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowImagePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Photo</Text>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => selectImage('camera')}
            >
              <Icon name="camera-alt" size={24} color="#333" />
              <Text style={styles.modalOptionText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => selectImage('gallery')}
            >
              <Icon name="photo-library" size={24} color="#333" />
              <Text style={styles.modalOptionText}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setShowImagePicker(false)}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Full Image Modal */}
      <Modal
        visible={showFullImage}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowFullImage(false)}
      >
        <View style={styles.fullImageOverlay}>
          <TouchableOpacity
            style={styles.fullImageContainer}
            onPress={() => setShowFullImage(false)}
          >
            <Image
              source={
                userData.profileImage
                  ? { uri: userData.profileImage }
                  : require('../assets/default-avatar.png')
              }
              style={styles.fullImage}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default AccountScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  placeholder: {
    width: 34,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 30,
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e0e0e0',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: (width - 120) / 2 - 10,
    backgroundColor: '#4CAF50',
    borderRadius: 18,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  fieldsContainer: {
    marginHorizontal: 20,
  },
  fieldContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  fieldLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldIcon: {
    marginRight: 12,
  },
  displayContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fieldValue: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  editButton: {
    padding: 8,
  },
  editContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  editInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#4CAF50',
    paddingVertical: 4,
    marginRight: 10,
  },
  saveButton: {
    padding: 8,
    marginRight: 5,
  },
  cancelButton: {
    padding: 8,
  },
  logoutButton: {
    flexDirection: 'row',


    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f44336',
    marginHorizontal: 20,
    marginVertical: 30,
    paddingVertical: 15,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalOptionText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
  },
  modalCancel: {
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 10,
  },
  modalCancelText: {
    fontSize: 16,
    color: '#f44336',
    fontWeight: '600',
  },
  fullImageOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImageContainer: {
    width: '90%',
    aspectRatio: 1,
  },
  fullImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});