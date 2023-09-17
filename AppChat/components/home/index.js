import React, { useState, useEffect, useRef } from 'react';
import styles from './style';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import renderItem from './post.js';
import { ref, onValue, set, update, push } from 'firebase/database';
import { db } from '../../firebase';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
const HomeScreen = ({ navigation }) => {
  const [todoData, setTodoData] = useState([]);
  const flatListRef = useRef(null);
  const route = useRoute();
  const receivedData = route.params.username;

  useEffect(() => {
    const startCountRef = ref(db, 'NewPosts/');
    onValue(startCountRef, (snapshot) => {
      const data = snapshot.val();
      const newPosts = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setTodoData(newPosts);
    });
  }, []);

  const goToNewPostScreen = () => {
    navigation.navigate('Newposts', {
      todoData: todoData,
      username: receivedData,
    });
  };

  const goToChatScreen = () => {
    navigation.navigate('Chat', { username: receivedData });
  };

  const handlePress = () => {
    scrollToTop();
  };
  return (
    <View style={styles.container}>
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
      <View style={styles.bodyContainer}>
        <View style={styles.headerBody}>
          <View style={styles.headerleftBody}>
            <Image
              source={require('./../../assets/images/logo.png')}
              style={styles.wrapBody}
            />
          </View>
          <View style={styles.headercenterBody}>
            <TouchableOpacity
              style={styles.boderradiusBody}
              onPress={goToNewPostScreen}
            >
              <Text style={styles.boderText}>Bạn đang nghĩ gì ? </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.headerrightBody}>
            <TouchableOpacity onPress={handlePress}>
              <MaterialCommunityIcons name='send' size={30} color='white' />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.lineBody}></View>
        <View style={styles.contentBody}>
          <FlatList
            ref={flatListRef}
            data={todoData.reverse()}
            renderItem={renderItem}
          />
        </View>
      </View>

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
        <TouchableOpacity style={styles.bowshadow} onPress={goToChatScreen}>
          <MaterialCommunityIcons name='gmail' size={30} color='white' />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
