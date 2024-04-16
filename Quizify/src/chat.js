import React,  { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import axios from 'axios';
import Button from '../components/Button';
import {globalVariable} from '../globals';
import {Link} from 'expo-router';

import * as FileSystem from 'expo-file-system'
import { decode } from 'base64-arraybuffer'
import { supabase } from '../app/supabase'
import { useAuth } from '../app/AuthProvider'

const ChatGPT = ({textFromImage}) => {
  const {user} = useAuth()
    const apiKey = '###'
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    const [answerLocked, setAnswerLocked] = useState(true);
    const handleSend = async () => {
      console.log('aa');
      var questions;

      console.log(textFromImage, typeof textFromImage);

      const response = await axios.post(apiUrl, {
          
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "You are a helpful assistant."
              },
              {
                role: "user",
                content: "Generate two questions with 4 answers based on this text. The format should be JSON and it should have a is_correct value for each answer (the answer var should be calle 'answer')." + textFromImage //malko da se opravi
              }
            ],
            max_tokens: 400,
          },
          //stop: ["."]
       {
          headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
          }
      }).then(response => {
        console.log(response);
          questions = response;
          globalVariable.GPTOutput = response.data.choices[0].message.content;
          console.log(globalVariable.GPTOutput);
          setAnswerLocked(false)
          //json save globalVariable.GPTOutput
          uploadJSONFile('gpt.json',globalVariable.GPTOutput)
          
      })
      .catch(error => {
          console.log(error);
      });

      console.log('bb');
  };

  const uploadJSONFile = async (fileName, jsonData) => {
    try {
      // Convert JSON data to string
      const jsonString = JSON.stringify(jsonData);
  
      // Upload JSON file to Supabase Storage

      const currentDate = new Date();

			const year = currentDate.getFullYear();
			const month = String(currentDate.getMonth() + 1).padStart(2, '0');
			const day = String(currentDate.getDate()).padStart(2, '0');
			const formattedDate = `${year}-${month}-${day}`;
      const filePath = `${user.id}/${formattedDate}/test.json`;

      const { data, error } = await supabase.storage.from('files').upload(filePath,jsonData,fileName );
  
      if (error) {
        console.error('Error uploading JSON file:', error.message);
        return null;
      }
  
      console.log('JSON file uploaded successfully:', data);
      return data;
    } catch (error) {
      console.error('Error uploading JSON file:', error.message);
      return null;
    }
  };
  

  return (
    <View>
      { answerLocked ? <Button text="Send" onPress={handleSend} /> : <Link href={'/quizScreen'} asChild>
        <Pressable style={styles.container}>
        <Text style={styles.text}>Start Quiz</Text>
        </Pressable>
      </Link> }
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  container: {
		marginTop: 40,
		marginVertical: -10,
		marginHorizontal: 30,
		alignItems: 'center',
		backgroundColor: '#ff6262',
		padding: 15,
		borderRadius: 1000,
		width: 300
	},
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});

export default ChatGPT;