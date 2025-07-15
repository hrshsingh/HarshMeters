import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RideContext = createContext();

export const useRideContext = () => {
    const context = useContext(RideContext);
    if (!context) {
        throw new Error('useRideContext must be used within an RideProvider');
    }
    return context;
};

export const RideProvider = ({ children }) => {

    const [dId, setDId] = useState(null); // For QR scan data


    const isScanned = async (did) => {
        try {
            await AsyncStorage.setItem('dId', did);
            setDId(did);
            return true;
        } catch (error) {
            console.error('Error saving auth data:', error);
            return false;
        }
    };


    const value = {
        dId,
        isScanned
    };

    return (
        <RideContext.Provider value={value}>
            {children}
        </RideContext.Provider>
    );
};