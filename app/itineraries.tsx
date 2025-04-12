import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

type Itinerary = {
    id: number;
    title: string;
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

  useEffect(() => {
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
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.theme}>{item.theme.name}</Text>
            <Text>Difficulty: {item.difficulty}</Text>
            <Text>Duration: {item.duration}</Text>
            <Text>Type: {item.typeOfCache}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    item: {
      marginBottom: 12,
      padding: 16,
      backgroundColor: '#eaeaea',
      borderRadius: 8,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 18,
      marginBottom: 4,
    },
    theme: {
      fontStyle: 'italic',
      marginBottom: 4,
    },
});
