import React from 'react';
import { StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link } from 'expo-router';
import { globalVariable2 } from '../folderIndex';
import FolderComponent from '@/components/FolderComponent';

export default function TabTwoScreen() {
  const handleFolderPress = (folderName) => {
    console.log('Folder pressed:', folderName);
    globalVariable2.Index = Number(folderName[folderName.length - 1]);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <FolderComponent name="16th March5" onPress={() => handleFolderPress('Folder 5')} />
        <FolderComponent name="15th March1" onPress={() => handleFolderPress('Folder 1')} />
        <FolderComponent name="14th March2" onPress={() => handleFolderPress('Folder 2')} />
      </ScrollView>
      <Image style={styles.curve} source={require('../../assets/images/curve.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  curve: {
    position: 'absolute',
    bottom: -330,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  folderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20, // Increase padding
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10, // Increase margin bottom
    width: '100%',
    backgroundColor: '#f6f6f6'
  },
  folderIcon: {
    width: 40, // Increase icon size
    height: 40, // Increase icon size
    marginRight: 15,
  },
  folderName: {
    fontSize: 20, // Increase font size
    color: '#0f0f0f'
  },
});