// RideHistoryScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RideHistoryScreen = ({ navigation }) => {
  const [rideHistory, setRideHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Sample ride data - replace with actual API call
  const sampleRideData = [
    {
      id: '1',
      date: '2024-01-15',
      startLocation: 'Home - 123 Main St, New York',
      endLocation: 'Office - 456 Business Ave, New York',
      startTime: '08:30 AM',
      endTime: '09:15 AM',
      duration: '45 min',
      distance: '12.5 km',
      price: '$25.50',
      status: 'completed',
      driverName: 'John Smith',
      vehicleType: 'Sedan'
    },
    {
      id: '2',
      date: '2024-01-15',
      startLocation: 'Office - 456 Business Ave, New York',
      endLocation: 'Restaurant - 789 Food Street, New York',
      startTime: '12:30 PM',
      endTime: '12:50 PM',
      duration: '20 min',
      distance: '5.2 km',
      price: '$15.75',
      status: 'completed',
      driverName: 'Mike Johnson',
      vehicleType: 'Hatchback'
    },
    {
      id: '3',
      date: '2024-01-15',
      startLocation: 'Restaurant - 789 Food Street, New York',
      endLocation: 'Home - 123 Main St, New York',
      startTime: '06:45 PM',
      endTime: '07:30 PM',
      duration: '45 min',
      distance: '13.8 km',
      price: '$28.00',
      status: 'completed',
      driverName: 'Sarah Wilson',
      vehicleType: 'SUV'
    },
    {
      id: '4',
      date: '2024-01-14',
      startLocation: 'Home - 123 Main St, New York',
      endLocation: 'Mall - 321 Shopping Center, New York',
      startTime: '03:00 PM',
      endTime: '03:25 PM',
      duration: '25 min',
      distance: '8.3 km',
      price: '$18.25',
      status: 'completed',
      driverName: 'David Brown',
      vehicleType: 'Sedan'
    },
    {
      id: '5',
      date: '2024-01-14',
      startLocation: 'Mall - 321 Shopping Center, New York',
      endLocation: 'Home - 123 Main St, New York',
      startTime: '08:15 PM',
      endTime: '08:40 PM',
      duration: '25 min',
      distance: '8.3 km',
      price: '$19.50',
      status: 'completed',
      driverName: 'Lisa Davis',
      vehicleType: 'Hatchback'
    },
    {
      id: '6',
      date: '2024-01-13',
      startLocation: 'Home - 123 Main St, New York',
      endLocation: 'Airport - JFK Terminal 1, New York',
      startTime: '05:30 AM',
      endTime: '06:45 AM',
      duration: '1h 15min',
      distance: '35.2 km',
      price: '$65.00',
      status: 'completed',
      driverName: 'Robert Miller',
      vehicleType: 'SUV'
    },
    {
      id: '7',
      date: '2024-01-12',
      startLocation: 'Hotel - Grand Plaza, New York',
      endLocation: 'Office - 456 Business Ave, New York',
      startTime: '09:00 AM',
      endTime: '09:30 AM',
      duration: '30 min',
      distance: '10.1 km',
      price: '$22.75',
      status: 'completed',
      driverName: 'Emma Garcia',
      vehicleType: 'Sedan'
    },
  ];

  useEffect(() => {
    loadRideHistory();
  }, []);

  const loadRideHistory = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Group rides by date
      const groupedRides = groupRidesByDate(sampleRideData);
      setRideHistory(groupedRides);
    } catch (error) {
      console.error('Error loading ride history:', error);
    } finally {
      setLoading(false);
    }
  };

  const groupRidesByDate = (rides) => {
    const grouped = rides.reduce((acc, ride) => {
      const date = ride.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(ride);
      return acc;
    }, {});

    // Convert to array and sort by date (newest first)
    return Object.keys(grouped)
      .sort((a, b) => new Date(b) - new Date(a))
      .map(date => ({
        date,
        rides: grouped[date].sort((a, b) => 
          new Date(`${date} ${b.startTime}`) - new Date(`${date} ${a.startTime}`)
        )
      }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadRideHistory();
    setRefreshing(false);
  };

  const RideCard = ({ ride }) => (
    <TouchableOpacity style={styles.rideCard} activeOpacity={0.7}>
      <View style={styles.cardHeader}>
        <View style={styles.timeContainer}>
          <Text style={styles.startTime}>{ride.startTime}</Text>
          <Icon name="arrow-forward" size={16} color="#666" style={styles.arrowIcon} />
          <Text style={styles.endTime}>{ride.endTime}</Text>
        </View>
        <Text style={styles.price}>{ride.price}</Text>
      </View>

      <View style={styles.locationContainer}>
        <View style={styles.locationRow}>
          <View style={styles.locationDot} />
          <Text style={styles.locationText} numberOfLines={1}>
            {ride.startLocation}
          </Text>
        </View>
        <View style={styles.routeLine} />
        <View style={styles.locationRow}>
          <View style={[styles.locationDot, styles.destinationDot]} />
          <Text style={styles.locationText} numberOfLines={1}>
            {ride.endLocation}
          </Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.rideDetails}>
          <Text style={styles.detailText}>{ride.duration} • {ride.distance}</Text>
          <Text style={styles.detailText}>{ride.vehicleType} • {ride.driverName}</Text>
        </View>
        <View style={styles.statusContainer}>
          <Text style={[styles.statusText, styles.completedStatus]}>
            {ride.status.toUpperCase()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const DateSection = ({ dateGroup }) => (
    <View style={styles.dateSection}>
      <View style={styles.dateHeader}>
        <Text style={styles.dateText}>{formatDate(dateGroup.date)}</Text>
        <Text style={styles.rideCount}>
          {dateGroup.rides.length} ride{dateGroup.rides.length !== 1 ? 's' : ''}
        </Text>
      </View>
      {dateGroup.rides.map((ride) => (
        <RideCard key={ride.id} ride={ride} />
      ))}
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Ride History</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading ride history...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ride History</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="filter-list" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {rideHistory.length > 0 ? (
          <View style={styles.contentContainer}>
            {rideHistory.map((dateGroup, index) => (
              <DateSection key={dateGroup.date} dateGroup={dateGroup} />
            ))}
            <View style={styles.bottomSpacing} />
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Icon name="directions-car" size={64} color="#ccc" />
            <Text style={styles.emptyTitle}>No rides yet</Text>
            <Text style={styles.emptySubtitle}>
              Your ride history will appear here once you start taking rides.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
export default RideHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  filterButton: {
    padding: 8,
  },
  placeholder: {
    width: 40,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  dateSection: {
    marginBottom: 24,
  },
  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  dateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  rideCount: {
    fontSize: 14,
    color: '#666',
  },
  rideCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  startTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  arrowIcon: {
    marginHorizontal: 8,
  },
  endTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#007AFF',
  },
  locationContainer: {
    marginBottom: 16,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
    marginRight: 12,
  },
  destinationDot: {
    backgroundColor: '#f44336',
  },
  routeLine: {
    width: 2,
    height: 20,
    backgroundColor: '#ddd',
    marginLeft: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rideDetails: {
    flex: 1,
  },
  detailText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    overflow: 'hidden',
  },
  completedStatus: {
    backgroundColor: '#E8F5E8',
    color: '#4CAF50',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 100,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 20,
  },
});