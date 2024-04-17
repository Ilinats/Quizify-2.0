import React from 'react';
import { StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native';
import { Text, View } from '@/components/Themed';
import { useState, useEffect } from 'react';
import { useAuth } from '../../providers/AuthProvider';
import { supabase } from '../../lib/supabase'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Folder } from '../folderIndex';
import { Link } from 'expo-router';

export default function TabTwoScreen() {
    const { user } = useAuth();
    const [folders, setFolders] = useState([]);

    useEffect(() => {
        loadFolders();
    }, []);

    const loadFolders = async () => {
        try {
            const { data, error } = await supabase.storage.from('files').list(user!.id);
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
            const { data, error } = await supabase.storage.from('files').list(user!.id);
            if (error) {
                console.error('Error fetching:', error.message);
                return;
            }
            if (data) {
                // Handle setting images here, depending on how you structure your app
                console.log('Fetched data: ', data);
            }
        } catch (error) {
            console.error('Error loading images:', error.message);
        }
    };

    function onPress(folderName: string) {
        Folder.FolderName = folderName;
        console.log(Folder.FolderName);
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            {folders.map((folderName, index) => (
    <Link key={index} href="/quizesFolders" asChild>
        <TouchableOpacity
            style={styles.folderContainer}
            onPress={() => onPress(folderName)}
            key={index}
        >
            <FontAwesome
                name="folder"
                color={'#ff6262'}
                size={40}
                style={{ marginRight: 15, opacity: 0.8 }}
            />
            <Text style={styles.folderName}>{folderName}</Text>
        </TouchableOpacity>
    </Link>
))}
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