
import React from 'react';
import { SafeAreaView, FlatList, TouchableOpacity, View } from 'react-native';
import { Appbar, Card, Title } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';

const StaysScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { destinationName, destinationId } = route.params;

  const renderResort = ({ item }) => (
    <Card className="m-4 rounded-lg" elevation={5}>
      <Card.Content>
        <Title>{item.name}</Title>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Appbar.Header className="bg-green-600">
        <Appbar.BackAction onPress={() => navigation.goBack()} color="white" />
        <Appbar.Content title={`Stays in ${destinationName}`} titleStyle={{ color: 'white' }} />
      </Appbar.Header>
      <FlatList
        data={resorts}
        renderItem={renderResort}
        keyExtractor={item => item.id}
        contentContainerClassName="p-4"
      />
    </SafeAreaView>
  );
};

export default StaysScreen;
