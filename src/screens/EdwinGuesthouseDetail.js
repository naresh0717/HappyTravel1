import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Alert,
  Linking,
  Image,
} from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const EdwinGuesthouseDetail = ({ navigation, route }) => {
  const [stayDetails, setStayDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { stay } = route.params || {};

  useEffect(() => {
    fetchStayDetails();
  }, []);

  const fetchStayDetails = async () => {
    try {
      // Fetch detailed information from destinations > kodaikanal > stays > edwin-guesthouse
      const docRef = doc(db, 'destinations', 'kodaikanal', 'stays', 'edwin-guesthouse');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setStayDetails(docSnap.data());
      } else {
        Alert.alert('Error', 'Stay details not found.');
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stay details:', error);
      Alert.alert('Error', 'Failed to load stay details. Please try again.');
      setLoading(false);
    }
  };

  const handleYouTubePress = () => {
    if (stayDetails?.youtubeLink) {
      Linking.openURL(stayDetails.youtubeLink).catch((err) => {
        console.error('Error opening YouTube link:', err);
        Alert.alert('Error', 'Could not open YouTube link.');
      });
    }
  };

  const renderImageGallery = () => {
    // Placeholder for up to 7 images - can be enhanced later with actual images
    const placeholderCount = 7;

    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.imageGallery}
        contentContainerStyle={styles.imageGalleryContent}
      >
        {Array.from({ length: placeholderCount }, (_, index) => (
          <View
            key={index}
            style={styles.galleryImagePlaceholder}
          >
            <Text style={styles.placeholderText}>Image {index + 1}</Text>
          </View>
        ))}
      </ScrollView>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Loading stay details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!stayDetails) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Stay details not found.</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{stayDetails.name}</Text>
        </View>

        {renderImageGallery()}

        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Our Experience</Text>
            <Text style={styles.experienceText}>{stayDetails.experience}</Text>
          </View>

          {stayDetails.youtubeLink && (
            <TouchableOpacity
              style={styles.youtubeButton}
              onPress={handleYouTubePress}
            >
              <Text style={styles.youtubeButtonText}>
                Click here for the complete review of Edwin Guesthouse Resort
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4CAF50',
  },
  scrollView: {
    flex: 1,
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
  imageGallery: {
    backgroundColor: '#FFFFFF',
    marginVertical: 16,
  },
  imageGalleryContent: {
    paddingHorizontal: 16,
  },
  galleryImagePlaceholder: {
    width: 200,
    height: 150,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#999999',
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    padding: 16,
  },
  section: {
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  experienceText: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
  },
  youtubeButton: {
    backgroundColor: '#FF0000',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  youtubeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EdwinGuesthouseDetail;