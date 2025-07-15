import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';

const RideContext = createContext();

export const useRide = () => {
  const context = useContext(RideContext);
  if (!context) {
    throw new Error('useRide must be used within a RideProvider');
  }
  return context;
};

export const RideProvider = ({ children }) => {
  const [rideId, setRideId] = useState(null);
  const [riderId, setRiderId] = useState(null);
  const [driverId, setDriverId] = useState(null);
  const [rideDetails, setRideDetails] = useState(null);
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isFirebaseReady, setIsFirebaseReady] = useState(false);

  // Initialize Firebase and set up authentication
  useEffect(() => {
    try {
      const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
      const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};

      if (Object.keys(firebaseConfig).length > 0) {
        const app = initializeApp(firebaseConfig);
        const firestore = getFirestore(app);
        const firebaseAuth = getAuth(app);

        setDb(firestore);
        setAuth(firebaseAuth);

        const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
          if (user) {
            setCurrentUserId(user.uid);
          } else {
            // Sign in anonymously if no user is authenticated
            try {
              if (typeof __initial_auth_token !== 'undefined') {
                await signInWithCustomToken(firebaseAuth, __initial_auth_token);
              } else {
                await signInAnonymously(firebaseAuth);
              }
            } catch (error) {
              console.error("Firebase anonymous sign-in failed:", error);
            }
          }
          setIsFirebaseReady(true); // Firebase is ready after auth check
        });

        return () => unsubscribe(); // Clean up auth listener
      } else {
        console.warn("Firebase config not found. Firebase features will be limited.");
        setIsFirebaseReady(true); // Mark as ready even without full Firebase if config is missing
      }
    } catch (error) {
      console.error("Error initializing Firebase:", error);
      setIsFirebaseReady(true); // Mark as ready even if initialization fails
    }
  }, []);

  /**
   * Initiates a new ride by creating a document in Firestore.
   * @param {string} newRiderId - The ID of the rider.
   * @param {string} newDriverId - The ID of the driver.
   * @param {object} [details={}] - Optional additional details for the ride.
   * @returns {Promise<string|null>} The newly created ride ID or null if creation failed.
   */
  const startNewRide = async (newRiderId, newDriverId, details = {}) => {
    if (!db || !isFirebaseReady || !currentUserId) {
      console.error("Firestore not initialized or user not authenticated.");
      return null;
    }

    try {
      // Define the collection path for public ride data
      const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
      const ridesCollectionRef = collection(db, `artifacts/${appId}/public/data/rides`);

      const newRideData = {
        riderId: newRiderId,
        driverId: newDriverId,
        status: 'pending', // Initial status of the ride
        startTime: serverTimestamp(), // Firestore server timestamp
        ...details,
      };

      // Add a new document to the 'rides' collection
      const docRef = await addDoc(ridesCollectionRef, newRideData);
      const generatedRideId = docRef.id;

      setRideId(generatedRideId);
      setRiderId(newRiderId);
      setDriverId(newDriverId);
      setRideDetails({ ...newRideData, id: generatedRideId }); // Store details including the ID

      console.log("New ride created with ID:", generatedRideId);
      return generatedRideId;
    } catch (error) {
      console.error('Error creating new ride in Firestore:', error);
      return null;
    }
  };

  /**
   * Ends the current ride by clearing all ride-specific state.
   */
  const endRide = () => {
    setRideId(null);
    setRiderId(null);
    setDriverId(null);
    setRideDetails(null);
  };

  /**
   * Updates the details of the current ride in the context.
   * This does NOT update Firestore. For Firestore updates, a separate function would be needed.
   * @param {object} newDetails - The new ride details to be merged or set.
   */
  const updateRideDetails = (newDetails) => {
    setRideDetails(prevDetails => ({ ...prevDetails, ...newDetails }));
  };

  const value = {
    rideId,
    riderId,
    driverId,
    rideDetails,
    startNewRide,
    endRide,
    updateRideDetails,
    isFirebaseReady, // Expose firebase ready state
    currentUserId, // Expose current user ID
  };

  return (
    <RideContext.Provider value={value}>
      {children}
    </RideContext.Provider>
  );
};
export default RideProvider;
