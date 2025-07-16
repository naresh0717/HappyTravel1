import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// Import screens
import SplashScreen from './src/screens/SplashScreen';
import ExploreDestinationScreen from './src/screens/ExploreDestinationScreen';
import StayInKodaikanal from './src/screens/StayInKodaikanal';
import EdwinGuesthouseDetail from './src/screens/EdwinGuesthouseDetail';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="ExploreDestinationScreen" component={ExploreDestinationScreen} />
          <Stack.Screen name="StayInKodaikanal" component={StayInKodaikanal} />
          <Stack.Screen name="EdwinGuesthouseDetail" component={EdwinGuesthouseDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}