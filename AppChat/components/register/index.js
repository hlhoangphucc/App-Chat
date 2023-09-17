import {
  View,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import styles from './style';
import app from '../../firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import uuid from 'react-native-uuid';
import { db } from '../../firebase';
import { ref, set } from 'firebase/database';
const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Confirmpassword, setConfirmpassword] = useState('');
  const [isValidEmail, setisValidEmail] = useState('false');
  const auth = getAuth(app);
  
  const createUser = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      let data = {
        id: uuid.v4(),
        email: email,
        password: password,
      };

      const dbRef = ref(db, 'users/' + data.id);
      set(dbRef, data)
        .then(() => {
          console.log('Dữ liệu đã được đặt thành công');
          return navigation.navigate('Login');
        })
        .catch((error) => {
          console.error('Đã xảy ra lỗi: ', error);
        });

      // navigation.navigate('Login');
      console.log('User created:', user.uid);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const validateEmail = (text) => {
    // Sử dụng biểu thức chính quy để kiểm tra định dạng email
    const emailPattern = /^[A-Za-z0-9._%+-]+@gmail.com$/;
    if (emailPattern.test(text)) {
      setisValidEmail(false);
    } else {
      setisValidEmail(true);
    }
  };
  return (
    <View style={styles.container}>
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
            <TextInput
              placeholder='Email'
              style={styles.textInput}
              autoFocus
              keyboardType='email-address'
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                validateEmail(text);
              }}
            />
            <TextInput
              placeholder='Password'
              style={styles.textInput}
              secureTextEntry
              keyboardType='default'
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TextInput
              placeholder='Confirm password'
              style={styles.textInput}
              secureTextEntry
              keyboardType='default'
              value={Confirmpassword}
              onChangeText={(text) => setConfirmpassword(text)}
            />
            {/*button của login */}
            <TouchableOpacity
              style={styles.button_login}
              onPress={() => {
                if (isValidEmail) {
                  Alert.alert('Invalid Email');
                } else if (email == '') {
                  Alert.alert('Not be empty');
                } else if (password == '') {
                  Alert.alert('Not be empty');
                } else if (Confirmpassword == '') {
                  Alert.alert('Not be empty');
                } else if (password != Confirmpassword) {
                  Alert.alert('Password incorrect');
                } else {
                  createUser();
                  Alert.alert('Đăng ký thành công');
                }
              }}
            >
              <Text style={styles.text_login}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default RegisterScreen;
