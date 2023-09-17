import React, { useState, useEffect, useRef } from 'react';
import styles from './style';
import Ionicons from '@expo/vector-icons/Ionicons';
<<<<<<< HEAD
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
=======
>>>>>>> Phuc
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import uuid from 'react-native-uuid';
import { ref, set, onValue, push } from 'firebase/database';
import { db, firebase } from '../../firebase';
import { useRoute } from '@react-navigation/native';

const ChatScreen = () => {
  const [msg, setMsg] = useState('');
  const [chatData, setChatData] = useState([]);
  const [currentChatIndex, setCurrentChatIndex] = useState(0);
  const route = useRoute();
  const receivedname = route.params.name;
  const flatListRef = useRef(null);
  const ITEM_HEIGHT = 50;

  useEffect(() => {
    const startCountRef = ref(db, 'chat/');
    onValue(startCountRef, (snapshot) => {
      const data = snapshot.val();
      const newChat = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setChatData(newChat);
    });
  }, []);
  const targetChatIndex = 1;
  useEffect(() => {
    setCurrentChatIndex(targetChatIndex);
  }, [targetChatIndex]);

  const targetChatName = chatData[targetChatIndex]?.name;

  // console.log(targetChatName);

  const sendChat = () => {
    if (msg == '') {
      return false;
    }
    let data = {
      msg: msg,
      name: receivedname,
      createdAt: new Date(timestamp.toDate()).toUTCString(),
    };
    const newChatRef = push(ref(db, 'chat/'));
    set(newChatRef, data)
      .then(() => {
        console.log('Chat thành công ');
        setMsg('');
      })
      .catch((error) => {
        console.error('Đã xảy ra lỗi: ', error);
      });
  };
  const renderItem = ({ item }) => {
    return (
      <View
        style={[
          { backgroundColor: item.name != receivedname ? '#fff' : '#ccc' },
          {
            alignSelf: item.name != receivedname ? 'flex-start' : 'flex-end',
          },
          {
            maxWidth: Dimensions.get('window').width / 2 + 10,
            borderRadius: 100,
            padding: 15,
            marginHorizontal: 5,
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
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Ionicons
              name='arrow-back-outline'
              size={30}
              style={[styles.iconHeader]}
            />
            <View style={[styles.avtCirle]}>
              <Text style={[styles.avtText]}>N</Text>
            </View>
            <Text style={[styles.Name]}>
              {/* {firstChatName !== receivedname ? firstChatName : receivedname} */}
            </Text>
          </View>
          <Ionicons
            name='alert-circle-outline'
            size={30}
            style={[styles.iconHeader]}
          />
        </View>

        <FlatList
          inverted={false}
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
