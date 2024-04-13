import { View, StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import images from '../assets/folderImages/folder';
import { globalVariable2 } from './folderIndex';

import React, { useEffect, useState } from 'react'
import {useAuth} from './(auth)/AuthProvider'
import * as FileSystem from 'expo-file-system'
import { decode } from 'base64-arraybuffer'
import { supabase } from './supabase'
import { FileObject } from '@supabase/storage-js'
import ImageItem from '../components/ImageItem'

const FolderScreen = () => {

  const folderIndex = globalVariable2.Index;
  console.log(folderIndex);
  // const filteredImages = images.filter(image => image.folder === folderIndex);

  const { user } = useAuth();
  const [files, setFiles] = useState<FileObject[]>([]);

  useEffect(() => {
    if (!user) return;
    // Load user images
    loadImages();
  }, [user]);

  const loadImages = async () => {
    const { data } = await supabase.storage.from('files').list(user!.id);
    if (data) {
      setFiles(data);
    }
  };

  // const onSelectImage = async () => {
  //   const options: ImagePicker.ImagePickerOptions = {
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //   };

  //   const result = await ImagePicker.launchImageLibraryAsync(options);

  //   // Save image if not cancelled
  //   if (!result.canceled) {
  //     const img = result.assets[0];
  //     const base64 = await FileSystem.readAsStringAsync(img.uri, { encoding: 'base64' });
  //     //console.log(base64);
  //     const filePath = `${user!.id}/${new Date().getTime()}.${img.type === 'image' ? 'png' : 'mp4'}`;
  //     const contentType = img.type === 'image' ? 'image/png' : 'video/mp4';
  //     await supabase.storage.from('files').upload(filePath, decode(base64), { contentType });
  //     await loadImages();//?
  //   }
  // };
  
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