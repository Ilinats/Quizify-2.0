import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, FlatList } from 'react-native';
import { useAuth } from './AuthProvider';
import { supabase } from './supabase';

const FolderScreen = () => {
    const { user } = useAuth();
    const [files, setFiles] = useState<any>([]);
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    var sth;

    useEffect(() => {
        if (!user) return;
        loadImages();
    }, [user]);

    const loadImages = async () => {
        const path = `${user?.id}/`;
        const { data } = await supabase.storage.from('files').list(path);

        if (!data) return;

        const { data: extractedData } = await supabase.storage.from('files').list(`${user?.id}/${data[0].name}`);
        sth = `${user?.id}/${data[0].name}`;

        if (!extractedData) return;

        console.log('Extracted data:', extractedData);

        for (let i = 0; i < extractedData.length; i++) {
            supabase.storage
                .from('files')
                .download(`${sth}/${extractedData[i].name}`)
                .then(({ data }) => {
                    if(extractedData[i].metadata.mimetype != 'image/png' && extractedData[i].metadata.mimetype != 'image/jpeg') 
                        return;
                    const fr = new FileReader();
                    fr.readAsDataURL(data!);
                    fr.onload = () => {
                        setImages(prevImages => [...prevImages, fr.result as string]);
                    };
                });
        }

        try {
            if (extractedData) {
                setFiles(extractedData);
            }
        } catch (error) {
            console.error('Error loading images:', error);
        }
    };

    const renderItem = ({ item }: { item: string }) => (
        <View style={styles.imageContainer}>
            <Image source={{ uri: item }} style={styles.image} />
        </View>
    );

    return (
        <View style={styles.body}>
            <FlatList
                data={images}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2} // Set the number of columns
                contentContainerStyle={styles.flatListContent}
            />
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
        justifyContent: 'flex-start', // Adjust as needed
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