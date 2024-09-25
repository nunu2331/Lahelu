import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';
import { useEffect, useRef, useState } from 'react';

import { Text, View, StyleSheet, Dimensions, FlatList } from 'react-native';

const screenWidth = Dimensions.get('window').width; // Get screen width

const CustomVideo = () => {
    const [viewableItems, setViewableItems] = useState([]);

    const data = [
        { id: '1', uri: 'https://firebasestorage.googleapis.com/v0/b/expo-storage-37109.appspot.com/o/4646327-hd_720_1366_50fps.mp4?alt=media&token=a1c2054b-3f7b-4599-b5a6-4dfe3b3b45a1' },
        { id: '2', uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' },
        { id: '3', uri: 'https://firebasestorage.googleapis.com/v0/b/expo-storage-37109.appspot.com/o/1409899-hd_1280_720_25fps.mp4?alt=media&token=685d5580-d8b9-4e68-a0a7-b635256dcf54' },
        { id: '4', uri: 'https://firebasestorage.googleapis.com/v0/b/expo-storage-37109.appspot.com/o/6134614-hd_1080_1188_30fps.mp4?alt=media&token=40e18f40-cf4d-4c2c-8b55-ba4218c7156b' },
    ];
    const dataAman = [
        { id: '1', uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' },
        { id: '2', uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' },
        { id: '3', uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' },
        { id: '4', uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' },
    ];

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 75,
    };

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        setViewableItems(viewableItems.map(item => item.item.id)); // Update visible items
    }).current;

    return (
        <View style={{ flex: 1, marginTop: 50 }}>
            <FlatList
                data={dataAman}
                renderItem={({ item }) => <VideoItem item={item} isVisible={viewableItems.includes(item.id)} />}
                keyExtractor={(item) => item.id}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
            />
        </View>
    );
};

const VideoItem = ({ item, isVisible }) => {
    const videoRef = useRef(null);
    const [videoSize, setVideoSize] = useState({ width: screenWidth, height: 350 });

    useEffect(() => {
        if (videoRef.current) {
            if (isVisible) {
                videoRef.current.playAsync();
            } else {
                videoRef.current.pauseAsync();
            }
        }
    }, [isVisible]);

    return (
        <View style={styles.container}>
            <Video
                ref={videoRef}
                style={[styles.video, { width: videoSize.width, height: videoSize.height }]}
                source={{ uri: item.uri }}
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                onReadyForDisplay={(data) => {
                    const { width, height } = data.naturalSize;
                    setVideoSize({ width: screenWidth, height: screenWidth * (height / width) });
                }}
                onError={(error)=> console.log('error', error)}
            />
            <View style={{ padding: 16 }}>
                <Text onPress={()=> console.log('data video', videoSize)}>Video ID: {item.id}</Text>
            </View>
        </View>
    );
};

export default CustomVideo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        marginBottom: 20,
    },
    video: {
        alignSelf: 'center',
    },
});