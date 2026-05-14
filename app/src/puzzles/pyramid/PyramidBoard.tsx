import { useCallback, useState } from 'react';
import {
  Keyboard, KeyboardAvoidingView, Platform,
  Pressable, StyleSheet, Text, TextInput, View
} from 'react-native';
import { generatePyramid } from '../../generators/PyramidGenerator';
import { Difficulty, PyramidPuzzle } from '../../types';
import { validatePyramid } from './validator';

interface Props {
  puzzleId: string;
  onComplete: () => void;
}

export function PyramidBoard({ puzzleId, onComplete }: Props) {
  const difficulty = (puzzleId.split('-')[1] as Difficulty) ?? 'medium';

  const [puzzle] = useState<PyramidPuzzle>(() => generatePyramid(difficulty));
  const [current, setCurrent] = useState<(number | null)[][]>(() =>
    puzzle.cells.map((row) => [...row])
  );
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [errors, setErrors] = useState<Set<string>>(new Set());
  const [solved, setSolved] = useState(false);

  const isFixed = useCallback(
    (r: number, c: number) => puzzle.cells[r][c] !== null,
    [puzzle]
  );

  const handleCellPress = (r: number, c: number) => {
    if (isFixed(r, c) || solved) return;
    setSelected([r, c]);
  };

  const handleInput = (val: string) => {
    if (!selected) return;
    const [r, c] = selected;
    const num = parseInt(val, 10);
    const updated = current.map((row) => [...row]);
    updated[r][c] = isNaN(num) || val === '' ? null : num;
    setCurrent(updated);

    const result = validatePyramid(puzzle, updated);
    setErrors(new Set(result.errors.map(({ row, col }) => `${row},${col}`)));

    if (result.isCorrect) {
      setSolved(true);
      Keyboard.dismiss();
      setTimeout(onComplete, 800);
    }
  };

  const CELL_SIZE = 48;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.pyramid}>
        {current.map((row, r) => (
          <View key={r} style={styles.row}>
            {row.map((val, c) => {
              const fixed = isFixed(r, c);
              const isSelected = selected?.[0] === r && selected?.[1] === c;
              const hasError = errors.has(`${r},${c}`);

              return (
                <Pressable
                  key={c}
                  onPress={() => handleCellPress(r, c)}
                  style={[
                    styles.cell,
                    { width: CELL_SIZE, height: CELL_SIZE },
                    fixed       && styles.cellFixed,
                    isSelected  && styles.cellSelected,
                    hasError    && styles.cellError,
                    solved      && styles.cellSolved,
                  ]}
                >
                  <Text style={[styles.cellText, fixed && styles.cellTextFixed]}>
                    {val ?? ''}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>

      {selected && !isFixed(selected[0], selected[1]) && !solved && (
        <TextInput
          style={styles.hiddenInput}
          keyboardType="number-pad"
          maxLength={2}
          autoFocus
          onChangeText={handleInput}
          onBlur={() => setSelected(null)}
          value=""
        />
      )}

      {solved && <Text style={styles.solvedText}>✓ ¡Completado!</Text>}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container:       { alignItems: 'center', gap: 24 },
  pyramid:         { alignItems: 'center', gap: 6 },
  row:             { flexDirection: 'row', gap: 6 },
  cell:            {
    borderRadius: 10, borderWidth: 2, borderColor: '#2a2a3e',
    backgroundColor: '#1a1a2e', alignItems: 'center', justifyContent: 'center',
  },
  cellFixed:       { backgroundColor: '#2a2a3e', borderColor: '#3a3a5e' },
  cellSelected:    { borderColor: '#6c63ff', backgroundColor: '#2a2050' },
  cellError:       { borderColor: '#ff4444', backgroundColor: '#3a1a1a' },
  cellSolved:      { borderColor: '#44ff88', backgroundColor: '#1a3a2a' },
  cellText:        { color: '#aaa', fontSize: 18, fontWeight: '600' },
  cellTextFixed:   { color: '#fff' },
  hiddenInput:     { position: 'absolute', width: 1, height: 1, opacity: 0 },
  solvedText:      { color: '#44ff88', fontSize: 18, fontWeight: '700' },
});
