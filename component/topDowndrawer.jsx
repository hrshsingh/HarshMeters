import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  TouchableOpacity,
} from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const DEFAULT_DRAWER_HEIGHT_PERCENTAGE = 0.4; // Default to 40% of screen height

// TopDownDrawer Component
export const TopDownDrawer = ({ isVisible, onClose, children, drawerHeightPercentage = DEFAULT_DRAWER_HEIGHT_PERCENTAGE }) => {
  // Animated value for drawer position (starts off-screen)
  const translateY = useRef(new Animated.Value(-SCREEN_HEIGHT)).current;
  // Animated value for backdrop opacity
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  // Calculate the actual drawer height based on percentage of screen height
  const drawerHeight = SCREEN_HEIGHT * drawerHeightPercentage;

  // PanResponder for drag-to-close functionality
  const panResponder = useRef(
    PanResponder.create({
      // Should we become the responder on start of touch?
      onStartShouldSetPanResponder: () => true,
      // Should we become the responder on a move?
      onMoveShouldSetPanResponder: () => true,

      // When pan gesture starts
      onPanResponderGrant: () => {
        // Stop any ongoing animations
        translateY.stopAnimation();
        // Set the offset to the current value so we can continue from where we left off
        translateY.setOffset(translateY._value);
        translateY.setValue(0); // Reset current value for delta tracking
      },

      // When pan gesture moves
      onPanResponderMove: Animated.event(
        [
          null,
          { dy: translateY } // dy is the change in Y since the start of the gesture
        ],
        { useNativeDriver: false } // useNativeDriver must be false for translateY with setOffset
      ),

      // When pan gesture ends
      onPanResponderRelease: (e, gestureState) => {
        translateY.flattenOffset(); // Apply the offset to the base value
        const { dy, vy } = gestureState; // dy: accumulated distance, vy: velocity Y

        // Determine if the drawer should close based on drag distance or velocity
        if (dy > drawerHeight / 3 || vy > 0.5) { // If dragged down more than 1/3 of height or fast enough
          closeDrawer();
        } else {
          // Snap back to open position
          Animated.timing(translateY, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  // Function to open the drawer
  const openDrawer = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0, // Slide to top of the screen (translateY: 0)
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0.5, // Fade in backdrop
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [translateY, backdropOpacity]);

  // Function to close the drawer
  const closeDrawer = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -drawerHeight, // Slide completely off-screen
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0, // Fade out backdrop
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Callback after animation completes
      onClose(); // Notify parent component that drawer is closed
    });
  }, [translateY, backdropOpacity, onClose, drawerHeight]);

  // Effect to handle visibility changes
  useEffect(() => {
    if (isVisible) {
      openDrawer();
    } else {
      closeDrawer(); // Ensure drawer is closed if isVisible becomes false
    }
  }, [isVisible, openDrawer, closeDrawer]); // Re-run effect when isVisible, openDrawer or closeDrawer changes

  // Don't render anything if not visible and already closed
  if (!isVisible && translateY._value < -drawerHeight + 10) { // Add a small threshold for smoother unmount
    return null;
  }

  return (
    // Main container for the drawer and backdrop
    <View style={StyleSheet.absoluteFillObject} pointerEvents={isVisible ? 'auto' : 'none'}>
      {/* Backdrop for dimming */}
      <Animated.View
        style={[
          styles.backdrop,
          { opacity: backdropOpacity },
        ]}
      >
        {/* TouchableOpacity on backdrop to close drawer */}
        <TouchableOpacity style={styles.backdropTouchable} onPress={closeDrawer} />
      </Animated.View>

      {/* Drawer content */}
      <Animated.View
        style={[
          styles.drawer,
          {
            height: drawerHeight,
            transform: [{
              translateY: translateY.interpolate({
                inputRange: [-drawerHeight, 0, drawerHeight], // Clamp movement to prevent pushing up
                outputRange: [-drawerHeight, 0, 0], // Drawer can only move down from its open position (0)
                extrapolate: 'clamp', // Prevent values outside the range
              }),
            }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={styles.handleIndicator} /> {/* Drag handle indicator */}
        {children}
      </Animated.View>
    </View>
  );
};

// Main App component for demonstration

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  openButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  openButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    zIndex: 9, // Ensure backdrop is below the drawer but above main content
  },
  backdropTouchable: {
    flex: 1, // Make the entire backdrop area touchable
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 10, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    zIndex: 10, // Ensure drawer is on top
    paddingTop: 15, // Space for the handle
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
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  drawerText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    textAlign: 'center',
    lineHeight: 24,
  },
  closeButton: {
    backgroundColor: '#E91E63',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
