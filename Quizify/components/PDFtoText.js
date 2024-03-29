import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
        const pdfPath = document.uri;

        // Extract text from PDF
        PDFDocument.load(pdfPath)
          .then((doc) => {
            let extractedText = '';
            for (let i = 0; i < doc.pages.length; i++) {
              const page = doc.pages[i];
              extractedText += PDFText.getText(page);
            }
            setText(extractedText);
            console.log('2');
          })
          .catch((error) => {
            console.error('Error extracting text:', error);
          });
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
};

const styles = StyleSheet.create({ 
    container: { 
        display: "flex", 
        alignContent: "center", 
        alignItems: "center", 
        justifyContent: "space-evenly", 
        backgroundColor: "#fff", 
        height: "100%", 
    }, 
	heading2: { 
		fontSize: 24,  
		marginBottom: 8, 
		color: "#ff6262", 
		textAlign: "center", 
		fontWeight: 'bold',
		marginBottom: 55
	},
	text1: { 
		fontSize: 16, 
		marginBottom: 10, 
		color: "black", 
	},
	button: {
		marginTop: -65,
		marginVertical: -10,
		marginHorizontal: 100,
		alignItems: 'center',
		backgroundColor: '#ff6262',
		padding: 15,
		borderRadius: 1000,
		width: 300
	}
});




