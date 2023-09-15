import React, { useState } from 'react';
import styles from './style';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import renderItem from './post.js';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
<<<<<<< HEAD
  StatusBar
} from 'react-native';
const HomeScreen = ({ navigation }) => {

=======
} from 'react-native';
const HomeScreen = ({ navigation }) => {
>>>>>>> origin/main
  const data = [
    {
      key: '1',
      avt: require('./../../assets/images/user.jpg'),
      name: 'User 1',
      content: 'Bầu trời hôm nay thật đẹp. Tôi muốn chia sẽ với mọi người',
      imgcontent: require('./../../assets/images/nen.jpg'),
    },
    {
      key: '2',
      avt: require('./../../assets/images/user.jpg'),
      name: 'User 2',
      content: 'Bầu trời hôm nay thật đẹp. Tôi muốn chia sẽ với mọi người',
      imgcontent: require('./../../assets/images/nen.jpg'),
    },
    {
      key: '3',
      avt: require('./../../assets/images/user.jpg'),
      name: 'User 3',
      content: 'Bầu trời hôm nay thật đẹp. Tôi muốn chia sẽ với mọi người',
      imgcontent: require('./../../assets/images/nen.jpg'),
    },
    {
      key: '4',
      avt: require('./../../assets/images/user.jpg'),
      name: 'User 4',
      content: 'Bầu trời hôm nay thật đẹp. Tôi muốn chia sẽ với mọi người',
      imgcontent: require('./../../assets/images/nen.jpg'),
    },
    {
      key: '5',
      avt: require('./../../assets/images/user.jpg'),
      name: 'User 5',
      content: 'Bầu trời hôm nay thật đẹp. Tôi muốn chia sẽ với mọi người',
      imgcontent: require('./../../assets/images/nen.jpg'),
    },
  ];
  const goToDetailScreen = () => {
    navigation.navigate('Chat');
    console.log('Da Chuyen Trang');
  };
  return (
<<<<<<< HEAD
    
    <View style={styles.container}>
      <StatusBar barStyle={'auto'} />
=======
    <View style={styles.container}>
>>>>>>> origin/main
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons
            name='account-circle-outline'
            size={30}
            color='white'
          />
        </View>
        <View style={styles.headerRight}>
          <Image
            source={require('./../../assets/images/logo.png')}
            style={styles.wrap}
          />
        </View>
      </View>
      <View style={styles.line}></View>
      <ScrollView style={styles.bodyContainer}>
        <View style={styles.headerBody}>
          <View style={styles.headerleftBody}>
            <Image
              source={require('./../../assets/images/logo.png')}
              style={styles.wrap}
            />
          </View>
          <View style={styles.headercenterBody}>
            <View style={styles.boderradiusBody}>
              <TextInput
                placeholder='Bạn đang nghĩ gì ?'
                placeholderTextColor='#b1b5b9'
                style={styles.statusheaderBody}
              />
            </View>
          </View>
          <View style={styles.headerrightBody}>
            <MaterialCommunityIcons name='send' size={30} color='white' />
          </View>
        </View>
        <View style={styles.lineBody}></View>
        <View style={styles.contentBody}>
          <FlatList data={data} renderItem={renderItem} />
        </View>
      </ScrollView>

      <View style={styles.line}></View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.bowshadow}>
          <MaterialCommunityIcons name='home' size={30} color='white' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bowshadow}>
          <MaterialCommunityIcons
            name='account-search'
            size={30}
            color='white'
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bowshadow}>
          <MaterialIcons name='notifications-none' size={30} color='white' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bowshadow} onPress={goToDetailScreen}>
          <MaterialCommunityIcons name='gmail' size={30} color='white' />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
