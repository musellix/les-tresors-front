import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';

type Itinerary = {
  id: number;
  title: string;
  startCity: string;
  startLocation: { latitude: number; longitude: number };
  theme: string;
  typeOfCache: string;
  difficulty: number;
  duration: string;
  accessibility: string;
  photoUrl: string | null;
};

export default function ItineraryScreen() {
  const { id } = useLocalSearchParams();
  const [itineraryData, setItineraryData] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const response = await axios.get(`http://localhost:3011/itinerary?id=${id}`);
        setItineraryData(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération du parcours', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItinerary();
  }, [id]);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (!itineraryData) return <Text>Parcours introuvable</Text>;

  return (
    <ScrollView>
      {/* HEADER PARCOURS */}
      <View style={styles.container}>
        {itineraryData.photoUrl && (
          <Image source={{ uri: itineraryData.photoUrl }} style={styles.coverImage} />
        )}

        <View style={styles.overlay}>
          {/* Remplace cette image par une image dynamique si besoin */}
          <Image source={require('../assets/avatar.png')} style={styles.avatar} />

          <Text style={styles.category}>{itineraryData.theme.toUpperCase()}</Text>
          <Text style={styles.title}>{itineraryData.startCity.toUpperCase()}, {itineraryData.title}</Text>
          <Text style={styles.subtitle}>{itineraryData.accessibility}</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Cache</Text>
              <Text style={styles.infoValue}>{itineraryData.typeOfCache}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Durée</Text>
              <Text style={styles.infoValue}>{itineraryData.duration}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Difficulté</Text>
              <Text style={styles.infoValue}>{itineraryData.difficulty}</Text>
            </View>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>VOIR LE PARCOURS</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonOutline}>
              <Text style={styles.buttonOutlineText}>COMMENTAIRES</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* On ajoutera ici la partie préambule / étapes ensuite */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: 200,
  },
  overlay: {
    alignItems: 'center',
    padding: 16,
    marginTop: -50,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  category: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#888',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginVertical: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 8,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 12,
  },
  button: {
    backgroundColor: '#EA4C89',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonOutline: {
    borderColor: '#EA4C89',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  buttonOutlineText: {
    color: '#EA4C89',
    fontWeight: 'bold',
  },
});
