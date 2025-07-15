import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, ActivityIndicator, Image, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const EdwinGuesthouseDetailScreen = () => {
  const [guesthouse, setGuesthouse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "destinations", "kodaikanal", "stays", "edwin-guesthouse");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setGuesthouse(docSnap.data());
        } else {
          // No document!
        }
      } catch (error) {
        console.error('Firebase fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
        <SafeAreaView style={styles.centered}>
            <ActivityIndicator size="large" color="#22c55e" />
            <Text style={styles.loadingText}>Loading details...</Text>
        </SafeAreaView>
    );
  }

  if (!guesthouse) {
    return (
        <SafeAreaView style={styles.centered}>
            <Text>Could not load guesthouse details. Please try again later.</Text>
        </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{guesthouse.name || "Edwin Guesthouse"}</Text>

            {guesthouse.images && guesthouse.images.length > 0 ? (
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.imageGallery}>
                    {guesthouse.images.map((url, index) => (
                        <Image key={index} source={{ uri: url }} style={styles.image} />
                    ))}
                </ScrollView>
            ) : (
                <Text style={styles.fallbackText}>No images available.</Text>
            )}

            <Text style={styles.sectionTitle}>Our Experience</Text>
            <Text style={styles.experienceText}>{guesthouse.experience || "No experience details available."}</Text>

            {guesthouse.youtubeLink && (
                <TouchableOpacity 
                    style={styles.youtubeButton} 
                    onPress={() => Linking.openURL(guesthouse.youtubeLink)}
                >
                    <FontAwesome name="youtube-play" size={20} color="white" style={styles.youtubeIcon} />
                    <Text style={styles.youtubeButtonText}>Click here for the complete review of Edwin Guesthouse Resort</Text>
                </TouchableOpacity>
            )}

        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0fdf4', // Light green background
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
  },
  loadingText: {
      marginTop: 10,
      fontSize: 16,
      color: '#166534'
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#14532d', // Dark green
    marginBottom: 20,
    textAlign: 'left',
  },
  imageGallery: {
      marginBottom: 20,
  },
  image: {
      width: 300,
      height: 200,
      borderRadius: 10,
      marginRight: 10,
  },
  sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#166534', // Medium green
      marginTop: 10,
      marginBottom: 10,
  },
  experienceText: {
      fontSize: 16,
      lineHeight: 24,
      color: '#333',
      textAlign: 'left',
  },
  fallbackText: {
      fontSize: 16,
      color: 'gray',
      marginTop: 10,
      marginBottom: 20,
  },
  youtubeButton: {
    flexDirection: 'row',
    backgroundColor: '#FF0000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginHorizontal: 20,
  },
  youtubeIcon: {
    marginRight: 10,
  },
  youtubeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EdwinGuesthouseDetailScreen;