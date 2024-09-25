import React, { useRef, useState } from "react";
import { Animated, Dimensions, FlatList, Pressable, StyleSheet, Text, useColorScheme } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";


const Header_Max_Height = 42;
const Header_Min_Height = 10;
const Scroll_Distance = Header_Max_Height - Header_Min_Height;

const dataProps = [
  {
    id: "1",
    title: "Home",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    id: "2",
    title: "Fresh",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    id: "3",
    title: "Trending",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  }
];

export const DynamicTab = ({
  value,
  lightColor,
  darkColor,
  valueTab
}: any) => {
  const [activeTab, setActiveTab] = useState(valueTab)

  const colorScheme = useColorScheme();

  const screenWidth = Dimensions.get('window').width; // Get screen width
  const themeColor = useThemeColor({ light: lightColor, dark: darkColor }, 'tint');

  const animatedHeaderHeight = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: 'clamp',
  })

  const animateHeaderColor = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: ['black', 'black'],
    extrapolate: 'clamp',
  })

  return (
    <Animated.View style={[styles.header, {
      height: animatedHeaderHeight,
      backgroundColor: animateHeaderColor,
      // borderBottomWidth: 1,
      // borderColor: 'black'
    }]}>
      {/* <ThemedView style={styles.parentHeader}> */}
      <FlatList
        data={dataProps}
        contentContainerStyle={styles.parentHeader}
        renderItem={({ item, index }) =>
          <ThemedView style={[styles.childHeader, {
            width: screenWidth / dataProps.length,
          }]}>
            <Pressable
              onPress={() => setActiveTab(index)}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? colorScheme === 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  borderBottomWidth: activeTab === index ? 3 : 1,
                  borderColor: activeTab === index ? themeColor : 'black'
                },
                styles.childPressable
              ]}>
              <ThemedText style={[styles.childText, { color: activeTab === index ? themeColor : 'white' }]}>{item.title}</ThemedText>
            </Pressable>
          </ThemedView>
        }
      />
      {/* </ThemedView> */}
    </Animated.View>
  )
}



const styles = StyleSheet.create({
  header: {
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  container: {
    // flex: 1,
    // justifyContent: "center",
    // backgroundColor: "#ecf0f1",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  parentHeader: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  childHeader: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 1,
  },
  childPressable: {
    // backgroundColor: 'white'
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 7,
  },
  childText: {
    fontSize: 16,
    fontWeight: 'bold'
  }

});