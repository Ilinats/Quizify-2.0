import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import ImageToText from '@/components/ImageToText';
import PDFtoText from '@/components/PDFtoText';

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