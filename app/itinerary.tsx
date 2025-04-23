import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export default function ItineraryScreen() {
  // Récupère les paramètres de l'URL
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Itinéraire ID : {id}</Text>
    </View>
  );
}
