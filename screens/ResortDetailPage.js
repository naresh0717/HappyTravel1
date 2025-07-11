import React from 'react';
import { View, ScrollView, Image, FlatList, Linking, Alert } from 'react-native';
import { Appbar, Card, Title, Paragraph, Button, Chip, Divider } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';

const ResortDetailPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { resort } = route.params;

  const openYouTube = async () => {
    try {
      const supported = await Linking.canOpenURL(resort.youtubeUrl);
      if (supported) {
        await Linking.openURL(resort.youtubeUrl);
      } else {
        Alert.alert("Error", "Unable to open YouTube link");
      }
    } catch (error) {
      Alert.alert("Error", "Unable to open YouTube link");
    }
  };

  const renderImage = ({ item }) => (
    <Image
      source={{ uri: item }}
      className="w-80 h-48 mr-4 rounded-lg"
      resizeMode="cover"
    />
  );

  const renderFeature = (feature, index) => (
    <Chip key={index} className="mr-2 mb-2" mode="outlined">
      {feature}
    </Chip>
  );

  const renderAdvantage = (advantage, index) => (
    <View key={index} className="flex-row items-center mb-2">
      <View className="w-2 h-2 bg-green-500 rounded-full mr-3" />
      <Paragraph className="flex-1">{advantage}</Paragraph>
    </View>
  );

  const renderDisadvantage = (disadvantage, index) => (
    <View key={index} className="flex-row items-center mb-2">
      <View className="w-2 h-2 bg-red-500 rounded-full mr-3" />
      <Paragraph className="flex-1">{disadvantage}</Paragraph>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <Appbar.Header className="bg-green-600">
        <Appbar.BackAction onPress={() => navigation.goBack()} color="white" />
        <Appbar.Content title="Stay Details" titleStyle={{ color: 'white' }} />
      </Appbar.Header>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Resort Name */}
        <Card className="m-4 p-4">
          <Title className="text-2xl font-bold text-center text-green-700">
            {resort.name}
          </Title>
        </Card>

        {/* Image Carousel */}
        <Card className="m-4 p-4">
          <Title className="text-lg font-semibold mb-4">Photos</Title>
          <FlatList
            data={resort.images}
            renderItem={renderImage}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4"
          />
        </Card>

        {/* Stay Info */}
        <Card className="m-4 p-4">
          <Title className="text-lg font-semibold mb-4">Stay Information</Title>
          <View className="flex-row justify-between mb-2">
            <Paragraph className="font-semibold">Check-In:</Paragraph>
            <Paragraph>{resort.checkIn}</Paragraph>
          </View>
          <View className="flex-row justify-between">
            <Paragraph className="font-semibold">Check-Out:</Paragraph>
            <Paragraph>{resort.checkOut}</Paragraph>
          </View>
        </Card>

        {/* Features */}
        <Card className="m-4 p-4">
          <Title className="text-lg font-semibold mb-4">Features & Facilities</Title>
          <View className="flex-row flex-wrap">
            {resort.features.map(renderFeature)}
          </View>
        </Card>

        {/* Advantages */}
        <Card className="m-4 p-4">
          <Title className="text-lg font-semibold mb-4">Advantages</Title>
          {resort.advantages.map(renderAdvantage)}
        </Card>

        {/* Disadvantages */}
        <Card className="m-4 p-4">
          <Title className="text-lg font-semibold mb-4">Disadvantages</Title>
          {resort.disadvantages.map(renderDisadvantage)}
        </Card>

        {/* YouTube Video Button */}
        <Card className="m-4 p-4">
          <Button
            mode="contained"
            onPress={openYouTube}
            className="bg-red-600"
            contentStyle={{ paddingVertical: 8 }}
            labelStyle={{ fontSize: 16 }}
          >
            Watch Full Review on YouTube
          </Button>
        </Card>

        <View className="h-8" />
      </ScrollView>
    </View>
  );
};

export default ResortDetailPage;