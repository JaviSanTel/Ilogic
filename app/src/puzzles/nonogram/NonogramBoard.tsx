import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { generateNonogram } from '../../generators/NonogramGenerator';
import { Difficulty, NonogramPuzzle } from '../../types';
import { NonogramMark, NonogramState } from './types';
import { validateNonogram } from './validator';

interface Props {
  puzzleId: string;
  onComplete: () => void;
}

export function NonogramBoard({ puzzleId, onComplete }: Props) {
  const difficulty = (puzzleId.split('-')[1] as Difficulty) ?? 'medium';
  const puzzle: NonogramPuzzle = useMemo(() => generateNonogram(difficulty), [difficulty]);

  const [state, setState] = useState<NonogramState>(() =>
    Array.from({ length: puzzle.rows }, () => Array(puzzle.cols).fill(undefined))
  );
  const [solved, setSolved] = useState(false);

  // Cell size adaptado al tamaño del grid
  const CELL_SIZE = puzzle.rows <= 5 ? 36 : puzzle.rows <= 10 ? 26 : 20;
  const HEADER_W = puzzle.rows <= 5 ? 60 : puzzle.rows <= 10 ? 70 : 80;

  const cyclePress = (r: number, c: number) => {
    if (solved) return;
    const newState = state.map((row) => [...row]);
    const cur = newState[r][c];
    const next: NonogramMark =
      cur === undefined ? 'fill' : cur === 'fill' ? 'cross' : undefined;
    newState[r][c] = next;
    setState(newState);

    if (validateNonogram(puzzle, newState).isCorrect) {
      setSolved(true);
      setTimeout(onComplete, 1000);
    }
  };

  const maxColClueLength = Math.max(...puzzle.colClues.map((c) => c.length));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ScrollView horizontal>
        <View>
          {/* Column clues header */}
          <View style={styles.row}>
            <View style={{ width: HEADER_W }} />
            {puzzle.colClues.map((clues, c) => (
              <View key={c} style={[styles.colClue, { width: CELL_SIZE }]}>
                {Array(maxColClueLength - clues.length)
                  .fill(null)
                  .map((_, i) => (
                    <Text key={`pad-${i}`} style={styles.clueText}> </Text>
                  ))}
                {clues.map((n, i) => (
                  <Text key={i} style={styles.clueText}>
                    {n === 0 ? '0' : n}
                  </Text>
                ))}
              </View>
            ))}
          </View>

          {/* Rows with row clues + cells */}
          {puzzle.solution.map((_, r) => (
            <View key={r} style={styles.row}>
              <View style={[styles.rowClue, { width: HEADER_W }]}>
                <Text style={styles.clueText}>{puzzle.rowClues[r].join(' ')}</Text>
              </View>

              {state[r].map((mark, c) => (
                <Pressable
                  key={c}
                  onPress={() => cyclePress(r, c)}
                  style={[
                    styles.cell,
                    { width: CELL_SIZE, height: CELL_SIZE },
                    mark === 'fill'  && styles.cellFill,
                    mark === 'cross' && styles.cellCross,
                    solved           && styles.cellSolved,
                  ]}
                >
                  {mark === 'cross' && <Text style={styles.crossText}>×</Text>}
                </Pressable>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>

      {solved && <Text style={styles.solvedText}>✓ ¡Resuelto!</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:   { alignItems: 'center', padding: 12, gap: 12 },
  row:         { flexDirection: 'row' },
  colClue:     {
    alignItems: 'center', justifyContent: 'flex-end',
    paddingBottom: 4, gap: 1,
  },
  rowClue:     {
    alignItems: 'flex-end', justifyContent: 'center',
    paddingRight: 6,
  },
  clueText:    { color: '#aaa', fontSize: 10, fontWeight: '600' },
  cell:        {
    backgroundColor: '#1a1a2e', borderWidth: 1, borderColor: '#2a2a3e',
    alignItems: 'center', justifyContent: 'center',
  },
  cellFill:    { backgroundColor: '#6c63ff' },
  cellCross:   { backgroundColor: '#1a1a2e' },
  cellSolved:  { borderColor: '#44ff88' },
  crossText:   { color: '#666', fontSize: 14, fontWeight: '700' },
  solvedText:  { color: '#44ff88', fontSize: 20, fontWeight: '700' },
});
