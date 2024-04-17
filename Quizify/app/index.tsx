import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import { Link, Redirect } from 'expo-router';
import { useAuth } from './AuthProvider';

const index = () => {
  const {session} = useAuth();
 
  return (
    <View>
    { session ? <Redirect href={'/(tabs)'} /> : <Redirect href={'/(auth)/sign-in'} /> }
    </View>
  );
};

export default index;