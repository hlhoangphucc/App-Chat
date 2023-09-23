import styles from './style';
import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text,StatusBar,TouchableWithoutFeedback,Keyboard,Image,TouchableOpacity } from 'react-native';
import { get, ref, query, orderByChild, equalTo, OnDisconnect } from 'firebase/database';
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from '../../firebase';

function SearchScreen() {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [avt,setAvt] = useState(false);
  let count = 0;
  let [oder,setOder] = useState("");
  
  useEffect (()=>{
    count = searchText.length;
    
    if(count>10){
      setOder("email");
    }else{
      setOder("phone");
    }
  });
  
  const handleSearch = (text) => {  
   
    setSearchText(text); // Cập nhật nội dung tìm kiếm 
    // Thực hiện truy vấn Firebase Realtime Database dựa trên nội dung tìm kiếm
    const dbRef = ref(db, 'users/'); // Đường dẫn đến dữ liệu người dùng
    if (text.trim() === '') {
      setSearchResults([]); // Nếu không có nội dung tìm kiếm, xóa danh sách kết quả
    } else {
      const userQuery = query(
        dbRef,
        orderByChild(oder), // Sắp xếp theo một thuộc tính cụ thể (vd: displayName)
        equalTo(text) // Tìm các người dùng có displayName trùng với nội dung tìm kiếm
      );
      // Lấy kết quả tìm kiếm từ Firebase Realtime Database
      get(userQuery)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const results = [];
            snapshot.forEach((childSnapshot) => {
              const user = childSnapshot.val();
              results.push(user);
            });
            setAvt(!avt);
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
 
 
  return (  
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        <View style={styles.container}>
          
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.conten}>
        <Icon name="search" size={20} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Tìm kiếm..."
        autoFocus
        keyboardType='email-address'
        onChangeText={(text)=>{handleSearch(text);}}
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
                  {avt? 
                  <Image style = {{width:'100%',height:'100%',borderRadius:50}} 
                  source={{uri:item.avt}} /> :
                  <Image style={{width:'100%',height:'100%',borderRadius:50}} source={require('../../assets/icons/user.png')}/>}
                  </View>
              </View>
              <View style={styles.center}>
                  <Text style={styles.username}>
                  {item.name}
                  </Text>
              </View>
              <View style={styles.right}>
                <TouchableOpacity>
                   <Image style={styles.iconchat} source={require('../../assets/icons/chat.png')}/>
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