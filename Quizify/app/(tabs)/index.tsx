import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import ImageToText from '@/components/ImageToText';
import PDFtoText from '@/components/PDFtoText';
import { globalVariable } from '@/try';

export default function TabOneScreen() {
  globalVariable.Session = true;
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