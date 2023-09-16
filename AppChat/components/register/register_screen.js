import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import uuid from 'react-native-uuid';
import { db } from '../../firebase';
import { getDatabase, ref, set } from 'firebase/database';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (name == '' || username == '' || password == '') {
      alert('Vui Lòng Nhập Đủ Thông Tin');
      return false;
    }
    let data = {
      id: uuid.v4(),
      name: name,
      username: username,
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
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng ký</Text>
      <TextInput
        style={styles.input}
        placeholder='Tên'
        onChangeText={(text) => setName(text)}
        value={name}
      />
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
      <Button title='Đăng ký' onPress={handleRegister} />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text>
          Nếu bạn đã có tài khoản <Text style={styles.switchText}>Login</Text>
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
    backgroundColor: 'lightblue', // Màu nền xanh
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'blue', // Màu viền xanh cho các trường nhập
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white', // Màu nền trắng cho các trường nhập
    borderRadius: 5, // Bo góc các trường nhập
  },
  switchText: {
    color: 'blue',
  },
});

export default RegisterScreen;
