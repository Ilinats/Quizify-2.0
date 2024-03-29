
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
import { View } from '@/components/Themed';
import ImageToText from '@/components/ImageToText';
import PDFtoText from '@/components/PDFtoText';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <ImageToText/>
      <PDFtoText/>
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
