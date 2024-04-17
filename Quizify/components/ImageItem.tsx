import { FileObject } from '@supabase/storage-js';
import { Image, View, ActivityIndicator } from 'react-native';
import { supabase } from '../app/supabase';
import { useState, useEffect } from 'react';

const ImageItem = ({
    item,
    path,
}: {
    item: FileObject;
    path: any;
}) => {
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadImage = async () => {
            try {
                console.log('Path:', path); // Debug log
                const { data } = await supabase.storage
                    .from('files')
                    .download(`${path}/${item.name}`);

                //console.log('Image data:', data); // Debug log

                // Convert Buffer data to Blob
                const blob = new Blob([data]);
                //console.log('Image blob:', blob); // Debug log

                // Read Blob data as Data URL
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                    //console.log('Image loaded:', reader.result); // Debug log
                    setImage(reader.result as string);
                    setLoading(false);
                };
            } catch (error) {
                console.error('Error loading image:', error);
                setLoading(false);
            }
        };

        loadImage();
    }, [item, path]);

    //console.log('Image:', image); // Debug log

    return (
        <View style={{ flexDirection: 'row', margin: 1, alignItems: 'center', gap: 5 }}>
            {loading ? (
                <ActivityIndicator size="small" color="#0000ff" />
            ) : image ? (
                <Image style={{ width: 80, height: 80 }} source={{ uri: "https://ccytoyqkymireiaajlxi.supabase.co/storage/v1/object/public/files/5d52cdfb-b3d4-4cc1-928a-17bb607a3d20/2024-04-17/1713337351362.png" }} />
            ) : (
                <View style={{ width: 80, height: 80, backgroundColor: '#1A1A1A' }} />
            )}
        </View>
    );
};

export default ImageItem;