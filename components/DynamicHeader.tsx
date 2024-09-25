import React, { useRef, useState } from "react";
import { Animated, Dimensions, FlatList, Image, Pressable, StyleSheet, Text, useColorScheme } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";


const Header_Max_Height = 84;
const Header_Min_Height = 0;
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

export const DynamicHeader = ({
  value,
  lightColor,
  darkColor,
  navigation,
}: any) => {
  const [activeTab, setActiveTab] = useState(0)

  const colorScheme = useColorScheme();

  const screenWidth = Dimensions.get('window').width; // Get screen width
  const themeColor = useThemeColor({ light: lightColor, dark: darkColor }, 'tint');
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  const animatedHeaderHeight = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: 'clamp',
  })

  const animateHeaderColor = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [backgroundColor, backgroundColor],
    extrapolate: 'clamp',
  })

  return (
    <Animated.View style={[styles.header, {
      height: animatedHeaderHeight,
      backgroundColor: animateHeaderColor,
      borderBottomWidth: 1,
      borderColor: 'black'
    }]}>
      {/* <ThemedView style={styles.parentHeader}> */}
      <ThemedView style={[styles.childHeader, {
        width: screenWidth,
      }]}>
        <ThemedView style={styles.leftHeader}>
          <Ionicons onPress={() => navigation.openDrawer()} name='menu' size={32} color={themeColor} />
          <ThemedView>

            <Image source={require('../assets/images/lahelu-logo.png')} style={{ width: 84, height: '100%' }} resizeMode="center" />
          </ThemedView>
        </ThemedView>
        <Ionicons name='search' size={32} color={themeColor} />
      </ThemedView>
      {/* </ThemedView> */}
    </Animated.View>
  )
}



const styles = StyleSheet.create({
  header: {
    paddingTop: 24,
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
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    paddingBottom: 1,
    paddingHorizontal: 16
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  childPressable: {
    // backgroundColor: 'white'
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
  },
  childText: {
    fontSize: 16,
    fontWeight: 'bold'
  }

});