import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

// Import screens
import SplashScreen from './screens/SplashScreen';
import DestinationListPage from './screens/DestinationListPage';
import ResortListPage from './screens/ResortListPage';
import ResortDetailPage from './screens/ResortDetailPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="DestinationList" component={DestinationListPage} />
          <Stack.Screen name="ResortList" component={ResortListPage} />
          <Stack.Screen name="ResortDetail" component={ResortDetailPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}