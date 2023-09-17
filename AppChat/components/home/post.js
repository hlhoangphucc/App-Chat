import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
const renderItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.bodyContainer}>
        <View style={styles.left}>
          <Image source={{ uri: item.avt }} style={styles.wrap} />
        </View>
        <View style={styles.right}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.content}>{item.content}</Text>
          {item.imgcontent ? (
            <Image
              source={{ uri: item.imgcontent }}
              style={styles.imgcontent}
            />
          ) : (
            <View style={styles.centeredTextContainer}>
              <Text style={styles.centeredText}></Text>
            </View>
          )}
          <View style={styles.bottomRight}>
            <AntDesign name='hearto' size={20} color='#38444d' />
            <AntDesign name='message1' size={20} color='#38444d' />
            <AntDesign name='sharealt' size={20} color='#38444d' />
          </View>
        </View>
      </View>
      <View style={styles.line}></View>
    </View>
  );
};

export default renderItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  bodyContainer: {
    flexDirection: 'row',
  },
  left: {
    width: '15%',
    alignItems: 'center',
  },
  right: {
    width: '80%',
  },
  bodyRight: {
    width: '90%',
  },
  wrap: {
    resizeMode: 'contain',
    width: '80%',
    height: '20%',
    borderRadius: 100,
  },
  imgcontent: {
    width: '100%',
    height: 150,
    borderRadius: 5,
  },
  name: {
    color: 'white',
  },
  content: {
    color: 'white',
  },
  bottomRight: {
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    color: '#38444d',
  },
  line: {
    height: 1,
    marginTop: 25,
    backgroundColor: '#38444d',
  },
});
