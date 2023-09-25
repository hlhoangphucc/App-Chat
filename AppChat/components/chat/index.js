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
  remove,
} from 'firebase/database';
import { db } from '../../firebase';
import Modal from 'react-native-modal';
function ListChatScreen({ navigation }) {
  const [chatdata, setchatdata] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [key, setKey] = useState('');
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    const Ref = ref(db, 'users/');
    onValue(Ref, (snapshot) => {
      const userData = snapshot.val();
      if (userData) {
        const userId = Object.keys(userData)[0];
        setName(userData[userId].name);
        setEmail(userData[userId].email);
      } else {
        console.log('Không có dữ liệu trong cơ sở dữ liệu Firebase.');
        setName('');
      }
    });
  });

  useEffect(() => {
    const startCountRef = ref(db, 'chatlists/');
    onValue(startCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const filteredData = Object.keys(data)
          .filter((key) => key !== 'aa')
          .reduce((obj, key) => {
            obj[key] = data[key];
            return obj;
          }, {});

        const newPosts = Object.keys(filteredData).map((key) => ({
          id: key,
          ...filteredData[key],
        }));
        const filteredChats = newPosts.filter((item) => {
          return email == item.emailUser1 || email == item.emailUser2;
        });
        const chatKeys = filteredChats.map((chat) => chat.id);
        setKey(chatKeys);
        setchatdata(filteredChats);
      } else {
        console.log('Không có dữ liệu trong cơ sở dữ liệu Firebase.');
      }
    });
  }, [email]);

  const handleLongPress = (item) => {
    setSelectedItem(item);
    toggleModal();
  };

  const handleDeleteMessage = () => {
    if (selectedItem.id != null) {
      if (selectedItem && selectedItem.id) {
        const chatRef = ref(db, 'chatlists/' + selectedItem.id);
        try {
          remove(chatRef).then(() => {
            console.log('Cuộc trò chuyện đã được xóa.');
          });
        } catch (error) {
          console.error('Lỗi khi xóa cuộc trò chuyện:', error);
        }
      }
    } else {
      console.log('Không có dữ liêu để xóa');
    }
    toggleModal();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Chat', {
          roomId: item.id,
          emailOther:
            name == item.nameUser2 ? item.emailUser1 : item.emailUser2,
        })
      }
      onLongPress={() => handleLongPress(item)}
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
        <Text style={styles.message}>Tin nhắn</Text>
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
      <Modal isVisible={isModalVisible}>
        <View style={styles.modal}>
          <Text>Bạn có muốn xóa tin nhắn này không?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleDeleteMessage}>
              <Text style={styles.button}>Có</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal}>
              <Text style={styles.button}>Không</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ListChatScreen;
