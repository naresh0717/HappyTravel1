import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

// Import screens
import SplashScreen from './screens/SplashScreen';
import ExploreDestinationScreen from './screens/ExploreDestinationScreen';
import StaysScreen from './screens/StaysScreen';

import StayInKodaikanalScreen from './screens/StayInKodaikanal';
import EdwinGuesthouseDetailScreen from './screens/EdwinGuesthouseDetail';

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
          <Stack.Screen name="ExploreDestination" component={ExploreDestinationScreen} />
          <Stack.Screen name="Stays" component={StaysScreen} />
          <Stack.Screen name="StayInKodaikanal" component={StayInKodaikanalScreen} />
          <Stack.Screen name="EdwinGuesthouseDetail" component={EdwinGuesthouseDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}