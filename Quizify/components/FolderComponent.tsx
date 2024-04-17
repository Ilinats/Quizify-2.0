import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import  AntDesign  from '@expo/vector-icons/AntDesign';
import {Link} from 'expo-router';

const FolderComponent = ({ folderName, onPress }) =>{
  return (
    <Link href={{pathname:"/(folders)/folderScreen"}} asChild>
    <TouchableOpacity 
      style={styles.folderContainer} 
      onPress={onPress}
    >
      <AntDesign 
        name="book"
        color={'#ff6262'}
        size={40}
        style={{ marginRight: 15, opacity: 0.8 }}
      />
      <Text style={styles.folderName}>{'Quiz ' + folderName}</Text>
    </TouchableOpacity></Link>
  );
}

const styles = StyleSheet.create({
    folderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fafafa',
        borderRadius: 10,
        marginBottom: 15,
        width: '100%',
    },
    folderName: {
        fontSize: 20,
        fontWeight: '500',
    },
});

export default FolderComponent;