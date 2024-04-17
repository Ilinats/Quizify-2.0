import React from 'react';
import { StyleSheet, Text, Image, SafeAreaView, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import ChatGPT from '../src/chat';
import { useEffect } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import { Buffer } from "buffer";

import * as FileSystem from 'expo-file-system'
import { decode } from 'base64-arraybuffer'
import { supabase } from '../lib/supabase'
import { useAuth } from '../providers/AuthProvider'

export default function ImageToText() {
    const [image, setImage] = useState(null);
    const { user } = useAuth();
    console.log('bla bla', user);

    const [extractedText, setExtractedText] = useState("");
    const [limit, setLimit] = useState(false);
    const [counter, setCounter] = useState(0);
    const [pdf, setPdf] = useState(false);
    const [pdfCounter, setPdfCounter] = useState(0);
    const [time, setTime] = useState(new Date().getTime());

    const apiKey = '###';
    const apiUrl = 'https://app.nanonets.com/api/v2/OCR/FullText';

    useEffect(() => {
        setExtractedText("");
        setTime(new Date().getTime());
    }, []);

    const pickImageGallery = async () => {
        if (counter == 4) {
            setLimit(true);
            alert('You have reached the limit of allowed images');
        } else {
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

                const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64' });

                const currentDate = new Date();
                const year = currentDate.getFullYear();
                const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                const day = String(currentDate.getDate()).padStart(2, '0');
                const formattedDate = `${year}-${month}-${day}`;

                const filePath = `${user ? user.id : 'unknown'}/${formattedDate}/${time}/${new Date().getTime()}.${result.assets[0].type === 'image' ? 'png' : 'mp4'}`;

                const contentType = result.assets[0].type === 'image' ? 'image/png' : 'video/mp4';
                console.log('filePath:', filePath);

                const { data, error } = await supabase.storage.from('files').upload(filePath, decode(base64), { contentType });
                if (error) {
                    console.error('Error uploading file:', error.message);
                } else {
                    console.log('File uploaded successfully:', data);
                }
            }
            }
        };

        const pickImageCamera = async () => {
            if (counter == 4) {
                setLimit(true);
                alert('You have reached the limit of allowed images');
            } else {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                base64: true,
                allowsMultipleSelection: false,
            });
            if (!result.canceled) {
                performOCR(result.assets[0]);
                setImage(result.assets[0].uri);

                const base64 = await FileSystem.readAsStringAsync(image.uri, { encoding: 'base64' });
                console.log(1);

                const currentDate = new Date();
                const year = currentDate.getFullYear();
                const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                const day = String(currentDate.getDate()).padStart(2, '0');
                const formattedDate = `${year}-${month}-${day}`;

                const filePath = `${user.id}/${formattedDate}/${time}/${new Date().getTime()}.${img.type === 'image' ? 'png' : 'mp4'}`;
                const contentType = image.type === 'image' ? 'image/png' : 'video/mp4';

                const { data, error } = await supabase.storage.from('files').upload(filePath, decode(base64), { contentType });
                if (error) {
                    console.error('Error uploading file:', error.message);
                } else {
                    console.log('File uploaded successfully:', data);
                }
            }
            }
        };

        const performOCR = (file) => {
            var temp;
            let myHeaders = new Headers();
            myHeaders.append(
                "apikey",
                "###"
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

        const pickPDF = async () => {
            console.log('pickPDF');
            if (pdfCounter == 1) {
                setPdf(true);
                alert('You have reached the limit of allowed PDFs');
            } else {
                try {
                    const document = await DocumentPicker.getDocumentAsync({
                        type: 'application/pdf',
                    });

                    console.log('document: ', document);

                    if (document && !document.canceled) {
                        const pdfPath = document.assets[0].uri;

                        console.log('pdfPath: ', pdfPath);

                        var data = new FormData();
                        data.append('file', {
                            uri: pdfPath,
                            name: 'test.pdf',
                            type: 'application/pdf',
                        });

                        axios({
                            method: "post",
                            url: apiUrl,
                            data: data,
                            headers: { "Content-Type": "multipart/form-data", 'Authorization': 'Basic ' + Buffer.from(apiKey + ":").toString('base64') },
                        })
                            .then(function (response) {
                                console.log("OK: ", response.data.results[0].page_data[0].raw_text);
                                var temp = extractedText + response.data.results[0].page_data[0].raw_text;
                                setExtractedText(temp);
                            })
                            .catch(function (response) {
                                console.log("Error: ", response);
                            });
                    }
                } catch (err) {
                    console.error('Error while picking the file:', err);
                }
            }
        };

        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.heading2}>
                    Quizify
                </Text>
                <TouchableOpacity onPress={pickImageGallery} style={styles.button} disabled={limit}>
                    <Text style={{ color: '#fff' }}>Pick an image from gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={pickImageCamera} style={styles.button} disabled={limit}>
                    <Text style={{ color: '#fff' }}>Take a photo</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={pickPDF} style={styles.button} disabled={pdf}>
                    <Text style={{ color: '#fff' }}>Upload PDF file</Text>
                </TouchableOpacity>
                {/* {image && ( 
                <Image 
                    source={{ uri: image }} 
                    style={{ 
                        width: 200, 
                        height: 150, 
                        objectFit: "contain", 
                    }} 
                /> 
            )}  */}
                <Text style={styles.text1}>
                    {''}
                </Text>
                <StatusBar style="auto" />
                <ChatGPT textFromImage={extractedText} time={time}/>
            </SafeAreaView>
        );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "#fdf1bc",
        height: "100%",
    },
    heading2: {
        fontSize: 24,
        marginBottom: 8,
        color: "#fc7474",
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
        backgroundColor: '#fc7474',
        padding: 15,
        borderRadius: 1000,
        width: 300
    }
});