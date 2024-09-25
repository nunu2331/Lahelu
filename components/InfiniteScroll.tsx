import React, { useState, useEffect, useRef } from 'react';
import { Text, View, FlatList, SafeAreaView, ActivityIndicator, StyleSheet, Animated } from 'react-native';
import { CharacterListItem } from '@/components/MemeImage';
import { Header } from '@/components/Header';

const initialPage = 'https://rickandmortyapi.com/api/character';


const Header_Max_Height = 240;
const Header_Min_Height = 120;
const Scroll_Distance = Header_Max_Height - Header_Min_Height;

const DynamicHeader = ({value}: any) => {

  const animatedHeaderHeight = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: 'clamp',
  })

  const animateHeaderColor = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: ['#181D31', '#678983'],
    extrapolate: 'clamp',
  })

  return (
    <Animated.View style={[styles.header, {
      height: animatedHeaderHeight,
      backgroundColor: animateHeaderColor,
    }]}>
      <Text>Header COntent</Text>
    </Animated.View>
  )
}

export default function InfiniteScroll() {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [nextPage, setNextPage] = useState('');
  const scrollOffsetY = useRef(new Animated.Value(0)).current;


  const fetchPage = async (url: string) => {
    if(loading){
      return;
    }

    console.log('fetching', url)
    setLoading(true);
    const response = await fetch(url);
    const responseJson = await response.json();

    setItems((existingItems) => {
      return [...existingItems, ...responseJson.results];
    });
    setNextPage(responseJson.info.next);

    setLoading(false);
  };

  const onRefresh = () => {
    setItems([]);
    // setNextPage(initialPage);
    fetchPage(initialPage);
  }

  useEffect(()=> {
    fetchPage(initialPage);
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      {/* <Header character={undefined} /> */}
      <DynamicHeader value={scrollOffsetY}/>

      <FlatList
        data={items}
        scrollEventThrottle={5}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollOffsetY}}}],
          {
            useNativeDriver: false,
          }
        )}
        renderItem={({ item }) => <CharacterListItem character={item} />}
        contentContainerStyle={{ gap: 10 }}
        onEndReached={()=> fetchPage(nextPage)}
        onEndReachedThreshold={5}
        ListFooterComponent={() => loading && <ActivityIndicator/>}

        refreshing={loading}
        onRefresh={onRefresh}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    paddingTop: 25,
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
  
});
