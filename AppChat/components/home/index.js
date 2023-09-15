import React, { useState, useEffect, useRef } from 'react';
import styles from './style';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import renderItem from './post.js';
import { ref, onValue, set, update, push } from 'firebase/database';
import { db, firebase } from '../../firebase';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from 'firebase/storage';
const HomeScreen = ({ navigation }) => {
  const [todoData, setTodoData] = useState([]);
  const flatListRef = useRef(null);
  const [mediaData, setmediaData] = useState([]);
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
    navigation.navigate('Newposts', { todoData: todoData });
    console.log('Da Chuyen Trang');
  };

  const goToChatScreen = () => {
    navigation.navigate('Chat');
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
