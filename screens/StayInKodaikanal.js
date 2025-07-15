import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, TouchableOpacity, View } from 'react-native';
import { Appbar, Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const StayInKodaikanalScreen = () => {
  const navigation = useNavigation();
  const [stays, setStays] = useState([]);

  useEffect(() => {
    const fetchStays = async () => {
      const querySnapshot = await getDocs(collection(db, "destinations", "kodaikanal", "stays"));
      const staysData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStays(staysData);
    };

    fetchStays();
  }, []);

  const renderStay = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        if (item.id === 'edwin-guesthouse') {
          navigation.navigate('EdwinGuesthouseDetail');
        } else {
          // Handle other stays if necessary
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
        <Appbar.BackAction onPress={() => navigation.goBack()} color="white" />
        <Appbar.Content title="Stays in Kodaikanal" titleStyle={{ color: 'white' }} />
      </Appbar.Header>
      <FlatList
        data={stays}
        renderItem={renderStay}
        keyExtractor={item => item.id}
        contentContainerClassName="p-4"
      />
    </SafeAreaView>
  );
};

export default StayInKodaikanalScreen;