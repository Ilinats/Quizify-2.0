import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { useAuth } from './AuthProvider';
import { supabase } from './supabase';

const FolderScreen = () => {
    const { user } = useAuth();
    const [files, setFiles] = useState<any>([]);
    const [image, setImage] = useState<string | null>(null);
    var sth;

    useEffect(() => {
        if (!user) return;
        loadImages();
    }, [user]);

    useEffect(() => {
        //console.log('Files:', files); // Debug log
        //console.log('Files1:', files[0]); // Debug log
    }, [files]);

    useEffect(() => {
        //console.log('Image:', image); // Debug log
    }, [image]);

    const loadImages = async () => {
        const path = `${user?.id}/`; // Ensure the path is correct
        const { data } = await supabase.storage.from('files').list(path);

        if (!data)
            return;

        const { data: extractedData } = await supabase.storage.from('files').list(`${user?.id}/${data[0].name}`);
        sth = `${user?.id}/${data[0].name}`;
        //console.log('STH:', sth);
        //console.log('Extracted Data:', extractedData); // Debug log

        if (!extractedData)
            return;

        // const { data: image } = await supabase.storage.from('files').download(`${sth}/${extractedData[0].name}`)
        // const fr = new FileReader()
        // fr.readAsDataURL(image as Blob)
        // fr.onload = () => {
        //     setImage(fr.result as string)
        // }
        // console.log('Image:', image);

        supabase.storage
            .from('files')
            .download(`${sth}/${extractedData[0].name}`)
            .then(({ data }) => {
                const fr = new FileReader()
                fr.readAsDataURL(data!)
                fr.onload = () => {
                    setImage(fr.result as string)
                }
            })

        try {
            if (extractedData) {
                setFiles(extractedData); // Set extractedData to files
            }
        } catch (error) {
            console.error('Error loading images:', error);
        }
    };

    return (
        <View style={styles.body}>
            <View style={styles.container}>
                <ScrollView>
                    {image && <Image source={{ uri: image }} style={{ width: 80, height: 80 }} />}
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
    body: {
        flex: 1,
        backgroundColor: '#dcdcdc',
    },
});

export default FolderScreen; // Export the component here