import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Share,
  Linking,
  Platform,
} from 'react-native';

const InviteScreen = () => {
  // Your referral code - replace with actual user's referral code
  const referralCode = 'USER123ABC';
  const inviteMessage = `Hey! Join me on HarshMeters app and get amazing rewards! Use my referral code: ${referralCode}. Download here: https://yourapp.com/download`;



  const shareToWhatsApp = async () => {
    const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(inviteMessage)}`;
    
    try {
      const supported = await Linking.canOpenURL(whatsappUrl);
      if (supported) {
        await Linking.openURL(whatsappUrl);
      } else {
        Alert.alert('WhatsApp not installed', 'Please install WhatsApp to share via WhatsApp.');
      }
    } catch (error) {
      console.error('Error sharing to WhatsApp:', error);
    }
  };

  const shareToInstagram = async () => {
    const instagramUrl = 'instagram://library?AssetPath=';
    try {
      const supported = await Linking.canOpenURL(instagramUrl);
      if (supported) {
        // Instagram sharing is complex, usually requires sharing an image/story
        // For now, we'll fall back to general sharing
        shareGeneral();
      } else {
        Alert.alert('Instagram not installed', 'Please install Instagram to share via Instagram.');
      }
    } catch (error) {
      shareGeneral();
    }
  };

  const shareGeneral = async () => {
    try {
      await Share.share({
        message: inviteMessage,
        url: 'https://yourapp.com/download', // Add your app download URL
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };



  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Invite Friends</Text>
        <Text style={styles.subtitle}>
          Share your referral code and earn rewards!
        </Text>
      </View>

      {/* Referral Code Section */}
      <View style={styles.referralSection}>
        <Text style={styles.referralLabel}>Your Referral Code</Text>
        <View style={styles.referralCodeContainer}>
          <Text style={styles.referralCode}>{referralCode}</Text>
        </View>
      </View>

      {/* Social Share Buttons */}
      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.whatsappButton} onPress={shareToWhatsApp}>
          <Text style={styles.socialButtonText}>📱 WhatsApp</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.instagramButton} onPress={shareToInstagram}>
          <Text style={styles.socialButtonText}>📷 Instagram</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.shareButton} onPress={shareGeneral}>
          <Text style={styles.socialButtonText}>📤 More</Text>
        </TouchableOpacity>
      </View>

      {/* Additional Invite Options */}
      <View style={styles.additionalOptions}>
        <Text style={styles.optionsTitle}>More ways to invite</Text>
        <Text style={styles.optionsDescription}>
          Share your referral code through any messaging app or social media platform to earn rewards when your friends join!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
  },
  referralSection: {
    margin: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  referralLabel: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 10,
  },
  referralCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#007bff',
    borderStyle: 'dashed',
  },
  referralCode: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    textAlign: 'center',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  whatsappButton: {
    backgroundColor: '#25d366',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    marginRight: 5,
  },
  instagramButton: {
    backgroundColor: '#e4405f',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  shareButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    marginLeft: 5,
  },
  socialButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  additionalOptions: {
    margin: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  optionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 10,
  },
  optionsDescription: {
    fontSize: 16,
    color: '#6c757d',
    lineHeight: 24,
    textAlign: 'center',
  },
});

export default InviteScreen;