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
  ScrollView,
} from 'react-native';
const ChatScreen = () => {
  return (
    <View style={styles.container}>
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

        <KeyboardAwareScrollView style={styles.message}>
          <Text style={styles.textBody}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            posuere, libero nec finibus aliquet, velit leo convallis risus, id
            ullamcorper enim elit ut ex. Vestibulum ante ipsum primis in
            faucibus orci luctus et ultrices posuere cubilia Curae; Morbi
            egestas pretium enim, ac suscipit odio feugiat a. Duis malesuada,
            erat non congue rutrum, mauris sapien iaculis nulla, at lobortis
            enim erat id nibh. Suspendisse vel cursus elit. Suspendisse potenti.
            Sed id pellentesque lectus. Donec commodo, nisl id eleifend
            elementum, arcu tellus varius neque, vel tempus mauris est id
            mauris. Sed nec venenatis nisl, id posuere tortor. Ut in massa enim.
            Phasellus facilisis, tellus ac ultrices viverra, turpis dolor
            fermentum risus, et pharetra purus urna eget felis. Fusce
            sollicitudin ligula nec orci pellentesque, in tempor nisl facilisis.
            Maecenas ac finibus ipsum. Suspendisse in risus ut velit vestibulum
            tempus eu a velit. Curabitur consequat elit at tortor commodo, at
            consectetur enim tincidunt. Aliquam id velit et neque tempus
            ullamcorper. Morbi non nulla suscipit, efficitur tortor at, tempus
            mi. Proin ut ligula lectus. Sed dapibus odio et dui convallis, in
            tristique ante euismod. Nullam sodales tellus non nibh sollicitudin,
            vitae malesuada elit molestie. Pellentesque ut tincidunt lorem.
            Suspendisse lobortis, arcu non tincidunt vestibulum, erat nisi
            tincidunt justo, a efficitur dolor eros eget enim. Nulla facilisi.
            Cras scelerisque ante vel justo consectetur, ac rutrum nibh aliquam.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            posuere, libero nec finibus aliquet, velit leo convallis risus, id
            ullamcorper enim elit ut ex. Vestibulum ante ipsum primis in
            faucibus orci luctus et ultrices posuere cubilia Curae; Morbi
            egestas pretium enim, ac suscipit odio feugiat a. Duis malesuada,
            erat non congue rutrum, mauris sapien iaculis nulla, at lobortis
            enim erat id nibh. Suspendisse vel cursus elit. Suspendisse potenti.
            Sed id pellentesque lectus. Donec commodo, nisl id eleifend
            elementum, arcu tellus varius neque, vel tempus mauris est id
            mauris. Sed nec venenatis nisl, id posuere tortor. Ut in massa enim.
            Phasellus facilisis, tellus ac ultrices viverra, turpis dolor
            fermentum risus, et pharetra purus urna eget felis. Fusce
            sollicitudin ligula nec orci pellentesque, in tempor nisl facilisis.
            Maecenas ac finibus ipsum. Suspendisse in risus ut velit vestibulum
            tempus eu a velit. Curabitur consequat elit at tortor commodo, at
            consectetur enim tincidunt. Aliquam id velit et neque tempus
            ullamcorper. Morbi non nulla suscipit, efficitur tortor at, tempus
            mi. Proin ut ligula lectus. Sed dapibus odio et dui convallis, in
            tristique ante euismod. Nullam sodales tellus non nibh sollicitudin,
            vitae malesuada elit molestie. Pellentesque ut tincidunt lorem.
            Suspendisse lobortis, arcu non tincidunt vestibulum, erat nisi
            tincidunt justo, a efficitur dolor eros eget enim. Nulla facilisi.
            Cras scelerisque ante vel justo consectetur, ac rutrum nibh aliquam.
          </Text>
        </KeyboardAwareScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
          keyboardVerticalOffset={20}
          style={styles.bottomContainer}
        >
          <View style={styles.bottom}>
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
                <Ionicons
                  name='mic-circle'
                  size={30}
                  style={styles.iconmicInput}
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default ChatScreen;
