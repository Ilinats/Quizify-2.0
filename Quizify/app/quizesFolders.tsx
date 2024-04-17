import React from 'react';
import { StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Text, View } from '@/components/Themed';
import FolderComponent from '@/components/FolderComponent';
import { useState, useEffect } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { supabase } from '../lib/supabase'
import { Folder } from './folderIndex';

export default function TabTwoScreen() {
  const { user } = useAuth();
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFolders();
  }, []);

  useEffect(() => {
    if (folders.length > 0) {
      setLoading(false);
    }
  }, [folders]);

  const loadFolders = async () => {
    try {
        const path = `${user?.id}/${Folder.FolderName}/`;
        const { data, error } = await supabase.storage.from('files').list(path);
        if (error) {
            console.error('Error fetching folders:', error.message);
            return;
        }
        if (data) {
            setFolders(data.map(item => item.name)); // Extracting folder names from data
        }
    } catch (error) {
      console.error('Error loading folders:', error.message);
    }
  };

  const handleFolderPress = async (folderName) => {
    try {
      const path = `${user!.id}/${folderName}/`;
      console.log(path);
      Folder.QuizName = folderName;
      const { data, error } = await supabase.storage.from('files').list(user!.id);
      if (error) {
        console.error('Error fetching:', error.message);
        return;
      }
    } catch (error) {
      console.error('Error loading images:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (<ScrollView contentContainerStyle={styles.scrollViewContainer}>
                {folders.map((folderName, index) => (
               <FolderComponent 
                 key={index} 
                 folderName={index + 1} 
                 onPress={() => handleFolderPress(folderName)}
               />
             ))}
           </ScrollView>
        )}
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});