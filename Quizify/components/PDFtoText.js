import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { PDFDocument, PDFText } from 'react-native-pdf-lib';

export default function TextFromPdf() {
  const [text, setText] = useState('');

  const handleFileUpload = async () => {
    try {
      const document = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
      });

      if (document.type === 'success') {
        console.log('3');
        const pdfUri = document.uri;

        try {
          const doc = await PDFDocument.load(pdfUri);
          let extractedText = '';

          for (let i = 0; i < doc.pages.length; i++) {
            const page = doc.pages[i];
            const pageText = await PDFText.getText(page);
            extractedText += pageText;
          }
          console.log('2');

          setText(extractedText);
        } catch (error) {
          console.error('Error extracting text:', error);
        }
      }
    } catch (err) {
      console.error('Error while picking the file:', err);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleFileUpload} style={styles.button}>
        <Text style={{ color: '#fff' }}>Upload PDF file</Text>
      </TouchableOpacity>
      {text ? (
        <View style={styles.textContainer}>
          <Text>{text}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: { 
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  button: {
		marginTop: -685,
		marginVertical: -10,
		marginHorizontal: 100,
		alignItems: 'center',
		backgroundColor: '#ff6262',
		padding: 15,
		borderRadius: 1000,
		width: 300
  },
  textContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '80%',
    maxHeight: '50%',
    overflow: 'scroll',
  },
});
