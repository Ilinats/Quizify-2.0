import React from 'react';
import { StyleSheet, Text, Image, SafeAreaView, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar"; 
import { useState } from "react"; 
import * as ImagePicker from "expo-image-picker";  
/*import ChatGPT from '@/src/chat';*/


export default function GetText() { 
	const [image, setImage] = useState(null); 
	
	const [extractedText, setExtractedText] = useState("");

	const pickImageGallery = async () => { 
		let result = 
			await ImagePicker.launchImageLibraryAsync({ 
				mediaTypes: 
					ImagePicker.MediaTypeOptions.Images, 
				allowsEditing: true, 
				base64: true, 
				allowsMultipleSelection: false, 
			}); 
		if (!result.canceled) { 
			performOCR(result.assets[0]); 

			setImage(result.assets[0].uri);  
		} 
	}; 

	const pickImageCamera = async () => { 
		let result = await ImagePicker.launchCameraAsync({ 
			mediaTypes: ImagePicker.MediaTypeOptions.Images, 
			allowsEditing: true, 
			base64: true, 
			allowsMultipleSelection: false, 
		}); 
		if (!result.canceled) {  
			performOCR(result.assets[0]); 
			setImage(result.assets[0].uri);  
		} 
	}; 

	const performOCR = (file) => { 
		var temp;
		let myHeaders = new Headers(); 
		myHeaders.append( 
			"apikey", 
			"FEmvQr5uj99ZUvk3essuYb6P5lLLBS20"
		); 
		myHeaders.append( 
			"Content-Type", 
			"multipart/form-data"
		); 

		let raw = file; 
		let requestOptions = { 
			method: "POST", 
			redirect: "follow", 
			headers: myHeaders, 
			body: raw, 
		}; 

		// Send a POST request to the OCR API 
		fetch( 
			"https://api.apilayer.com/image_to_text/upload", 
			requestOptions 
		) 
			.then((response) => response.json()) 
			.then((result) => { 
			
				// Set the extracted text in state 
				temp = extractedText + result["all_text"];
				//console.log(temp);
				console.log('1');
				setExtractedText(temp);
			}) 
			.catch((error) => console.log("error", error)); 		
	}; 

	return ( 
		<SafeAreaView style={styles.container}> 
			<Text style={styles.heading2}> 
				Quizify 
			</Text> 
			<TouchableOpacity onPress={pickImageGallery} style={styles.button}>
        		<Text style={{ color: '#fff' }}>Pick an image from gallery</Text>
      		</TouchableOpacity>
			<TouchableOpacity onPress={pickImageCamera} style={styles.button}>
        		<Text style={{ color: '#fff' }}>Take a photo</Text>
      		</TouchableOpacity>
            {image && ( 
                <Image 
                    source={{ uri: image }} 
                    style={{ 
                        width: 200, 
                        height: 150, 
                        objectFit: "contain", 
                    }} 
                /> 
            )} 
            <Text style={styles.text1}> 
                {extractedText} 
            </Text> 
            <StatusBar style="auto" />
            {/* <ChatGPT textFromImage={extractedText}/> */}
		</SafeAreaView> 
	); 
} 

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
