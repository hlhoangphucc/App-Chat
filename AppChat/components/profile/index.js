import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from './style';
import renderItem from './posts';
import { useRoute } from '@react-navigation/native';
import { ref, query, orderByChild, equalTo, get } from 'firebase/database';
import { db } from '../../firebase';
const ProfileScreen = ({ navigation }) => {
  const route = useRoute();
  const todoData = route.params.todoData;
  const [avt, setAvt] = useState('');
  const [name, setName] = useState('');

  const imageUri = avt || null;
  let email = 'b@gmail.com';
  const goToUpdateAvt = () => {
    navigation.navigate('updateavt');
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
      <FlatList
        data={todoData.reverse()}
        renderItem={renderItem}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <View style={styles.backgroundUser}>
              <Image
                source={{
                  uri: 'https://t3.ftcdn.net/jpg/05/58/09/76/360_F_558097675_pAMyqqZrlYTxz24ojSgPu4xkJXQJTHXq.jpg',
                }}
                style={styles.wrapBG}
              />
            </View>
            <View style={styles.avtUser}>
              <View style={styles.avt}>
                <TouchableOpacity onPress={goToUpdateAvt}>
                  <Image
                    source={{
                      uri: imageUri,
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
  );
};

export default ProfileScreen;
