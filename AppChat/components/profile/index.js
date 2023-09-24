import { Text, View, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from './style';
import renderItem from './post/posts';
import { useRoute } from '@react-navigation/native';
import {
  ref,
  query,
  orderByChild,
  equalTo,
  get,
  onValue,
} from 'firebase/database';
import { db } from '../../firebase';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getAuth, signOut } from 'firebase/auth';
import app from '../../firebase';

const ProfileScreen = ({ navigation }) => {
  const [todoData, setTodoData] = useState([]);
  const [avt, setAvt] = useState('');
  const [bg, setBg] = useState('');
  const [name, setName] = useState('');
  const route = useRoute();
  const email = route.params.email;
  const imageUriAvt = avt || null;
  const imageUriBg = bg || null;
  const auth = getAuth(app);

  const handlesignOut =()=>{
    signOut(auth)
    .then(()=>{
      navigation.navigate('Login')
      console.log('Đăng xuất thành công');
    })
    .catch(()=>{
      console.log('Loi roi cau oi');
    });
  };


  const handleIconClick = () => {
    navigation.goBack();
  };
  useEffect(() => {
    const startCountRef = ref(db, 'NewPosts/');
    onValue(startCountRef, (snapshot) => {
      const data = snapshot.val();
      const newPosts = Object.keys(data)
        .map((key) => ({
          id: key,
          ...data[key],
        }))
        .filter((post) => post.email === email);
      setTodoData(newPosts);
    });
  }, []);

  const goToUpdateAvt = () => {
    navigation.navigate('updateavt');
  };
  const goToUpdateBg = () => {
    navigation.navigate('updatebg');
  };
  const goToSettingProfile = () => {
    navigation.navigate('SettingProfileScreen', {
      username: name,
      email: email,
    });
  };

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
          setName(userData[userId].name);
          setBg(userData[userId].bg);
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <FlatList
        data={todoData.reverse()}
        renderItem={renderItem}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <View style={styles.backgroundUser}>
              <TouchableOpacity onPress={goToUpdateBg}>
                <Image
                  source={{
                    uri: imageUriBg,
                  }}
                  style={styles.wrapBG}
                />
              </TouchableOpacity>
              <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={goToSettingProfile}>
                  <Ionicons
                    name='ellipsis-horizontal'
                    size={25}
                    color='white'
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.iconsBackContainer}>
                <TouchableOpacity onPress={handleIconClick}>
                  <Ionicons name='arrow-back' size={25} color='white' />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.avtUser}>
              <View style={styles.avt}>
                <TouchableOpacity onPress={goToUpdateAvt}>
                  <Image
                    source={{
                      uri: imageUriAvt,
                    }}
                    style={styles.wrapAvt}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameUser}>{name}</Text>
            </View>
          </View>
        }
      />
      </View>
      <View  style={styles.footer}>
        <TouchableOpacity onPress={handlesignOut}>
                  <View style={styles.btnsignout}>
          <Ionicons color={'#fff'} size={40} name='log-out' />
          <Text style={styles.txtbtn}>Sign out</Text>
        </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;
