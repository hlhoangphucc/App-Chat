import React, { useState, useEffect, useRef } from 'react';
import styles from './style';
import Ionicons from '@expo/vector-icons/Ionicons';
import { db } from '../../../firebase';
import { useRoute } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  ref,
  set,
  onValue,
  push,
  query,
  orderByChild,
  equalTo,
  get,
} from 'firebase/database';

const ChatScreen = ({ navigation }) => {
  const auth = getAuth();
  const route = useRoute();
  const flatListRef = useRef(null);
  const [msg, setMsg] = useState('');
  const [chatData, setChatData] = useState([]);
  const [name, setName] = useState('');
  const [nameother, setNameOther] = useState('');
  const [avtother, setAvtOther] = useState('');
  const emailOther = route.params.emailOther;
  const idroom = route.params.roomId;
  const ITEM_HEIGHT = 50;
  const imageUserOther = avtother || null;

  let userID = null;
  // Lấy thông tin của chính mình
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        userID = user.uid;
        const dbRef = ref(db, 'users/');
        const queryRef = query(dbRef, orderByChild('id'), equalTo(userID));

        get(queryRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              const userData = snapshot.val();
              const user = Object.keys(userData)[0];
              setName(userData[user].name);
            } else {
              console.log('Không tìm thấy người dùng tương ứng với userID.');
              setName('');
            }
          })
          .catch((error) => {
            console.error('Lỗi khi truy cập dữ liệu người dùng:', error);
          });
      } else {
        console.log('Đăng xuất rồi');
      }
    });
  });

  // Lấy thông tin của user khác
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersRef = ref(db, 'users/');
        const queryRef = query(
          usersRef,
          orderByChild('email'),
          equalTo(emailOther)
        );
        const snapshot = await get(queryRef);

        if (snapshot.exists()) {
          const userData = snapshot.val();
          const userId = Object.keys(userData)[0];
          setAvtOther(userData[userId].avt);
          setNameOther(userData[userId].name);
        } else {
          console.log('Không tìm thấy dữ liệu người dùng với email này.');
          setAvtOther('');
          setNameOther('');
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu người dùng:', error);
      }
    };

    if (emailOther) {
      fetchUserData();
    }
  }, [emailOther]);

  useEffect(() => {
    const chatPath = 'chat/' + idroom;
    const chatRef = ref(db, chatPath);

    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const newChat = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setChatData(newChat);
      } else {
        setChatData([]);
      }
    });
  }, []);

  const sendChat = () => {
    if (msg == '') {
      return false;
    }
    let data = {
      msg: msg,
      name: name,
    };
    const newChatRef = push(ref(db, 'chat/' + idroom));
    set(newChatRef, data)
      .then(() => {
        console.log('Chat thành công ');
        setMsg('');
      })
      .catch((error) => {
        console.error('Đã xảy ra lỗi: ', error);
      });
  };

  // xử lý giao diện
  const renderItem = ({ item }) => {
    return (
      <View
        style={[
          { backgroundColor: item.name != name ? '#fff' : '#ccc' },
          {
            alignSelf: item.name != name ? 'flex-start' : 'flex-end',
          },
          {
            maxWidth: Dimensions.get('window').width / 2 + 10,
            borderRadius: 100,
            padding: 15,
            marginHorizontal: 5,
            marginTop: 5,
            color: 'black',
          },
        ]}
      >
        <Text>{item.msg}</Text>
      </View>
    );
  };
  const handleContentSizeChange = () => {
    if (flatListRef.current && chatData.length > 0) {
      const lastIndex = chatData.length - 1;
      flatListRef.current.scrollToIndex({
        index: lastIndex,
        animated: true,
      });
    }
  };
  const goToChatScreen = () => {
    navigation.navigate('ListChats');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={goToChatScreen}>
              <Ionicons
                name='arrow-back-outline'
                size={30}
                style={[styles.iconHeader]}
              />
            </TouchableOpacity>

            <View style={[styles.avtCirle]}>
              <Image source={{ uri: imageUserOther }} style={styles.wrapBody} />
            </View>
            <Text style={[styles.Name]}>{nameother}</Text>
          </View>
          <Ionicons
            name='alert-circle-outline'
            size={30}
            style={[styles.iconHeader]}
          />
        </View>

        <FlatList
          ref={flatListRef}
          data={chatData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={{ flex: 1, marginBottom: 30 }}
          onContentSizeChange={handleContentSizeChange}
          getItemLayout={(data, index) => ({
            length: ITEM_HEIGHT, // Chiều cao của mỗi phần tử
            offset: ITEM_HEIGHT * index, // Vị trí bắt đầu của mỗi phần tử
            index, // Chỉ mục của phần tử
          })}
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={10}
        style={styles.bottom}
      >
        <View style={styles.inputContainer}>
          <View style={styles.bottomLeft}>
            <Ionicons name='image' size={20} style={styles.iconInput} />
            <Ionicons
              name='file-tray-stacked-outline'
              size={20}
              style={styles.iconInput}
            />
          </View>

          <View style={styles.bottomCenter}>
            <TextInput
              placeholder='Bắt đầu một tin nhắn'
              placeholderTextColor='#b1b5b9'
              style={styles.keyboardText}
              onChangeText={(text) => setMsg(text)}
              value={msg}
              onPressIn={handleContentSizeChange}
            />
          </View>

          <View style={styles.bottomRight}>
            <TouchableOpacity onPress={sendChat}>
              <Ionicons name='send' size={30} style={styles.iconmicInput} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
