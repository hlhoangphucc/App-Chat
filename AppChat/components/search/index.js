import React, { useState } from 'react';
import {
  View,
  Image,
  ScrollView,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Text,
} from 'react-native';

const images = [
  require('./../../assets/images/logo.png'),
  require('./../../assets/images/fast.png'),
  require('./../../assets/images/gift.png'),
  require('./../../assets/images/unlitmitted.png'),
  require('./../../assets/images/security.png'),
  require('./../../assets/images/cloud.png'),
];

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const SearchScreen = () => {
  const [imgActive, setimgActive] = useState(0);

  onchange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
      );
      if (slide != imgActive) {
        setimgActive(slide);
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrap}>
        <ScrollView
          onScroll={({ nativeEvent }) => onchange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={styles.wrap}
          scrollEventThrottle={16}
        >
          {images.map((e, index) => {
            return (
              <Image
                key={e}
                resizeMode='stretch'
                style={styles.wrap}
                source={e}
              />
            );
          })}
        </ScrollView>
        <View style={styles.wrapDot}>
          {images.map((e, index) => {
            return (
              <Text
                key={e}
                style={imgActive == index ? styles.dotActive : styles.dot}
              >
                ●
              </Text>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrap: {
    height: HEIGHT * 0.25,
    width: WIDTH,
  },
  wrapDot: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dotActive: {
    margin: 3,
    color: 'black',
  },
  dot: {
    margin: 3,
    color: 'white',
  },
});
export default SearchScreen;
