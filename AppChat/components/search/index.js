import styles from './style';
import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  get,
  ref,
  query,
  orderByChild,
  equalTo,
  update,
  onValue,
} from 'firebase/database';
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from '../../firebase';
import { useRoute } from '@react-navigation/native';
import uuid from 'react-native-uuid';
function SearchScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [avtother, setAvtother] = useState('');
  const [emailother, setEmailOther] = useState('');
  const [idOther, setIdOther] = useState('');
  const [nameOther, setNameOther] = useState('');
  const [chatdata, setchatdata] = useState([]);
  const [emailuser1, setemailUser1] = useState('');
  const [emailuser2, setemailUser2] = useState('');
  const route = useRoute();
  const idUser = route.params.idUser;
  const email = route.params.email;
  const name = route.params.name;
  const avt = route.params.avt;

  let count = 0;
  let [oder, setOder] = useState('');

  useEffect(() => {
    count = searchText.length;
    // console.log(oder);
    if (count > 10) {
      setOder('email');
    } else {
      setOder('phone');
    }
  });

  const handleSearch = (text) => {
    setSearchText(text);
    const dbRef = ref(db, 'users/');
    if (text.trim() === '') {
      setSearchResults([]);
    } else {
      const userQuery = query(dbRef, orderByChild(oder), equalTo(text));
      get(userQuery)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const results = [];
            snapshot.forEach((childSnapshot) => {
              const user = childSnapshot.val();
              results.push(user);
              setEmailOther(user.email);
              setIdOther(user.id);
              setAvtother(user.avt);
              setNameOther(user.name);
            });
            setSearchResults(results);
          } else {
            setSearchResults([]);
          }
        })
        .catch((error) => {
          console.error('Error searching users:', error);
        });
    }
  };

  useEffect(() => {
    const startCountRef = ref(db, 'chatlists/');
    onValue(startCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const newPosts = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setchatdata(newPosts);
      } else {
        console.log('Không có dữ liệu chat lists');
        setchatdata([]);
      }
    });
  }, []);

  useEffect(() => {
    if (chatdata.length > 0) {
      chatdata.forEach((item) => {
        const chatlistRef = ref(db, 'chatlists/' + item.id);
        onValue(chatlistRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setemailUser1(data.emailUser1);
            setemailUser2(data.emailUser2);
          } else {
            console.log('Không có dữ liệu email');
            setemailUser1('');
            setemailUser2('');
          }
        });
      });
    }
  }, [chatdata]);

  const CreateChatRoom = () => {
    if (
      email !== emailuser1 &&
      email !== emailuser2 &&
      emailother !== emailuser1 &&
      emailother !== emailuser2
    ) {
      data = {
        emailUser1: email,
        nameUser1: name,
        avtUser1: avt,
        emailUser2: emailother,
        nameUser2: nameOther,
        avtUser2: avtother,
      };
      const chatlistRef = ref(db, 'chatlists/' + uuid.v4());
      update(chatlistRef, data)
        .then(() => console.log('Đã thêm vào danh sách chat'))
        .catch((error) =>
          console.error('Lỗi không thêm vào được danh sách chat:', error)
        );
    } else {
      chatdata.map((item) => {
        navigation.navigate('Chat', {
          roomId: item.id,
          emailOther: emailother,
        });
      });
      console.log('Đã có trong danh sách');
    }
  };

  const goToChatScreen = () => {
    navigation.navigate('ListChats');
    CreateChatRoom();
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar barStyle={'dark-content'} />
        <View style={styles.conten}>
          <Icon name='search' size={20} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder='Tìm kiếm...'
            autoFocus
            keyboardType='email-address'
            onChangeText={(text) => {
              handleSearch(text);
            }}
            value={searchText}
          />
        </View>
        <View style={styles.bottom}>
          <FlatList
            data={searchResults}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <View style={styles.itemuser}>
                  <View style={styles.left}>
                    <View style={styles.avtuser}>
                      <Image
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: 50,
                        }}
                        source={{ uri: item.avt }}
                      />
                    </View>
                  </View>
                  <View style={styles.center}>
                    <Text style={styles.username}>{item.name}</Text>
                  </View>
                  <View style={styles.right}>
                    <TouchableOpacity onPress={goToChatScreen}>
                      <Image
                        style={styles.iconchat}
                        source={require('../../assets/icons/chat.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default SearchScreen;
