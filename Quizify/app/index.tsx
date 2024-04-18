import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import { Link, Redirect } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';

const index = () => {
  const {session, loading, user} = useAuth();

  if(!user) 
    return <Redirect href={'/(auth)/sign-in'} />;

  if(loading) {
    return <ActivityIndicator />
  }
 
  return (
    <View>
    { session ? <Redirect href={'/(tabs)'} /> : <Redirect href={'/(auth)/sign-in'} /> }
    </View>
  );
};

export default index;