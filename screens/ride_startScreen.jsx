// DriverDetailsScreen.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// TopDownDrawer Component
const TopDownDrawer = ({ isVisible, onClose, children }) => {
  const translateY = useRef(new Animated.Value(-SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const drawerHeight = SCREEN_HEIGHT * 0.5; // 40% of screen height

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        translateY.stopAnimation();
        translateY.setOffset(translateY._value);
        translateY.setValue(0);
      },
      onPanResponderMove: Animated.event(
        [null, { dy: translateY }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (e, gestureState) => {
        translateY.flattenOffset();
        const { dy, vy } = gestureState;
        if (dy > drawerHeight / 3 || vy > 0.5) {
          closeDrawer();
        } else {
          Animated.timing(translateY, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  React.useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -drawerHeight,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible]);

  if (!isVisible && translateY._value < -drawerHeight + 10) {
    return null;
  }

  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents={isVisible ? 'auto' : 'none'}>
      <Animated.View
        style={[
          styles.backdrop,
          { opacity: backdropOpacity },
        ]}
      >
        <TouchableOpacity style={styles.backdropTouchable} onPress={onClose} />
      </Animated.View>

      <Animated.View
        style={[
          styles.drawer,
          {
            height: drawerHeight,
            transform: [{
              translateY: translateY.interpolate({
                inputRange: [-drawerHeight, 0, drawerHeight],
                outputRange: [-drawerHeight, 0, 0],
                extrapolate: 'clamp',
              }),
            }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={styles.handleIndicator} />
        {children}
      </Animated.View>
    </View>
  );
};

const DriverDetailsScreen = ({ navigation }) => {
  const [isDrawerVisible, setDrawerVisible] = useState(false);

  const handleOpenDrawer = () => {
    setDrawerVisible(true);
  };

  const handleCloseDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleOpenDrawer} style={styles.openDrawerButton}>
        <Text style={styles.openDrawerButtonText}>View Driver Details</Text>
      </TouchableOpacity>

      <TopDownDrawer
        isVisible={isDrawerVisible}
        onClose={handleCloseDrawer}
      >
        <View style={styles.drawerContent}>
          <Text style={styles.drawerTitle}>Driver Details</Text>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={styles.profileImage}
          />
          <Text style={styles.plateText}>UP 17 AD 6768</Text>
          <Text style={styles.rating}>⭐ 4.28</Text>
          <Text style={styles.info}>Name: John Doe</Text>
          <Text style={styles.info}>Mobile No: +1234567890</Text>
        </View>
      </TopDownDrawer>

      {/* Title */}
      <Text style={styles.title}>Driver Details</Text>

      {/* Profile Image */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }}
          style={styles.profileImage}
        />
        <View style={styles.plate}>
          <Text style={styles.plateText}>UP 17 AD 6768</Text>
        </View>
        <Text style={styles.rating}>⭐ 4.28</Text>
        <Text style={styles.info}>Name: {'{Driver Name}'}</Text>
        <Text style={styles.info}>Mobile No: {'{Driver Number}'}</Text>
      </View>

      {/* Location Question */}
      <View style={styles.questionRow}>
        <TouchableOpacity style={styles.addLocationBtn}>
          <Text style={styles.btnText}>Add a location?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notRequiredBtn}>
          <Text style={[styles.btnText, { color: '#000' }]}>Not required</Text>
        </TouchableOpacity>
      </View>

      {/* Current Location Section */}
      <Text style={styles.label}>Current Location</Text>
      <View style={styles.locationRow}>
        <View style={styles.radio} />
        <TextInput
          placeholder="(Optional)"
          style={styles.input}
          placeholderTextColor="#999"
        />        <TouchableOpacity>
          <Text style={styles.addIcon}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Saved Locations */}
      <View style={styles.savedLocations}>
        {['Home', 'Work'].map((label) => (
          <View key={label} style={styles.locationCard}>
            <Text style={styles.locationLabel}>{label}</Text>
            <Text style={styles.locationDesc}>
              Neemuch RD, Gopalbari, Bari Sadri
            </Text>
          </View>
        ))}
      </View>

      {/* Meter Down Button */}
      <TouchableOpacity style={styles.meterBtn} onPress={() => navigation.navigate('meterDown')}>
        <Text style={styles.meterText}>Meter down →</Text>
      </TouchableOpacity>
      
    </ScrollView>
  );
};

export default DriverDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
  },
  openDrawerButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  openDrawerButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    zIndex: 9,
  },
  backdropTouchable: {
    flex: 1,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    zIndex: 10,
    paddingTop: 15,
  },
  handleIndicator: {
    width: 40,
    height: 5,
    backgroundColor: '#CCC',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 10,
  },
  drawerContent: {
    padding: 20,
    alignItems: 'center',
  },
  drawerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  plateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  rating: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  profileContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  plate: {
    backgroundColor: '#f4d03f',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 4,
  },
  rating: {
    marginTop: 6,
    color: '#444',
  },
  info: {
    fontSize: 14,
    marginTop: 4,
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  addLocationBtn: {
    backgroundColor: '#ffdc5e',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 10,
  },
  notRequiredBtn: {
    borderWidth: 1,
    borderColor: '#000',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  btnText: {
    fontWeight: '600',
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
    marginVertical: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  radio: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#000',
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 14,
    color: '#000',
  },
  savedLocations: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  locationCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    marginHorizontal: 4,
  },
  locationLabel: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  locationDesc: {
    fontSize: 12,
    color: '#666',
  },
  meterBtn: {
    backgroundColor: '#fff',
    borderColor: '#c92b2b',
    borderWidth: 2,
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 30,
  },
  meterText: {
    color: '#c92b2b',
    fontWeight: 'bold',
    fontSize: 16,
  },
  addIcon: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
  },
});