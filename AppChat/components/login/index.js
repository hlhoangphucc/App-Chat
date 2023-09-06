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
  StatusBar
} from 'react-native'

import React from 'react'
import styles from './style'

const LoginScreen = () => {
  return (

      <KeyboardAvoidingView behavior={Platform.OS === 'ios'?'height':'padding'}style= {styles.container}>
        <StatusBar barStyle={'dark-content'} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.top}>
            <Image style={styles.phone} source={require('./../../assets/phone.png')}/>
            <Text style={styles.texttop}>Your Phone</Text>
          </View>
          <View style={styles.conten}>
            <TextInput keyboardType='number-pad' style={styles.textInput} />
          </View>
          <View style={styles.btn}>
          <TouchableOpacity style={styles.button} onPress={'null'}>
            <Text style={styles.text_btn}>Login</Text>
          </TouchableOpacity>
          </View>
        </View>
        </TouchableWithoutFeedback>
        
      </KeyboardAvoidingView>
  )
}

export default LoginScreen

