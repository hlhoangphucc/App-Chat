import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import styles from './style';
import { useRoute } from '@react-navigation/native';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase';
function ListChatScreen({ navigation }) {
  const [chatdata, setchatdata] = useState([]);
  const route = useRoute();
  const idUser = route.params.idUser;
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
      onPress={() => navigation.navigate('Chat', { roomId: item.id })}
      style={styles.chatItem}
    >
      <Image source={{ uri: item.avtUser2 }} style={styles.avatar} />
      <View style={styles.chatInfo}>
        <Text style={styles.name}>{item.nameUser2}</Text>
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
