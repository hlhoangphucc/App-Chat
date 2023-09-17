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
    import  app  from '../../firebase';
    import {  getAuth,createUserWithEmailAndPassword } from "firebase/auth";

  
  const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Confirmpassword, setConfirmpassword] = useState('');
    const [isValidEmail, setisValidEmail] = useState('false');
    const auth = getAuth(app);

    const saveUserDataToFirestore = async (userId, userData) => {
      try {
        const usersCollection = collection(firestore(), 'users');
        await addDoc(usersCollection.doc(userId), userData);
      } catch (error) {
        console.error('Error saving user data:', error);
        throw error;
      }
    };

  const createUser = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    navigation.navigate('Login');
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
      <View
        style={styles.container}>
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
              <TextInput placeholder='Email' 
                style={styles.textInput} autoFocus keyboardType='email-address'
                value={email}
                onChangeText={(text)=>{setEmail(text);validateEmail(text)}}
                />
              <TextInput placeholder='Password'
                style={styles.textInput} secureTextEntry keyboardType='default'
                value={password}
                onChangeText={(text)=>setPassword(text)}
                />
                <TextInput placeholder='Confirm password'
                style={styles.textInput} secureTextEntry keyboardType='default'
                value={Confirmpassword}
                onChangeText={(text)=>setConfirmpassword(text)}
                />
              {/*button của login */}
              <TouchableOpacity
                style={styles.button_login}
                onPress={()=>{
                  if(isValidEmail){
                    Alert.alert('Invalid Email')
                  }else if(email==''){
                    Alert.alert('Not be empty');
                  }else if(password==''){
                    Alert.alert('Not be empty');
                  }else if(Confirmpassword==''){
                    Alert.alert('Not be empty');
                  }else if(password!=Confirmpassword){
                    Alert.alert('Password incorrect')
                  }
                  else{
                    createUser();
                    Alert.alert('Đăng ký thành công');
                  }
                }}
              >
                <Text style={styles.text_login} >
                  Register
                </Text>
                </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };
  
  export default RegisterScreen;
  