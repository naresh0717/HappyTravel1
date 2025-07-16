import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Alert,
} from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

const StayInKodaikanal = ({ navigation, route }) => {
  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(true);
  const { destination } = route.params || {};

  useEffect(() => {
    fetchStays();
  }, []);

  const fetchStays = async () => {
    try {
      // Fetch stays from destinations > kodaikanal > stays
      const querySnapshot = await getDocs(collection(db, 'destinations', 'kodaikanal', 'stays'));
      const staysList = [];
      
      querySnapshot.forEach((doc) => {
        staysList.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      setStays(staysList);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stays:', error);
      Alert.alert('Error', 'Failed to load stays. Please try again.');
      setLoading(false);
    }
  };

  const handleStayPress = (stay) => {
    // Navigate to the specific stay detail screen
    navigation.navigate('EdwinGuesthouseDetail', { stay });
  };

  const renderStay = ({ item }) => (
    <TouchableOpacity
      style={styles.stayCard}
      onPress={() => handleStayPress(item)}
    >
      <Text style={styles.stayName}>{item.name}</Text>
      <Text style={styles.staySubtitle}>{item.subtitle}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Loading stays...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Stays in Kodaikanal</Text>
      </View>
      
      <FlatList
        data={stays}
        renderItem={renderStay}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4CAF50',
  },
  header: {
    backgroundColor: '#388E3C',
    paddingVertical: 20,
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  listContainer: {
    padding: 16,
  },
  stayCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  stayName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  staySubtitle: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 22,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default StayInKodaikanal;