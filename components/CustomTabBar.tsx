import React, { useState } from 'react';
import { Image, Modal, TouchableOpacity, View, Text, Button, Pressable, useColorScheme } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { router } from 'expo-router';
import BottomSheet from './BottomSheet';
import { ThemedView } from './ThemedView';
import { Colors } from '@/constants/Colors';

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const theme = useColorScheme();

    const icons = {
        index: require('../assets/icons/home-outline.png'),
        community: require('../assets/icons/community-outline.png'),
        add: require('../assets/icons/add-outline.png'), 
        bell: require('../assets/icons/bell-outline.png'),
        profile: require('../assets/icons/profile-outline.png'),
    };

    // Custom function to handle "add" button press
    const handleAddPress = () => {
        setModalVisible(true);  // Open the modal when the "add" button is pressed
        // router.navigate("/example");
    };

    return (
        <ThemedView style={{ flexDirection: 'row', paddingVertical: 4, borderTopWidth: 1, }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    if (route.name === 'add') {
                        // Custom behavior for "add" button (no navigation, just function)
                        handleAddPress();
                    } else {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                // Get the correct color based on the theme and focus state
                const tabIconColor = isFocused
                    ? Colors[theme].tabIconSelected
                    : Colors[theme].tabIconDefault;


                // Check if the route name exists in the icons object
                const iconSource = icons[route.name as keyof typeof icons];

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1, alignItems: 'center', padding: 10 }}
                    >
                        {iconSource && (
                            <Image
                                source={iconSource}
                                style={{ 
                                    width: 26, 
                                    height: 26, 
                                    // tintColor: isFocused ? 'red' : 'gray' 
                                    tintColor: tabIconColor
                                }}
                            />
                        )}
                    </TouchableOpacity>
                );
            })}

            {/* Modal for Add functionality */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <BottomSheet setModalVisible={setModalVisible} />
                {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Pressable style={{flex: 1,width: '100%'}} onPress={()=> setModalVisible(false)}/>
                    <View style={{ width: '100%',height: 200, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
                        <Text style={{ marginBottom: 15 }}>Add something here!</Text>
                        <Button title="Close Modal" onPress={() => setModalVisible(false)} />
                    </View>
                </View> */}
            </Modal>
        </ThemedView>
    );
}
