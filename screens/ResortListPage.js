import React from 'react';
import { View, FlatList, Image, TouchableOpacity } from 'react-native';
import { Appbar, Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';

const ResortListPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { destination } = route.params;

  const resorts = [
    {
      id: 1,
      name: 'Hill Valley Resort',
      image: 'https://via.placeholder.com/400x200/FF9800/FFFFFF?text=Hill+Valley+Resort',
      description: 'Click to see full review and photos',
      checkIn: '2024-01-15',
      checkOut: '2024-01-17',
      features: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Mountain View'],
      advantages: [
        'Stunning mountain views',
        'Excellent service',
        'Clean and spacious rooms',
        'Great food quality'
      ],
      disadvantages: [
        'Limited parking',
        'No elevator',
        'Expensive room service'
      ],
      images: [
        'https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=Room+View',
        'https://via.placeholder.com/400x300/2196F3/FFFFFF?text=Pool+Area',
        'https://via.placeholder.com/400x300/FF5722/FFFFFF?text=Restaurant',
        'https://via.placeholder.com/400x300/9C27B0/FFFFFF?text=Spa',
        'https://via.placeholder.com/400x300/FF9800/FFFFFF?text=Garden',
        'https://via.placeholder.com/400x300/795548/FFFFFF?text=Lobby',
        'https://via.placeholder.com/400x300/607D8B/FFFFFF?text=Exterior'
      ],
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
      id: 2,
      name: 'Lake View Lodge',
      image: 'https://via.placeholder.com/400x200/E91E63/FFFFFF?text=Lake+View+Lodge',
      description: 'Click to see full review and photos',
      checkIn: '2024-02-10',
      checkOut: '2024-02-12',
      features: ['Lake View', 'Boating', 'Fishing', 'Campfire', 'WiFi'],
      advantages: [
        'Beautiful lake views',
        'Peaceful environment',
        'Great for families',
        'Affordable pricing'
      ],
      disadvantages: [
        'Limited room service',
        'No AC in some rooms',
        'Remote location'
      ],
      images: [
        'https://via.placeholder.com/400x300/E91E63/FFFFFF?text=Lake+View',
        'https://via.placeholder.com/400x300/3F51B5/FFFFFF?text=Cottage',
        'https://via.placeholder.com/400x300/00BCD4/FFFFFF?text=Boating',
        'https://via.placeholder.com/400x300/8BC34A/FFFFFF?text=Garden',
        'https://via.placeholder.com/400x300/FFC107/FFFFFF?text=Dining',
        'https://via.placeholder.com/400x300/FF5722/FFFFFF?text=Fireplace',
        'https://via.placeholder.com/400x300/9E9E9E/FFFFFF?text=Balcony'
      ],
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    }
  ];

  const renderResort = ({ item }) => (
    <TouchableOpacity
      className="m-4"
      onPress={() => navigation.navigate('ResortDetail', { resort: item })}
    >
      <Card className="rounded-xl" elevation={5}>
        <Card.Cover source={{ uri: item.image }} className="h-48" />
        <Card.Content className="p-4">
          <Title className="text-xl font-bold mb-2">{item.name}</Title>
          <Paragraph className="text-gray-600">{item.description}</Paragraph>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <Appbar.Header className="bg-green-600">
        <Appbar.BackAction onPress={() => navigation.goBack()} color="white" />
        <Appbar.Content title={`Stays in ${destination.name}`} titleStyle={{ color: 'white' }} />
      </Appbar.Header>

      <FlatList
        data={resorts}
        renderItem={renderResort}
        keyExtractor={item => item.id.toString()}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default ResortListPage;