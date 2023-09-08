import React, { useEffect, useRef } from 'react';
import styles from './style';
import Ionicons from '@expo/vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';
const ChatScreen = () => {
  const data = [
    {
      key: '1',
      message: 'hello',
    },
    {
      key: '2',
      message1: 'Hi',
    },
    {
      key: '3',
      message: 'How Are You ?',
    },
    {
      key: '4',
      message1: 'I Fire. Thank you and you? ',
    },
    {
      key: '5',
      message: 'I am Fire. GoodBye',
    },
    {
      key: '6',
      message1: 'Bye. See You later !',
    },
    {
      key: '7',
      message: 'Bye. See You later !',
    },
    {
      key: '8',
      message1: 'Bye. See You later !',
    },
  ];
  const renderItem = ({ item }) => {
    return (
      <View
        style={[
          { backgroundColor: item.key % 2 ? '#fff' : '#ccc' },
          { alignSelf: item.key % 2 ? 'flex-start' : 'flex-end' },
          {
            maxWidth: Dimensions.get('window').width / 2 + 10,
            borderRadius: 100,
            padding: 15,
            marginHorizontal: 5,
            color: 'black',
          },
        ]}
      >
        <Text>{item.key % 2 ? item.message : item.message1}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Ionicons
              name='arrow-back-outline'
              size={30}
              style={[styles.iconHeader]}
            />
            <View style={[styles.avtCirle]}>
              <Text style={[styles.avtText]}>N</Text>
            </View>
            <Text style={[styles.Name]}>KingCute</Text>
          </View>
          <Ionicons
            name='alert-circle-outline'
            size={30}
            style={[styles.iconHeader]}
          />
        </View>
        <FlatList
          inverted
          data={data}
          renderItem={renderItem}
          style={{ flex: 1, marginBottom: 30 }}
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={10}
        style={styles.bottom}
      >
        <View style={styles.inputContainer}>
          <View style={styles.bottomLeft}>
            <Ionicons name='image' size={20} style={styles.iconInput} />
            <Ionicons
              name='file-tray-stacked-outline'
              size={20}
              style={styles.iconInput}
            />
          </View>

          <View style={styles.bottomCenter}>
            <TextInput
              placeholder='Bắt đầu một tin nhắn'
              placeholderTextColor='#b1b5b9'
              style={styles.keyboardText}
            />
          </View>

          <View style={styles.bottomRight}>
            <Ionicons name='mic-circle' size={30} style={styles.iconmicInput} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
