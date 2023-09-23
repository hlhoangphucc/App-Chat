import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import styles from './style';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRoute } from '@react-navigation/native';

const SettingProfile = ({ navigation }) => {
  const route = useRoute();
  const receivedData = route.params.username;
  const goToUpdateAvt = () => {
    navigation.navigate('updateavt');
  };
  const goToUpdateBg = () => {
    navigation.navigate('updatebg');
  };
  const goToinfo = () => {
    navigation.navigate('Info');
  };
  const [pressedButton, setPressedButton] = useState(null);

  const handlePress = (buttonName) => {
    setPressedButton(buttonName);
  };

  const handlePressOut = () => {
    setPressedButton(null);
  };

  const handleIconClick = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleIconClick}>
          <MaterialIcons name='arrow-back' size={22} color='white' />
        </TouchableOpacity>
        <Text style={styles.textHeader}>{receivedData}</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.lineBody}></View>
        <TouchableOpacity
          style={[
            styles.contentBody,
            {
              backgroundColor:
                pressedButton === 'info' ? '#f0f0f0' : 'transparent',
            },
          ]}
          onPressIn={() => handlePress('info')}
          onPressOut={handlePressOut}
          onPress={goToinfo}
        >
          <Text style={styles.textContent}>Thông tin</Text>
        </TouchableOpacity>
        <View style={styles.lineBody}></View>
        <TouchableOpacity
          style={[
            styles.contentBody,
            {
              backgroundColor:
                pressedButton === 'avt' ? '#f0f0f0' : 'transparent',
            },
          ]}
          onPressIn={() => handlePress('avt')}
          onPressOut={handlePressOut}
          onPress={goToUpdateAvt}
        >
          <Text style={styles.textContent}>Đổi hình nền đại diện</Text>
        </TouchableOpacity>
        <View style={styles.lineBody}></View>
        <TouchableOpacity
          style={[
            styles.contentBody,
            {
              backgroundColor:
                pressedButton === 'bg' ? '#f0f0f0' : 'transparent',
            },
          ]}
          onPressIn={() => handlePress('bg')}
          onPressOut={handlePressOut}
          onPress={goToUpdateBg}
        >
          <Text style={styles.textContent}>Đổi hình nền</Text>
        </TouchableOpacity>
        <View style={styles.lineBody}></View>
        <TouchableOpacity
          style={[
            styles.contentBody,
            {
              backgroundColor:
                pressedButton === 'settings' ? '#f0f0f0' : 'transparent',
            },
          ]}
          onPressIn={() => handlePress('settings')}
          onPressOut={handlePressOut}
        >
          <Text style={styles.textContent}>Cài đặt chung</Text>
        </TouchableOpacity>
        <View style={styles.lineBody}></View>
      </View>
    </View>
  );
};

export default SettingProfile;
