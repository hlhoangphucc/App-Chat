import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { db } from '../../firebase';
import { ref, query, orderByChild, equalTo, get } from 'firebase/database';
const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === '' || password === '') {
      alert('Vui lòng nhập đủ thông tin');
      return;
    }
    const usersRef = ref(db, 'users/');
    const queryRef = query(
      usersRef,
      orderByChild('username'),
      equalTo(username)
    );

    get(queryRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          const userId = Object.keys(userData)[0];

          if (userData[userId].password === password) {
            // console.log(userData[userId].name);
            return navigation.navigate('Home', {
              name: userData[userId].name,
            });
          } else {
            alert('Vui lòng nhập lại mật khẩu!');
          }
        } else {
          alert('Vui lòng nhập lại tên người dùng!');
        }
      })
      .catch((error) => {
        console.error('Đã xảy ra lỗi: ', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
      <TextInput
        style={styles.input}
        placeholder='Tên người dùng'
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder='Mật khẩu'
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Button title='Đăng nhập' onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text>
          Nếu bạn chưa có tài khoản{' '}
          <Text style={styles.switchText}>Đăng Ký</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'blue',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  switchText: {
    color: 'blue',
  },
});

export default LoginScreen;
