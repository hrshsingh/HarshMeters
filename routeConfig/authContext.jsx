import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(null);

  // Check authentication status on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      const userData = await AsyncStorage.getItem('userData');

      if (userToken && isLoggedIn === 'true') {
        setIsAuthenticated(true);
        setUserToken(userToken);
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
        setUserToken(null);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
      setUser(null);
      setUserToken(null);
    } finally {
      setIsLoading(false);

    }
  };

  const login = async (userToken, userData) => {
    try {
      await AsyncStorage.setItem('userToken', userToken);
      await AsyncStorage.setItem('isLoggedIn', 'true');
      await AsyncStorage.setItem('userData', JSON.stringify(userData));

      setIsAuthenticated(true);
      setUser(userData);

      return true;
    } catch (error) {
      console.error('Error saving auth data:', error);
      return false;
    }
  };




  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('isLoggedIn');
      await AsyncStorage.removeItem('userData');

      setIsAuthenticated(false);
      setUser(null);

      return true;
    } catch (error) {
      console.error('Error clearing auth data:', error);
      return false;
    }
  };

  const updateUser = async (newUserData) => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(newUserData));
      setUser(newUserData);
      return true;
    } catch (error) {
      console.error('Error updating user data:', error);
      return false;
    }
  };

  const value = {
    isAuthenticated,
    isLoading,
    user,
    userToken,
    login,
    logout,
    updateUser,
    checkAuthStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};