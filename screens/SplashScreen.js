import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('DestinationList');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Image
        source={{ uri: 'https://via.placeholder.com/150x150/4CAF50/FFFFFF?text=HT' }}
        className="w-32 h-32 mb-8"
        resizeMode="contain"
      />
      <Text className="text-4xl font-bold text-green-600 text-center">
        Happy Travel
      </Text>
      <Text className="text-lg text-gray-600 mt-4 text-center">
        Explore Your Journey
      </Text>
    </View>
  );
};

export default SplashScreen;