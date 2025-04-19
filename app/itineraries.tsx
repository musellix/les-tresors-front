import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image } from 'react-native';
import * as Location from 'expo-location';
import { iskorriganName, macarons } from '../constants/images';
import { calculateDistance } from '@/utils/geoUtils';

// Mapping thème → couleur principale
const themeColors: Record<string, string> = {
    SPORT: '#E86430',
    HISTOIRE: '#B92C42',
    MER: '#0085AD',
    URBAIN: '#8854D0',
    // Ajoute d'autres si nécessaire
};

type Itinerary = {
    id: number;
    title: string;
    startCity: string;
    startLocation: {
      latitude: number;
      longitude: number;
    };
    theme: {
      id: number;
      name: string;
      theme: string;
    };
    typeOfCache: string;
    difficulty: number;
    duration: string;
    accessibility: string;
    photoUrl: string | null;
};



export default function ItinerairesScreen() {
  const [data, setData] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPosition, setCurrentPosition] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    (async () => {
        // Demander la permission de localisation
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission de localisation refusée');
          return;
        }

        // Obtenir la position actuelle
        const location = await Location.getCurrentPositionAsync({});
        setCurrentPosition({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        fetch('http://localhost:3011/itinerary')
          .then((res) => res.json())
          .then((json) => {
            setData(json);
            setLoading(false);
          })
          .catch((err) => {
            console.error(err);
            setLoading(false);
          });
      })();
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => { 
            const themeKey = item.theme.name.toLowerCase().replace(/\s/g, '_');
            const korrigan = iskorriganName(themeKey) ? themeKey : 'korry_gan';
            const color = themeColors[item.theme.theme.toUpperCase()] || '#333';

            const distance = calculateDistance(
              currentPosition.latitude,
              currentPosition.longitude,
              item.startLocation.latitude,
              item.startLocation.longitude
            );
            
            return (
                <View style={styles.card}>
                  <View style={styles.topSection}>
                    <Image source={macarons[korrigan]} style={styles.image} />
                    <View style={styles.content}>
                      {/* Section principale : Titre, catégorie, etc. */}
                      <Text style={[styles.themeTag, { color }]}>{item.theme.theme.toUpperCase()}</Text>
                      <View style={styles.locationBlock}>
                        <Text style={styles.locationCity}>📍 {item.startCity}</Text>
                        <Text style={styles.locationDistance}>à {distance.toFixed(2)} km de moi</Text>
                      </View>
                      <Text style={styles.title}>{item.title}</Text>
                    </View>
                  </View>
              
                  {/* Section des détails en bas */}
                  <View style={styles.detailsRow}>
                    <View style={styles.detailItem}>
                      <Text style={styles.label}>CACHE</Text>
                      <Text style={[styles.value, { color }]}>{item.typeOfCache}</Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.detailItem}>
                      <Text style={styles.label}>NIVEAU</Text>
                      <Text>
                        <Text style={[styles.filledCircle, { color }]}>{'●'.repeat(item.difficulty)}</Text>
                        <Text style={[styles.filledCircle, { color: styles.label.color }]}>{'●'.repeat(5 - item.difficulty)}</Text>
                      </Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.detailItem}>
                      <Text style={styles.label}>DURÉE</Text>
                      <Text style={[styles.value, { color }]}>{item.duration}</Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.detailItem}>
                      <Text style={styles.label}>DISTANCE</Text>
                      <Text style={[styles.value, { color }]}>- km</Text>
                    </View>
                  </View>
                </View>
              );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#929082',
    },
    card: {
      flexDirection: 'column',
      backgroundColor: 'white',
      padding: 16,
      borderRadius: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
      marginBottom: 16,
      marginHorizontal: 16
    },
    topSection: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 16,
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 8,
      marginRight: 16,
    },
    content: {
      flex: 1,
    },
    themeTag: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    locationBlock: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginBottom: 8,
    },
    locationCity: {
      fontSize: 16,
      color: '#888888',
    },
    locationDistance: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#000000',
      marginLeft: 8,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
      textTransform: 'uppercase',
    },
    detailsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      width: '100%',
    },
    detailItem: {
      alignItems: 'center',
      flex: 1,
    },
    label: {
      fontSize: 16, 
      color: '#888',
      textTransform: 'uppercase', 
      marginBottom: 4, 
    },
    value: {
      fontSize: 20, 
      fontWeight: 'bold', 
      color: '#333',
    },
    filledCircle: {
      fontSize: 24, 
      fontWeight: 'bold',
      fontFamily: 'monospace',
      color: '#333',
    },
    separator: {
      width: 2,
      height: 40,
      backgroundColor: '#C7C7C7',
      marginHorizontal: 8,
    },
  });