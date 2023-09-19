import {
  View,
  KeyboardAvoidingView,
  TextInput,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
} from 'react-native';

import React, { useEffect, useState } from 'react';
import styles from './style';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../../firebase';
import { db } from '../../firebase';
import { ref, query, orderByChild, equalTo, get } from 'firebase/database';
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [avt, setavt] = useState('');
  const auth = getAuth(app);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersRef = ref(db, 'users/');
        const queryRef = query(usersRef, orderByChild('email'), equalTo(email));
        const snapshot = await get(queryRef);

        if (snapshot.exists()) {
          const userData = snapshot.val();
          const userId = Object.keys(userData)[0];
          setUsername(userData[userId].name);
          setavt(userData[userId].avt);
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

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      navigation.navigate('Home', { username: username, avt: avt });
    } catch (log) {
      console.log('Thất bại: ');
      Alert.alert('Incorrect email or password.');
    }
  };

  const handleSigin = () => {
    signIn();
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'height' : 'padding'}
      style={styles.container}
    >
      <StatusBar barStyle={'dark-content'} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.top}>
            <Image
              style={styles.phone}
              source={require('./../../assets/send.png')}
            />
          </View>
          <View style={styles.conten}>
            <View style={styles.conten_email}>
              <TextInput
                placeholder='Email'
                style={styles.textInput}
                autoFocus
                keyboardType='email-address'
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View style={styles.conten_pass}>
              <TextInput
                placeholder='Password'
                style={styles.textInput}
                secureTextEntry={visible ? false : true}
                keyboardType='default'
                value={password}
                onChangeText={(textInput) => setPassword(textInput)}
              />
              <TouchableOpacity
                style={{ position: 'absolute', right: 0 }}
                onPress={() => {
                  setVisible(!visible);
                }}
              >
                {visible ? (
                  <Image
                    style={styles.visible}
                    source={require('../../assets/icons/visible.png')}
                  />
                ) : (
                  <Image
                    style={styles.visible}
                    source={require('../../assets/icons/visibility.png')}
                  />
                )}
              </TouchableOpacity>
            </View>

            {/*button của login */}
            <TouchableOpacity style={styles.button_login} onPress={handleSigin}>
              <Text style={styles.text_login}>Login</Text>
            </TouchableOpacity>
            {/*button của login */}
            <TouchableOpacity
              style={styles.button_register}
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.text_register}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
