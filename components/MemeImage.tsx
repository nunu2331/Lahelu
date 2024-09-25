import { StyleSheet, View, Text, Image, useColorScheme, FlatList, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import CustomVideo from './CustomVideo';
import { ThemedView } from './ThemedView';

type MemeImageItemProps = {
  character: any;
};

const dataTags = [
  {
    id: "1",
    title: "Sawer",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    type: 'donate'
  },
  {
    id: "2",
    title: "kny",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    type: 'tags'
  },
  {
    id: "3",
    title: "demonslayer",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    type: 'tags'
  },
  {
    id: "4",
    title: "gabut",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    type: 'tags'
  },
  {
    id: "5",
    title: "absurd",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    type: 'tags'
  },
  {
    id: "6",
    title: "gila",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    type: 'tags'
  }
];

const dataVote =
{
  upVote: 22,
  downVote: 0,
  comments: 2
}


export const MemeImage = ({ character }: MemeImageItemProps) => {

  const colorScheme = useColorScheme();
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedView style={styles.leftHeader}>
          <Image style={styles.profileWrapper} source={require('../assets/images/react-logo.png')} resizeMode='contain' />
          <ThemedText style={styles.name}>{character.name}</ThemedText>
          <ThemedText style={styles.dot}>{'\u2B24'}</ThemedText>
          <ThemedText style={styles.time}>{'11 jam '}</ThemedText>
        </ThemedView>
        <Image style={[styles.more, { tintColor: colorScheme === 'dark' ? '#ECEDEE' : '#11181C' }]} source={require('../assets/icons/more.png')} />
      </ThemedView>
      <ThemedView style={styles.body}>
        <ThemedText style={styles.bodyText}>{character.location.name}</ThemedText>
        <Image source={{ uri: character.image }} style={styles.image} />
        <ThemedView style={styles.bodyTag}>
          <FlatList
            data={dataTags}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) =>
              <ThemedView style={[styles.tagWrapper, {
                borderColor: item.type === 'donate' ? 'transparent' : '#393939',
                backgroundColor: item.type === 'donate' ? '#db9529' : 'transparent'
              }]}>
                {item.type === 'donate' ?
                  <Image style={[styles.tagIcon, { tintColor: colorScheme === 'dark' ? '#ECEDEE' : '#11181C' }]} source={require('../assets/icons/coin.png')} />
                  :
                  <Image style={[styles.tagIcon, { tintColor: colorScheme === 'dark' ? '#ECEDEE' : '#11181C' }]} source={require('../assets/icons/hash.png')} />
                }
                <ThemedText style={[styles.tagTitle, {
                }]}>{item.title}</ThemedText>
              </ThemedView>
            }
          />
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.footer} >
        <ThemedView style={{flexDirection: 'row'}}>

          <ThemedView style={[styles.voteWrapper, {

            borderColor: colorScheme === 'dark' ? '#393939' : '#11181C',
          }]}>
            <TouchableOpacity style={styles.voteSection}>
              <Image style={[styles.voteIcon,
              {
                tintColor: colorScheme === 'dark' ? '#ECEDEE' : '#11181C',
                transform: [{ rotate: '180deg' }],

              }]}
                source={require('../assets/icons/arrow-down.png')} />

              <ThemedText style={styles.voteText}>
                {dataVote.upVote}
              </ThemedText>
            </TouchableOpacity>
            <ThemedView style={styles.verticalLine} />
            <TouchableOpacity style={styles.voteSection}>
              <Image style={[styles.voteIcon, { tintColor: colorScheme === 'dark' ? '#ECEDEE' : '#11181C' }]} source={require('../assets/icons/arrow-down.png')} />
            </TouchableOpacity>
          </ThemedView>

          <ThemedView style={[styles.voteWrapper, {

            borderColor: colorScheme === 'dark' ? '#393939' : '#11181C',
          }]}>
            <TouchableOpacity style={styles.voteSection}>
              <Image style={[styles.voteIcon,
              {
                tintColor: colorScheme === 'dark' ? '#ECEDEE' : '#11181C',

              }]}
                source={require('../assets/icons/comment.png')} />

              <ThemedText style={styles.voteText}>
                {dataVote.comments}
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>

        <ThemedView style={[styles.voteWrapper, {

          borderColor: colorScheme === 'dark' ? '#393939' : '#11181C',
        }]}>
          <TouchableOpacity style={styles.voteSection}>
            <Image style={[styles.voteIcon,
            {
              tintColor: colorScheme === 'dark' ? '#ECEDEE' : '#11181C',

            }]}
              source={require('../assets/icons/share.png')} />
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>

      {/* <CustomVideo/> */}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'white',
    paddingVertical: 16
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
    justifyContent: 'space-between'
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileWrapper: {
    width: 34,
    height: 34,
    borderRadius: 9999,
    backgroundColor: 'grey',
    marginRight: 8
  },
  name: {
    fontSize: 13,
    fontWeight: 'bold',
    // alignSelf: 'center',
  },
  dot: {
    fontSize: 3,
    fontWeight: 'bold',
    marginHorizontal: 6,
  },
  time: {
    fontSize: 13,
    fontWeight: 'ultralight',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  more: {
    width: 18,
    height: 18,
  },
  body: {
  },
  bodyText: {
    fontWeight: 'bold',
    marginBottom: 8,
    paddingLeft: 16,
  },
  bodyTag: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    paddingHorizontal: 16
    // borderWidth: 1,
    // borderColor: 'white'
  },
  tagWrapper: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 9999,
    paddingVertical: 2,
    paddingHorizontal: 12,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  tagTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  tagIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
    resizeMode: 'contain'
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 8,
  },
  voteWrapper: {
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  voteSection: {
    alignItems: 'center',
    paddingVertical: 10,
    flexDirection: 'row',
    paddingHorizontal: 12,
    // borderWidth: 1,
    borderColor: 'white'
  },
  verticalLine: {
    width: 1,
    height: '100%',
    backgroundColor: '#393939',
  },
  voteIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  voteText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8
  }
});
