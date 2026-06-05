import { useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { GameHeader } from '../../components/GameHeader';
import { generateGoteo } from '../../generators/GoteoGenerator';
import { Difficulty, GoteoPuzzle } from '../../types';
import { GoteoState } from './types';
import { buildAttempt, validateGoteo } from './validator';

interface Props {
  puzzleId: string;
  onComplete: (elapsedSeconds: number) => void;
}

export function GoteoBoard({ puzzleId, onComplete }: Props) {
  const difficulty = (puzzleId.split('-')[1] as Difficulty) ?? 'medium';
  const [puzzle] = useState<GoteoPuzzle>(() => generateGoteo(difficulty));
  const [state, setState] = useState<GoteoState>(() => puzzle.columns.map(() => undefined));
  const [solved, setSolved] = useState(false);
  const secondsRef = useRef(0);

  const handleSelect = (col: number, letterIdx: number) => {
    if (solved) return;
    const cur = state[col];
    const next = [...state];
    next[col] = cur === letterIdx ? undefined : letterIdx;
    setState(next);

    if (validateGoteo(puzzle, next).isCorrect) {
      setSolved(true);
      setTimeout(() => onComplete(secondsRef.current), 1000);
    }
  };

  const attempt = buildAttempt(puzzle, state);

  return (
    <View style={styles.wrapper}>
      <GameHeader running={!solved} onTick={(s) => { secondsRef.current = s; }} title="Goteo" />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.attemptBox}>
          <Text style={styles.attemptLabel}>Tu frase</Text>
          <Text style={styles.attemptText}>{attempt}</Text>
        </View>

        <ScrollView horizontal contentContainerStyle={styles.columnsRow}>
          {puzzle.columns.map((col, colIdx) => {
            if (col.length === 1 && col[0] === ' ') {
              return <View key={colIdx} style={styles.spacer} />;
            }
            return (
              <View key={colIdx} style={styles.column}>
                {col.map((letter, letterIdx) => {
                  const isSelected = state[colIdx] === letterIdx;
                  return (
                    <Pressable
                      key={letterIdx}
                      onPress={() => handleSelect(colIdx, letterIdx)}
                      style={[
                        styles.letter,
                        isSelected && styles.letterSelected,
                        solved && styles.letterSolved,
                      ]}
                    >
                      <Text style={[styles.letterText, isSelected && styles.letterTextSelected]}>
                        {letter}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            );
          })}
        </ScrollView>

        {solved && <Text style={styles.solvedText}>✓ ¡Resuelto!</Text>}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper:    { flex: 1 },
  container:  { padding: 12, gap: 16, alignItems: 'center' },
  attemptBox: {
    backgroundColor: '#1a1a2e', padding: 14, borderRadius: 12,
    borderWidth: 2, borderColor: '#6c63ff', width: '100%', alignItems: 'center', gap: 4,
  },
  attemptLabel: { color: '#888', fontSize: 11 },
  attemptText:  { color: '#fff', fontSize: 20, fontWeight: '700', letterSpacing: 2 },
  columnsRow:   { gap: 4, alignItems: 'flex-start' },
  column:       { gap: 4 },
  spacer:       { width: 8 },
  letter:       {
    width: 36, height: 36, backgroundColor: '#1a1a2e',
    borderWidth: 1, borderColor: '#2a2a3e', borderRadius: 6,
    alignItems: 'center', justifyContent: 'center',
  },
  letterSelected: { backgroundColor: '#6c63ff', borderColor: '#6c63ff' },
  letterSolved:   { borderColor: '#44ff88' },
  letterText:     { color: '#888', fontSize: 16, fontWeight: '700' },
  letterTextSelected: { color: '#fff' },
  solvedText:     { color: '#44ff88', fontSize: 20, fontWeight: '700' },
});
