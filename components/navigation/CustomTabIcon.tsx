import React from 'react';
import { Image, View, StyleSheet, ImageSourcePropType, Text } from 'react-native';

interface CustomTabIconProps {
  iconName: string; // Expecting a string name to match with a static require
  color: any; // Expecting a string name to match with a static require
}

const iconMap: { [key: string]: ImageSourcePropType } = {
  home: require('../../assets/icons/home-outline.png'),
  community: require('../../assets/icons/community-outline.png'),
  add: require('../../assets/icons/add-outline.png'),
};

const CustomTabIcon: React.FC<CustomTabIconProps> = ({ iconName, color }) => {
  const iconSource = iconMap[iconName] || iconMap['home'];

  return (
    <View style={styles.container}>
      <Image source={iconSource} style={[styles.image]} />
      {/* <Text onPress={()=> console.log(color)}>sdsds</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 28,
    width: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default CustomTabIcon;
