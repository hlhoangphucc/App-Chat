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
} from 'react-native'

import React, { useState} from 'react'
import styles from './style'
const Separator = () => <View style={styles.separator} />;

const LoginScreen = () => {
  const [number,phoneInput] = React.useState(0);
  const handleTextChange = (text) => {
    phoneInput(text.length);
  };

  return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios'?'height':'padding'}style= {styles.container}>
        <StatusBar barStyle={'dark-content'} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.top}>
            <Image style={styles.phone} source={require('./../../assets/phone.png')}/>
            <Text style={styles.texttop}>Your Phone</Text>
          </View>
          <Separator/>
          <View style={styles.conten}>
            <View style={styles.country}>
              <Text style={styles.textcountry}>+84</Text>
              </View>
            <TextInput keyboardType='phone-pad'  style={styles.textInput} placeholder='Phone number' 
            onChangeText={handleTextChange}
            multiline={true}/>
          </View>
          <Separator/>
          <View style={styles.btn}>
          <TouchableOpacity style={styles.button} onPress={()=>{
            if(number<1||number>9){
              Alert.alert(
                'Thông báo',
                'Nhập sai định dạng',
              );
            }
          }}>
            <Text style={styles.text_btn}>Login</Text>
          </TouchableOpacity>
          </View>
        </View>
        </TouchableWithoutFeedback>
        
      </KeyboardAvoidingView>
  )
}

export default LoginScreen

