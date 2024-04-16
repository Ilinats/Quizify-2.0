import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {Link} from 'expo-router';

// const FolderComponent = ({ name, onPress }) => {
//     return (
//       <Link href="/folderScreen" asChild>
//       <TouchableOpacity onPress={onPress} style={styles.folderContainer}>
//         <FontAwesome
//           name="folder"
//           color={'#ff6262'}
//           size={40}
//           style={{ marginRight: 15, opacity: 0.8}}
//         />
//         <Text style={styles.folderName}>{name}</Text>
//       </TouchableOpacity>
//       </Link>
//     );
// };


const FolderComponent = ({ folderName, onPress }) =>{
  return (
    <Link href={{pathname:"/folderScreen", params:{folderName:folderName}}} asChild>
    <TouchableOpacity 
      style={styles.folderContainer} 
      onPress={onPress}
    >
      <FontAwesome
        name="folder"
        color={'#ff6262'}
        size={40}
        style={{ marginRight: 15, opacity: 0.8 }}
      />
      <Text style={styles.folderName}>{folderName}</Text>
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