import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, FlatList, TouchableWithoutFeedback, Modal, ActivityIndicator } from 'react-native';
import { useAuth } from './AuthProvider';
import { supabase } from './supabase';
import ImageViewer from 'react-native-image-zoom-viewer';

const FolderScreen = () => {
    const { user } = useAuth();
    const [files, setFiles] = useState<any>([]);
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<string>('');
    var sth;

    useEffect(() => {
        if (!user) return;
        loadImages();
    }, [user]);

    useEffect(() => {
        if (images.length > 0) {
            setLoading(false);
        }
    }, [images]);

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
        <TouchableWithoutFeedback onPress={() => {setSelectedImage(item); setModalVisible(true); }}>
        <View style={styles.imageContainer}>
            <Image source={{ uri: item }} style={styles.image} />
        </View>
        </TouchableWithoutFeedback>
    );

    return (
        <View style={styles.body}>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <FlatList
                    data={images}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    contentContainerStyle={styles.flatListContent}
                />
            )}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => { setModalVisible(false); }}
            >
                <ImageViewer
                    imageUrls={[{ url: selectedImage }]}
                    enableSwipeDown={true}
                    onSwipeDown={() => { setModalVisible(false); }}
                    backgroundColor="rgba(0, 0, 0, 0.9)"
                    renderIndicator={() => null} //dori da e cherveno bachka
                />
            </Modal>
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
        justifyContent: 'flex-start',
    },
    imageContainer: {
        flex: 1,
        aspectRatio: 1,
        margin: 7,
        borderRadius: 10,
        overflow: 'hidden',
        maxWidth: '50%',
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalImage: {
        width: '100%',
        height: '100%',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default FolderScreen;