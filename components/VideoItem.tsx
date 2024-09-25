import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Video, ResizeMode } from 'expo-av';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { setCurrentPlayingVideo } from '../hooks/redux/store'; // Import action

const screenWidth = Dimensions.get('window').width; // Get screen width

const VideoItem = ({ item, isVisible, currentPlayingVideo, setCurrentPlayingVideo }) => {
    const videoRef = useRef(null);
    const [videoSize, setVideoSize] = useState({ width: screenWidth, height: 350 });

    useEffect(() => {
        if (videoRef.current) {
            if (isVisible && currentPlayingVideo === item.id) {
                videoRef.current.playAsync();
            } else {
                videoRef.current.pauseAsync();
            }
        }
    }, [isVisible, currentPlayingVideo]);

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
                onError={(error) => console.log('error', error)}
                onPlaybackStatusUpdate={(status) => {
                    if (status.isPlaying && currentPlayingVideo !== item.id) {
                        setCurrentPlayingVideo(item.id); // Set the current playing video
                    }
                }}
            />
            <View style={{ padding: 16 }}>
                <Text>Video ID: {item.id}</Text>
            </View>
        </View>
    );
};

// Styles for the component
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

// Map Redux state to props
const mapStateToProps = (state) => ({
    currentPlayingVideo: state.currentPlayingVideo,
});

// Map dispatch to props
const mapDispatchToProps = {
    setCurrentPlayingVideo,
};

// Connect VideoItem to Redux
export default connect(mapStateToProps, mapDispatchToProps)(VideoItem);
