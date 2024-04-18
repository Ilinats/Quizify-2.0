import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import ImageToText from '@/components/ImageToText';
import React from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { Redirect } from 'expo-router';

export default function TabOneScreen() {
    const {user} = useAuth();
    console.log('User:', user);

    if(!user) {
        return <Redirect href={'/(auth)/sign-in'} />;
    }

  return (
    <View style={styles.container}>
      <ImageToText/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});