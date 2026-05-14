import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PuzzleButton } from '../../src/components/PuzzleButton';
import { PyramidBoard } from '../../src/puzzles/pyramid/PyramidBoard';
import { PuzzleType } from '../../src/types';

export default function GameScreen() {
  const { puzzleId } = useLocalSearchParams<{ puzzleId: string }>();
  const router = useRouter();

  // puzzleId format: "{type}-{difficulty}-{timestamp}"
  const puzzleType = puzzleId?.split('-')[0] as PuzzleType | undefined;

  const handleComplete = () => {
    router.replace(`/results/${puzzleId}`);
  };

  const renderBoard = () => {
    switch (puzzleType) {
      case 'pyramid':
        return <PyramidBoard puzzleId={puzzleId!} onComplete={handleComplete} />;
      default:
        return (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>🚧 {puzzleType} — próximamente</Text>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <PuzzleButton
          label="← Salir"
          onPress={() => router.back()}
          variant="ghost"
          size="sm"
        />
      </View>
      <View style={styles.content}>{renderBoard()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:        { flex: 1, backgroundColor: '#0f0f1a' },
  header:      { paddingHorizontal: 16, paddingTop: 8 },
  content:     { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  placeholder: { alignItems: 'center', gap: 12 },
  placeholderText: { color: '#888', fontSize: 16 },
});
