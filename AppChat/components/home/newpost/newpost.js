import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import React, { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import {
  Text,
  View,
  Button,
  Image,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpactiy,
} from 'react-native';
import { ref, set, push } from 'firebase/database';
import { db } from '../../../firebase';
import { useRoute } from '@react-navigation/native';
import styles from './style';
import { TouchableOpacity } from 'react-native-gesture-handler';

const NewpostScreen = () => {
  const route = useRoute();
  const receivedData = route.params.todoData;
  const firstItem = receivedData[0];

  const avt = firstItem.avt;
  const name = firstItem.name;

  const [status, setStatus] = useState([]);

  const createNewpost = () => {
    const newDataRef = push(ref(db, 'NewPosts/'));
    set(newDataRef, dataSend)
      .then(() => {
        console.log('Bài viết mới đã được thêm vào Firebase thành công');
      })
      .catch((error) => {
        console.error('Lỗi khi thêm bài viết mới:', error);
      });
  };
  const dataSend = {
    avt: avt,
    content: status,
    imgcontent:
      'https://duhocchaudaiduong.edu.vn/hinh-nen-phong-canh-dep/imager_3943.jpg',
    name: name,
  };
  const checkStatus = () => {
    if (status == 0) {
      alert('Vui Lòng Nhập Trạng Thái');
    } else {
      createNewpost();
      setStatus('');
    }
  };

  const selectImage = () => {
    const options = {
      mediaType: 'photo', // Chọn 'photo' hoặc 'video' tùy theo nhu cầu của bạn
    };

    launchImageLibrary(options, (res) => {
      console.log(res);
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <Ionicons name='arrow-back' size={30} color='white' />
            <Text style={styles.textHeader}>Tạo bài viết</Text>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.buttonHeader}>
              <Text style={styles.textbuttonHeader}>Đăng</Text>
            </View>
          </View>
        </View>
        <View style={styles.line}></View>

        <View style={styles.bodyContainer}>
          <View style={styles.bodyheader}>
            <View style={styles.bodyheaderLeft}>
              <Image source={{ uri: avt }} style={styles.wrap} />
            </View>
            <View style={styles.bodyheaderRight}>
              <Text style={styles.name}>{name}</Text>
            </View>
          </View>

          <View style={styles.bodyBody}>
            <TextInput
              placeholder='Bạn đang nghĩ gì ?'
              placeholderTextColor='#b1b5b9'
              style={styles.textInput}
              value={status}
              onChangeText={(text) => {
                setStatus(text);
              }}
            />
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={selectImage}>
            <FontAwesome5 name='photo-video' size={30} color='white' />
          </TouchableOpacity>

          <Entypo name='location' size={30} color='white' />
          <MaterialIcons name='emoji-emotions' size={30} color='white' />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default NewpostScreen;
