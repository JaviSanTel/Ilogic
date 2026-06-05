import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PuzzleButton } from '../../src/components/PuzzleButton';
import { StorageService } from '../../src/storage/StorageService';
import { Difficulty, PuzzleType } from '../../src/types';

const TITLES: Record<string, string> = {
  pyramid:         'Pirámide',
  'logic-grid':    'Quién es Quién',
  kakuro:          'Kakuro',
  nonogram:        'Nonograma',
  lanzarrayos:     'Lanzarrayos',
  cruzex:          'Crúzex',
  clasificaciones: 'Clasificaciones',
  goteo:           'Goteo',
};

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function ResultsScreen() {
  const { puzzleId, time } = useLocalSearchParams<{ puzzleId: string; time: string }>();
  const router = useRouter();
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [isNewRecord, setIsNewRecord] = useState(false);

  const parts = puzzleId?.split('-') ?? [];
  // formato: {type}-{difficulty}-{timestamp} — pero 'logic-grid' tiene guión
  const type = (parts[0] === 'logic' ? 'logic-grid' : parts[0]) as PuzzleType;
  const difficulty = (parts[0] === 'logic' ? parts[2] : parts[1]) as Difficulty;
  const elapsed = parseInt(time ?? '0', 10);
  const title = TITLES[type] ?? type;

  useEffect(() => {
    const save = async () => {
      const stats = await StorageService.loadStats();
      const key = `${type}-${difficulty}`;
      const prev = stats.bestTimes[key];
      const isNew = !prev || elapsed < prev;
      setBestTime(isNew ? elapsed : prev);
      setIsNewRecord(isNew);

      await StorageService.updateStats({
        puzzleId,
        type,
        difficulty,
        completedAt: Date.now(),
        elapsedSeconds: elapsed,
      });
    };
    save().catch(() => null);
  }, [puzzleId, type, difficulty, elapsed]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.emoji}>🎉</Text>
        <Text style={styles.title}>¡Resuelto!</Text>
        <Text style={styles.subtitle}>{title} · {difficulty}</Text>

        <View style={styles.timeCard}>
          <Text style={styles.timeLabel}>Tu tiempo</Text>
          <Text style={styles.timeValue}>{formatTime(elapsed)}</Text>
          {isNewRecord ? (
            <Text style={styles.newRecord}>🏆 ¡Nuevo récord personal!</Text>
          ) : bestTime !== null ? (
            <Text style={styles.bestTime}>Mejor: {formatTime(bestTime)}</Text>
          ) : null}
        </View>

        <View style={styles.actions}>
          <PuzzleButton
            label="Jugar de nuevo"
            onPress={() => {
              const newId = `${type}-${difficulty}-${Date.now()}`;
              router.replace(`/game/${newId}`);
            }}
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
  subtitle:  { fontSize: 14, color: '#888' },
  timeCard:  {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#2a2a3e',
    marginTop: 16,
  },
  timeLabel: { color: '#888', fontSize: 13 },
  timeValue: { color: '#6c63ff', fontSize: 42, fontWeight: '800', fontVariant: ['tabular-nums'] },
  newRecord: { color: '#44ff88', fontSize: 14, fontWeight: '700', marginTop: 4 },
  bestTime:  { color: '#aaa', fontSize: 13, marginTop: 4 },
  actions:   { width: '100%', gap: 10, marginTop: 16 },
});
