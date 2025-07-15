import React, { useEffect } from 'react';
import { SafeAreaView, Text, Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('ExploreDestination');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white p-4">
      <Image
        source={require('../assets/logo.png')}
        className="w-32 h-32 mb-8"
        resizeMode="contain"
      />
      <Text className="text-4xl font-bold text-green-600 text-center">
        Happy Travel
      </Text>
      <Text className="text-lg text-gray-600 mt-4 text-center">
        Explore Your Journey
      </Text>
    </SafeAreaView>
  );
};

export default SplashScreen;