import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ClasificacionesBoard } from '../../src/puzzles/clasificaciones/ClasificacionesBoard';
import { CruzexBoard } from '../../src/puzzles/cruzex/CruzexBoard';
import { GoteoBoard } from '../../src/puzzles/goteo/GoteoBoard';
import { KakuroBoard } from '../../src/puzzles/kakuro/KakuroBoard';
import { LanzarayosBoard } from '../../src/puzzles/lanzarrayos/LanzarayosBoard';
import { LogicGridBoard } from '../../src/puzzles/logic-grid/LogicGridBoard';
import { NonogramBoard } from '../../src/puzzles/nonogram/NonogramBoard';
import { PyramidBoard } from '../../src/puzzles/pyramid/PyramidBoard';
import { SudokuBoard } from '../../src/puzzles/sudoku/SudokuBoard';
import { PuzzleType } from '../../src/types';

/** Detecta el tipo de puzzle desde el puzzleId */
function parsePuzzleType(puzzleId: string): PuzzleType | undefined {
  if (puzzleId.startsWith('logic-grid-')) return 'logic-grid';
  if (puzzleId.startsWith('sudoku-')) return 'sudoku';
  const firstPart = puzzleId.split('-')[0];
  return firstPart as PuzzleType;
}

export default function GameScreen() {
  const { puzzleId } = useLocalSearchParams<{ puzzleId: string }>();
  const router = useRouter();
  const puzzleType = puzzleId ? parsePuzzleType(puzzleId) : undefined;

  const handleComplete = (elapsedSeconds: number) => {
    router.replace(`/results/${puzzleId}?time=${elapsedSeconds}`);
  };

  const renderBoard = () => {
    switch (puzzleType) {
      case 'pyramid':         return <PyramidBoard puzzleId={puzzleId!} onComplete={handleComplete} />;
      case 'logic-grid':      return <LogicGridBoard puzzleId={puzzleId!} onComplete={handleComplete} />;
      case 'kakuro':          return <KakuroBoard puzzleId={puzzleId!} onComplete={handleComplete} />;
      case 'nonogram':        return <NonogramBoard puzzleId={puzzleId!} onComplete={handleComplete} />;
      case 'goteo':           return <GoteoBoard puzzleId={puzzleId!} onComplete={handleComplete} />;
      case 'clasificaciones': return <ClasificacionesBoard puzzleId={puzzleId!} onComplete={handleComplete} />;
      case 'cruzex':          return <CruzexBoard puzzleId={puzzleId!} onComplete={handleComplete} />;
      case 'lanzarrayos':     return <LanzarayosBoard puzzleId={puzzleId!} onComplete={handleComplete} />;
      case 'sudoku':          return <SudokuBoard puzzleId={puzzleId!} onComplete={handleComplete} />;
      default:
        return (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>🚧 {puzzleType} — próximamente</Text>
          </View>
        );
    }
  };

  return <SafeAreaView style={styles.safe}>{renderBoard()}</SafeAreaView>;
}

const styles = StyleSheet.create({
  safe:            { flex: 1, backgroundColor: '#0f0f1a' },
  placeholder:     { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  placeholderText: { color: '#888', fontSize: 16 },
});
