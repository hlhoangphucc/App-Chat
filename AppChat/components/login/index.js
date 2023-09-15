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

import React, { useState } from 'react';
import styles from './style';
<<<<<<< HEAD
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import  app  from '../../firebase';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const auth = getAuth(app);

  const signIn = async () =>{
    try{
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Đăng nhập thành công');
      navigation.navigate('Home');
    }catch(log){
      console.log('Thất bại: ');
      Alert.alert('Incorrect email or password.');
    }
  }
=======
const Separator = () => <View style={styles.separator} />;

const LoginScreen = ({ navigation }) => {
  const [number, phoneInput] = React.useState(0);
  const handleTextChange = (text) => {
    phoneInput(text.length);
  };
  const goToDetailScreen = () => {
    navigation.navigate('Home');
    console.log('Da Chuyen Trang');
  };
>>>>>>> origin/main
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
<<<<<<< HEAD
              source={require('./../../assets/send.png')}
            />
          </View>
          <View style={styles.conten}>
            <View style={styles.conten_email}>
            <TextInput placeholder='Email' 
              style={styles.textInput} autoFocus keyboardType='email-address'
              value={email}
              onChangeText={(text)=>setEmail(text)}
              />
            </View>
            <View style={styles.conten_pass}>
            <TextInput placeholder='Password'
              style={styles.textInput} secureTextEntry={visible?false: true} keyboardType='default'
              value={password}
              onChangeText={(textInput)=>setPassword(textInput)}
              />
              <TouchableOpacity style={{position:'absolute',right:0}}
              onPress={()=>{
                setVisible(!visible)
              }}
              >
                {visible? 
                  <Image style={styles.visible} source={require('../../assets/icons/visible.png')}/>
                  :
                  <Image style={styles.visible} source={require('../../assets/icons/visibility.png')}/>
                }
                
              </TouchableOpacity>
            </View>

             {/*button của login */}
            <TouchableOpacity
              style={styles.button_login}
              onPress={
                ()=>{signIn();}
              }
            >
              <Text style={styles.text_login} >
                Login
              </Text>
            </TouchableOpacity>
             {/*button của login */}
            <TouchableOpacity
              style={styles.button_register}
              onPress={()=>navigation.navigate('Register')}
            >
              <Text style={styles.text_register} >
                Register
              </Text>
            </TouchableOpacity>
=======
              source={require('./../../assets/phone.png')}
            />
            <Text style={styles.texttop}>Your Phone</Text>
          </View>
          <Separator />
          <View style={styles.conten}>
            <View style={styles.country}>
              <Text style={styles.textcountry}>+84</Text>
            </View>
            <TextInput
              keyboardType='phone-pad'
              style={styles.textInput}
              placeholder='Phone number'
              onChangeText={handleTextChange}
              multiline={true}
            />
          </View>
          <Separator />
          <View style={styles.btn}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (number < 1 || number > 9) {
                  Alert.alert('Thông báo', 'Nhập sai định dạng');
                }
              }}
            >
              <Text style={styles.text_btn} onPress={goToDetailScreen}>
                Login
              </Text>
            </TouchableOpacity>
>>>>>>> origin/main
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
