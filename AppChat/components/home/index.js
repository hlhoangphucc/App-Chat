import React, { useState, useEffect, useRef } from 'react';
import styles from './style';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import renderItem from './post/posts';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  ref,
  onValue,
  query,
  orderByChild,
  equalTo,
  get,
} from 'firebase/database';
import { db } from '../../firebase';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const [todoData, setTodoData] = useState([]);
  const flatListRef = useRef(null);
  const [name, setName] = useState('');
  const [avt, setAvt] = useState('');
  const [email, setEmail] = useState('');
  const [avtUSer, setavtUSer] = useState('');
  const [idUser, setIdUser] = useState('');
  const route = useRoute();

  const imageUri = avt || null;
  const imageUser = avtUSer || null;
  const auth = getAuth();
  let userID = null;
  //Tự reload lại trang khi được focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          userID = user.uid;
          const dbRef = ref(db, 'users/');
          const queryRef = query(dbRef, orderByChild('id'), equalTo(userID));
          get(queryRef).then((snapshot) => {
            if (snapshot.exists()) {
              const userData = snapshot.val();
              const user = Object.keys(userData)[0];
              setName(userData[user].name);
              setEmail(userData[user].email);
              setavtUSer(userData[user].avt);
              setIdUser(userData[user].id);
            } else {
              console.log('khong co du lieu');
            }
          });
        } else {
          // console.log('');
        }
      });
    });

    return unsubscribe;
  }, [navigation]);
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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersRef = ref(db, 'users/');
        const queryRef = query(usersRef, orderByChild('email'), equalTo(email));
        const snapshot = await get(queryRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          const userId = Object.keys(userData)[0];
          setAvt(userData[userId].avt);
        } else {
          console.log('Không tìm thấy dữ liệu người dùng với email này.');
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu người dùng:', error);
      }
    };
    if (email) {
      fetchUserData();
    }
  }, [email]);

  const goToNewPostScreen = () => {
    navigation.navigate('Newposts', {
      name: name,
      email: email,
      avt: avt,
    });
  };

  const goToChatScreen = () => {
    navigation.navigate('ListChats', { idUser: idUser, email: email });
  };
  const goToProfileScreen = () => {
    navigation.navigate('Profile', {
      email: email,
    });
  };
  const goToSearchScreen = () => {
    navigation.navigate('Search', {
      idUser: idUser,
      email: email,
      avt: avtUSer,
      name: name,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerText}>freebook</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={goToProfileScreen}>
            <MaterialCommunityIcons
              name='account-circle-outline'
              size={30}
              color='white'
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.line}></View>
      <View style={styles.bodyContainer}>
        <View style={styles.headerBody}>
          <View style={styles.headerleftBody}>
            <Image source={{ uri: imageUser }} style={styles.wrapBody} />
          </View>
          <View style={styles.headercenterBody}>
            <TouchableOpacity
              style={styles.boderradiusBody}
              onPress={goToNewPostScreen}
            >
              <Text style={styles.boderText}>Bạn đang nghĩ gì ? </Text>
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
        <TouchableOpacity style={styles.bowshadow} onPress={goToSearchScreen}>
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
