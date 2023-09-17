import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/login/index';
import WelcomeScreen from './components/welcome/index';
import ChatScreen from './components/chat/index';
<<<<<<< HEAD
import HomeScreen from './components/home';
import RegisterScreen from './components/register';
=======
import HomeScreen from './components/home/index';
import NewpostScreen from './components/home/newpost/newpost';
import RegisterScreen from './components/register/register_screen';
import firebase from './firebase';
>>>>>>> Phuc
const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name='Welcome'
          component={WelcomeScreen}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{ headerShown: false  }}
        />
          <Stack.Screen
          name='Register'
          component={RegisterScreen}
          options={{ headerShown: false  }}
        />
        <Stack.Screen
          name='Register'
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Newposts'
          component={NewpostScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Chat'
          component={ChatScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default App;
