import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/login/index';
import WelcomeScreen from './components/welcome/index';
import ChatScreen from './components/chat/index';
const Stack = createStackNavigator();
const App = () => {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen
    //       name='Welcome'
    //       component={WelcomeScreen}
    //       options={{ headerShown: false }}
    //     />
    //     <Stack.Screen
    //       name='Login'
    //       component={LoginScreen}
    //       options={{ headerShown: false }}
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <ChatScreen></ChatScreen>
  );
};

export default App;
