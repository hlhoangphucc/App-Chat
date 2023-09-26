import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import styles from './style';
import {
  ref,
  onValue,
  query,
  orderByChild,
  equalTo,
  get,
} from 'firebase/database';
import { db } from '../../firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
function ListChatScreen({ navigation }) {
  const [chatdata, setchatdata] = useState([]);
  const [name, setName] = useState('');
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
            } else {
              console.log('khong co du lieu');
            }
          });
        } else {
          console.log('dang xuat r');
        }
      });
    });

    return unsubscribe;
  }, [navigation]);
  console.log(name);
  useEffect(() => {
    const startCountRef = ref(db, 'chatlists/');
    onValue(startCountRef, (snapshot) => {
      const data = snapshot.val();
      const newPosts = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setchatdata(newPosts);
    });
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Chat', {
          roomId: item.id,
          emailOther:
            name == item.nameUser2 ? item.emailUser1 : item.emailUser2,
        })
      }
      style={styles.chatItem}
    >
      <Image
        source={{ uri: name == item.nameUser2 ? item.avtUser1 : item.avtUser2 }}
        style={styles.avatar}
      />
      <View style={styles.chatInfo}>
        <Text style={styles.name}>
          {name == item.nameUser2 ? item.nameUser1 : item.nameUser2}
        </Text>
        <Text style={styles.message}>{item.lastMessage}demo</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chatdata}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default ListChatScreen;
