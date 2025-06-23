import React, { useRef, useMemo } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Slider from '@react-native-community/slider';
import SlideToEndRideButton from '../component/bottomSheet';
import { SafeAreaView } from 'react-native-safe-area-context';

const RideScreen = () => {
  const bottomSheetRef = useRef(null);
  const SLIDER_HEIGHT = 80; // Height reserved for slider button

  // Define visible snap points with adjustment for slider
  const snapPoints = useMemo(() => ['20%', '50%'], []); // Adjusted heights to stay above slider
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>MeterSe</Text>
      </View>

      {/* Trip Total */}
      <View style={styles.tripTotalContainer}>
        <Text style={styles.tripTotalLabel}>Trip Total</Text>
        <Text style={styles.tripTotalValue}>₹42.05</Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>4.4 kms</Text>
            <Text style={styles.statLabel}>Distance</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>00h 30m</Text>
            <Text style={styles.statLabel}>Time</Text>
          </View>
        </View>
        <View style={styles.paymentRow}>
          <View style={styles.cashIndicator} />
          <Text style={styles.cashText}>Cash</Text>
        </View>
      </View>






      {/* Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
      >
        <BottomSheetView style={styles.bottomSheetContent}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
            style={styles.avatar}
          />
          <Text style={styles.driverName}>Alex Rogers</Text>
          <View style={styles.plateContainer}>
            <Text style={styles.plateText}>UP 17 AD 6768</Text>
          </View>
          <Text style={styles.rateLabel}>Rate your drive</Text>          <View style={styles.starsRow}>
            {/* Render 5 stars (implement star rating logic as needed) */}
            {[...Array(5)].map((_, i) => (
              <Text key={i} style={styles.star}>★</Text>
            ))}
          </View>
          <View>
            <TextInput
              style={styles.commentBox}
              placeholder="Any comments"
              placeholderTextColor="#B0B0B0"
            />
          </View></BottomSheetView>
      </BottomSheet>

      {/* Fixed Slider Button at bottom */}
      <View style={styles.fixedSliderContainer}>
        <SlideToEndRideButton />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff',
    position: 'relative', // For absolute positioning of slider
  },
  header: { alignItems: 'center', marginTop: 30 },
  logo: { fontSize: 22, fontWeight: 'bold', backgroundColor: '#1A1A1A', color: '#fff', padding: 8, borderRadius: 8, letterSpacing: 1 },
  tripTotalContainer: { alignItems: 'center', marginTop: 20 },
  tripTotalLabel: { fontSize: 18, color: '#888', marginBottom: 5 },
  tripTotalValue: { fontSize: 32, fontWeight: 'bold', color: '#2CB67D', marginBottom: 10 },
  statsRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 10 },
  statBox: { alignItems: 'center', marginHorizontal: 10, backgroundColor: '#F2F2F2', borderRadius: 10, padding: 10 },
  statValue: { fontSize: 16, fontWeight: 'bold', color: '#1A1A1A' },
  statLabel: { fontSize: 12, color: '#888' },
  paymentRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  cashIndicator: { width: 14, height: 14, backgroundColor: '#2CB67D', borderRadius: 7, marginRight: 6 },
  cashText: { fontSize: 16, color: '#1A1A1A' },
  bottomSheetBg: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  handleIndicator: { backgroundColor: '#E0E0E0', width: 40 },
  bottomSheetContent: { alignItems: 'center', padding: 20 },
  avatar: { width: 64, height: 64, borderRadius: 32, marginBottom: 8 },
  driverName: { fontSize: 18, fontWeight: 'bold', color: '#1A1A1A' },
  plateContainer: { backgroundColor: '#F6D365', borderRadius: 6, paddingHorizontal: 12, paddingVertical: 4, marginVertical: 8 },
  plateText: { color: '#1A1A1A', fontWeight: 'bold', fontSize: 14 },
  rateLabel: { marginTop: 10, fontSize: 16, color: '#888' },
  starsRow: { flexDirection: 'row', marginVertical: 6 },
  star: { fontSize: 24, color: '#FFD700', marginHorizontal: 2 },
  commentBox: { width: '100%', backgroundColor: '#F2F2F2', borderRadius: 8, padding: 12, marginVertical: 10, color: '#1A1A1A' },
  sliderContainer: { width: '100%', alignItems: 'center', marginTop: 16 },
  sliderLabel: {
    position: 'absolute',
    top: 0,
    left: '25%',
    right: '25%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    zIndex: -1,
  },
  sliderLabelText: { color: '#fff', fontWeight: 'bold', fontSize: 18, letterSpacing: 1 },  fixedSliderContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1, // Ensure slider stays on top
  },
});

export default RideScreen;
