import { useCallback, useMemo, useState } from 'react';
import {
  Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, View,
} from 'react-native';
import { generateKakuro } from '../../generators/KakuroGenerator';
import { Difficulty, KakuroCell, KakuroPuzzle } from '../../types';
import { validateKakuro } from './validator';

interface Props {
  puzzleId: string;
  onComplete: () => void;
}

const CELL_SIZE = 44;

export function KakuroBoard({ puzzleId, onComplete }: Props) {
  const difficulty = (puzzleId.split('-')[1] as Difficulty) ?? 'medium';

  const initial = useMemo(() => generateKakuro(difficulty), [difficulty]);
  const [puzzle, setPuzzle] = useState<KakuroPuzzle>(initial);
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [solved, setSolved] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const handleCellPress = (r: number, c: number) => {
    if (solved) return;
    const cell = puzzle.grid[r][c];
    if (cell.kind !== 'input') return;
    setSelected([r, c]);
    setShowErrors(false);
  };

  const handleInput = (val: string) => {
    if (!selected) return;
    const [r, c] = selected;
    const num = parseInt(val, 10);
    const newGrid = puzzle.grid.map((row) => row.map((cell) => ({ ...cell })));
    const cell = newGrid[r][c] as Extract<KakuroCell, { kind: 'input' }>;
    cell.value = isNaN(num) || num < 1 || num > 9 ? null : num;
    const newPuzzle = { ...puzzle, grid: newGrid };
    setPuzzle(newPuzzle);

    const result = validateKakuro(newPuzzle);
    if (result.isCorrect) {
      setSolved(true);
      Keyboard.dismiss();
      setTimeout(onComplete, 800);
    }
  };

  const handleCheck = () => {
    setShowErrors(true);
  };

  const errors = useMemo(() => {
    if (!showErrors) return new Set<string>();
    return new Set(validateKakuro(puzzle).errors.map((e) => `${e.row},${e.col}`));
  }, [puzzle, showErrors]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        {puzzle.grid.map((row, r) => (
          <View key={r} style={styles.row}>
            {row.map((cell, c) => {
              const key = `${r},${c}`;
              const isSelected = selected?.[0] === r && selected?.[1] === c;
              const hasError = errors.has(key);

              if (cell.kind === 'black') {
                return <View key={c} style={[styles.cell, styles.cellBlack]} />;
              }
              if (cell.kind === 'clue') {
                return (
                  <View key={c} style={[styles.cell, styles.cellClue]}>
                    {cell.sumDown !== undefined && (
                      <Text style={[styles.clueText, styles.clueDown]}>{cell.sumDown}</Text>
                    )}
                    {cell.sumRight !== undefined && (
                      <Text style={[styles.clueText, styles.clueRight]}>{cell.sumRight}</Text>
                    )}
                    <View style={styles.clueDiagonal} />
                  </View>
                );
              }
              // input
              return (
                <Pressable
                  key={c}
                  onPress={() => handleCellPress(r, c)}
                  style={[
                    styles.cell,
                    styles.cellInput,
                    isSelected && styles.cellSelected,
                    hasError   && styles.cellError,
                    solved     && styles.cellSolved,
                  ]}
                >
                  <Text style={styles.inputText}>{cell.value ?? ''}</Text>
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>

      {selected && !solved && (
        <TextInput
          style={styles.hiddenInput}
          keyboardType="number-pad"
          maxLength={1}
          autoFocus
          onChangeText={handleInput}
          onBlur={() => setSelected(null)}
          value=""
        />
      )}

      <View style={styles.actions}>
        <Pressable style={styles.checkBtn} onPress={handleCheck}>
          <Text style={styles.checkBtnText}>Comprobar</Text>
        </Pressable>
      </View>

      {solved && <Text style={styles.solvedText}>✓ ¡Resuelto!</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:      { alignItems: 'center', padding: 12 },
  row:            { flexDirection: 'row' },
  cell:           {
    width: CELL_SIZE, height: CELL_SIZE,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: '#2a2a3e',
  },
  cellBlack:      { backgroundColor: '#0a0a14' },
  cellClue:       { backgroundColor: '#2a2a3e', position: 'relative' },
  clueDiagonal:   {
    position: 'absolute', width: '141%', height: 1,
    backgroundColor: '#4a4a6e', top: '50%',
    transform: [{ rotate: '-45deg' }],
  },
  clueText:       { color: '#bbb', fontSize: 11, fontWeight: '700', position: 'absolute' },
  clueDown:       { left: 4, bottom: 3 },
  clueRight:      { right: 4, top: 3 },
  cellInput:      { backgroundColor: '#1a1a2e' },
  cellSelected:   { borderColor: '#6c63ff', borderWidth: 2, backgroundColor: '#2a2050' },
  cellError:      { backgroundColor: '#3a1a1a', borderColor: '#ff4444' },
  cellSolved:     { backgroundColor: '#1a3a2a', borderColor: '#44ff88' },
  inputText:      { color: '#fff', fontSize: 20, fontWeight: '600' },
  hiddenInput:    { position: 'absolute', width: 1, height: 1, opacity: 0 },
  actions:        { marginTop: 16, flexDirection: 'row', gap: 8 },
  checkBtn:       {
    backgroundColor: '#2a2a3e', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10,
  },
  checkBtnText:   { color: '#ccc', fontSize: 14, fontWeight: '600' },
  solvedText:     { color: '#44ff88', fontSize: 20, fontWeight: '700', marginTop: 12 },
});
