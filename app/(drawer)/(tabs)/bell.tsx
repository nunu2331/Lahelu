import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';
import { useEffect, useRef, useState } from 'react';

import { Text, View, StyleSheet, Dimensions, FlatList } from 'react-native';

const screenWidth = Dimensions.get('window').width; // Get screen width

const Example = () => {
    const [viewableItems, setViewableItems] = useState([]);

    const data = [
        { id: '1', uri: 'https://firebasestorage.googleapis.com/v0/b/rumahwow-dev.appspot.com/o/18699647-uhd_2160_3840_60fps.mp4?alt=media&token=5981f5be-efab-4151-92e1-edacc4ff2e78' },
        { id: '2', uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' },
        { id: '3', uri: 'https://firebasestorage.googleapis.com/v0/b/rumahwow-dev.appspot.com/o/2795394-uhd_2160_3840_25fps.mp4?alt=media&token=b96012ef-8e98-4808-ae12-867cc920e6f7' },
        { id: '4', uri: 'https://firebasestorage.googleapis.com/v0/b/rumahwow-dev.appspot.com/o/6134614-hd_1080_1188_30fps.mp4?alt=media&token=8ba90a1b-0ed6-4a96-88a2-c9f0200758da' },
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
                data={data}
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
            />
            <View style={{ padding: 16 }}>
                <Text>Video ID: {item.id}</Text>
            </View>
        </View>
    );
};

export default Example;

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