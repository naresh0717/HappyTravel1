import React from 'react';
import { View, FlatList, Image, TouchableOpacity } from 'react-native';
import { Appbar, Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const DestinationListPage = () => {
  const navigation = useNavigation();

  const destinations = [
    {
      id: 1,
      name: 'Kodaikanal',
      image: 'https://via.placeholder.com/400x200/2196F3/FFFFFF?text=Kodaikanal',
      description: 'Click to explore resorts stayed here'
    }
  ];

  const renderDestination = ({ item }) => (
    <TouchableOpacity
      className="m-4"
      onPress={() => navigation.navigate('ResortList', { destination: item })}
    >
      <Card className="rounded-lg" elevation={5}>
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
        <Appbar.Content title="Explore Destinations" titleStyle={{ color: 'white' }} />
      </Appbar.Header>

      <FlatList
        data={destinations}
        renderItem={renderDestination}
        keyExtractor={item => item.id.toString()}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default DestinationListPage;