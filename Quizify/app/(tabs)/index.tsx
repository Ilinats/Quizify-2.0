import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import ImageToText from '@/components/ImageToText';
import { globalVariable } from '@/try';
import GetText from '@/components/ImageToText';
import { useAuth } from '../../providers/AuthProvider'
import { Link, Redirect, Stack,Slot } from 'expo-router';

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