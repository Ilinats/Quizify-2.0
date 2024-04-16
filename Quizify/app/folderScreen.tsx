import { View, StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import images from '../assets/folderImages/folder';
import React, { useEffect, useState } from 'react'
import {useAuth} from './AuthProvider'
import * as FileSystem from 'expo-file-system'
import { decode } from 'base64-arraybuffer'
import { supabase } from './supabase'
import { FileObject } from '@supabase/storage-js'
import ImageItem from '../components/ImageItem'
import { useLocalSearchParams } from 'expo-router';

const FolderScreen = () => {
  const { user } = useAuth();
  const [files, setFiles] = useState<FileObject[]>([]);

  const {folderName=""} = useLocalSearchParams();
  // const currentDate = new Date();

	// const year = currentDate.getFullYear();
	// const month = String(currentDate.getMonth() + 1).padStart(2, '0');
	// const day = String(currentDate.getDate()).padStart(2, '0');
	// const formattedDate = `${year}-${month}-${day}`;

  // const folderName =formattedDate ; 

  //const path = `files/${folderName}/`;

  useEffect(() => {
    if (!user) return;
   
    loadImages();
  }, [user]);


  const loadImages = async () => {
    const path = `${user!.id}/${folderName}/`;
    const { data } = await supabase.storage.from('files').list(path);
    if (data) {
      setFiles(data);
      console.log(data)
      
    }
  };

  
  const onRemoveImage = async (item: FileObject, listIndex: number) => {
    supabase.storage.from('files').remove([`${user!.id}/${item.name}`]);
    const newFiles = [...files];
    newFiles.splice(listIndex, 1);
    setFiles(newFiles);
  };


  return (
    <View style={styles.body}>
    <View style={styles.container}>
      {/* <FlatList
        data={files}
        numColumns={2} 
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item.image }}
              style={styles.image}
            />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContent}
      /> */}
       <ScrollView>
        {files.map((item, index) => (
          <ImageItem key={item.id} item={item} userId={user!.id} onRemoveImage={() => onRemoveImage(item, index)} />
        ))}
      </ScrollView>


    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  flatListContent: {
    flexGrow: 1,
    justifyContent: 'top',
  },
  imageContainer: {
    flex: 1,
    aspectRatio: 1, 
    margin: 7, 
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  body: {
    flex: 1,
    backgroundColor: '#dcdcdc',
  },
});

export default FolderScreen;