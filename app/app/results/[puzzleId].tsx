import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PuzzleButton } from '../../src/components/PuzzleButton';

export default function ResultsScreen() {
  const { puzzleId } = useLocalSearchParams<{ puzzleId: string }>();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.emoji}>🎉</Text>
        <Text style={styles.title}>¡Resuelto!</Text>
        <Text style={styles.subtitle}>{puzzleId}</Text>

        <View style={styles.actions}>
          <PuzzleButton
            label="Jugar de nuevo"
            onPress={() => router.replace(`/game/${puzzleId}`)}
            variant="primary"
          />
          <PuzzleButton
            label="Menú principal"
            onPress={() => router.replace('/')}
            variant="ghost"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:      { flex: 1, backgroundColor: '#0f0f1a' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32, gap: 16 },
  emoji:     { fontSize: 64 },
  title:     { fontSize: 32, fontWeight: '800', color: '#fff' },
  subtitle:  { fontSize: 13, color: '#666' },
  actions:   { width: '100%', gap: 10, marginTop: 24 },
});
