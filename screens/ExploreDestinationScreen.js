
import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, TouchableOpacity, View } from 'react-native';
import { Appbar, Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const ExploreDestinationScreen = () => {
  const navigation = useNavigation();
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      const querySnapshot = await getDocs(collection(db, "destinations"));
      const destinationsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDestinations(destinationsData);
    };

    fetchDestinations();
  }, []);

  const renderDestination = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        if (item.id === 'kodaikanal') {
          navigation.navigate('StayInKodaikanal');
        } else {
          navigation.navigate('Stays', { destinationId: item.id, destinationName: item.name });
        }
      }}
    >
      <Card className="m-4 rounded-lg" elevation={5}>
        <Card.Content>
          <Title>{item.name}</Title>
          <Paragraph>{item.subtitle}</Paragraph>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Appbar.Header className="bg-green-600">
        <Appbar.Content title="Explore Destination" titleStyle={{ color: 'white' }} />
      </Appbar.Header>
      <FlatList
        data={destinations}
        renderItem={renderDestination}
        keyExtractor={item => item.id}
        contentContainerClassName="p-4"
      />
    </SafeAreaView>
  );
};

export default ExploreDestinationScreen;
