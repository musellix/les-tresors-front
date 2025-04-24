import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
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
  // Récupère les paramètres de l'URL
  const { id } = useLocalSearchParams();

  const [itineraryData, setItineraryData] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const response = await axios.get(`http://localhost:3011/itinerary/${id}`);
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

  return (
    <View>
      <Text>Itinéraire ID : {id}</Text>
      <Text>{itineraryData?.title}</Text>
      <Text>{itineraryData?.startCity}</Text>
    </View>
  );
}
