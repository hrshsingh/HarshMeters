import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  Alert,
} from 'react-native';

const { width } = Dimensions.get('window');
const CONTAINER_WIDTH = width - 40;
const THUMB_WIDTH = 60;
const THRESHOLD = CONTAINER_WIDTH - THUMB_WIDTH - 10;

const SlideToEndRideButton = () => {
  const translateX = useRef(new Animated.Value(0)).current;
  const [isEnded, setIsEnded] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > 5,
      onPanResponderMove: (_, gestureState) => {
        const dx = gestureState.dx;
        if (dx >= 0 && dx <= THRESHOLD) {
          translateX.setValue(dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx >= THRESHOLD) {
          endRide();
        } else {
          resetSlider();
        }
      },
    })
  ).current;

  const endRide = () => {
    if (!isEnded) {
      setIsEnded(true);
      Animated.timing(translateX, {
        toValue: THRESHOLD,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        Alert.alert('✅ Ride Ended', 'You have successfully ended the ride.');
      });
    }
  };

  const resetSlider = () => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.sliderTrack}>
        <Text style={styles.centerText}>Ride End</Text>

        <Animated.View
          style={[
            styles.sliderThumb,
            { transform: [{ translateX: translateX }] },
          ]}
          {...panResponder.panHandlers}
        >
          <Text style={styles.thumbText}>➡️</Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  sliderTrack: {
    width: CONTAINER_WIDTH,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    padding: 5,
    position: 'relative',
    overflow: 'hidden',
  },
  centerText: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 0,
    color: '#555',
    fontSize: 16,
    fontWeight: '600',
  },
  sliderThumb: {
    width: THUMB_WIDTH,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4caf50',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  thumbText: {
    fontSize: 22,
    color: '#fff',
  },
});

export default SlideToEndRideButton;
