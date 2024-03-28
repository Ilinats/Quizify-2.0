
/*import { View, Text } from 'react-native';
import React from 'react';
import { Link, Redirect } from 'expo-router';

const index = () => {
  return (
    <Redirect href={'/(auth)/sign-in'} />
  );
};

export default index;
*/

import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import ImageToText from '@/components/ImageToText';

export default function TabOneScreen() {
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