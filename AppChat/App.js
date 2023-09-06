import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import styles from './App.component';
import SearchScreen from './components/search';
import WelcomeScreen from './components/welcome';

export default function App() {
  return (
    <View style={styles.container}>
      <WelcomeScreen />
    </View>
  );
}
