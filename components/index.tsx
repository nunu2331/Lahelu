import React, { useState, useEffect, useRef } from 'react';
import { Text, View, FlatList, SafeAreaView, ActivityIndicator, StyleSheet, Animated } from 'react-native';
import { MemeImage } from '@/components/MemeImage';
import { Header } from '@/components/Header';
import { DynamicTab } from '@/components/DynamicTab';
import CustomVideo from '@/components/CustomVideo';

const initialPage = 'https://rickandmortyapi.com/api/character';

export default function Home() {
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
      <DynamicTab value={scrollOffsetY}/>

      <FlatList
        data={items}
        scrollEventThrottle={5}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollOffsetY}}}],
          {
            useNativeDriver: false,
          }
        )}
        renderItem={({ item }) => 
          <CustomVideo/>
        // <MemeImage character={item} />
      }
        contentContainerStyle={{ gap: 10}}
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
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  
});
