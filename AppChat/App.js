import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/login/index';
import WelcomeScreen from './components/welcome/index';
import ChatScreen from './components/chat/index';
import HomeScreen from './components/home';
<<<<<<< HEAD
import RegisterScreen from './components/register';
=======
>>>>>>> origin/main
const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
<<<<<<< HEAD
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
=======
        <Stack.Screen
          name='Welcome'
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{ headerShown: false }}
>>>>>>> origin/main
        />
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Chat'
          component={ChatScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
<<<<<<< HEAD

  );
};

export default App;
=======
  );
};

export default App;
>>>>>>> origin/main
