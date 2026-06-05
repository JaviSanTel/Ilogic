import { useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { GameHeader } from '../../components/GameHeader';
import { HELP } from '../../components/helpTexts';
import { NumberPad } from '../../components/NumberPad';
import { generateCruzex } from '../../generators/CruzexGenerator';
import { CruzexPuzzle, Difficulty } from '../../types';
import { validateCruzex } from './validator';

interface Props {
  puzzleId: string;
  onComplete: (elapsedSeconds: number) => void;
}

export function CruzexBoard({ puzzleId, onComplete }: Props) {
  const difficulty = (puzzleId.split('-')[1] as Difficulty) ?? 'medium';
  const puzzle: CruzexPuzzle = useMemo(() => generateCruzex(difficulty), [difficulty]);

  const [grid, setGrid] = useState<(number | null)[][]>(() =>
    puzzle.grid.map((row) => [...row])
  );
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [solved, setSolved] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const secondsRef = useRef(0);

  const rows = grid.length;
  const cols = grid[0].length;
  const CELL_SIZE = rows <= 5 ? 44 : rows <= 7 ? 38 : 32;

  const handleCellPress = (r: number, c: number) => {
    if (solved) return;
    if (puzzle.grid[r][c] === null) return;
    setSelected([r, c]);
    setShowErrors(false);
  };

  const applyValue = (val: number | null) => {
    if (!selected || solved) return;
    const [r, c] = selected;
    const newGrid = grid.map((row) => [...row]);
    newGrid[r][c] = val ?? 0;
    setGrid(newGrid);

    if (validateCruzex(puzzle, newGrid).isCorrect) {
      setSolved(true);
      setTimeout(() => onComplete(secondsRef.current), 800);
    }
  };

  const handleCheck = () => setShowErrors(true);

  const errors = useMemo(() => {
    if (!showErrors) return new Set<string>();
    return new Set(validateCruzex(puzzle, grid).errors.map((e) => `${e.row},${e.col}`));
  }, [puzzle, grid, showErrors]);

  return (
    <View style={styles.wrapper}>
      <GameHeader
        running={!solved}
        onTick={(s) => { secondsRef.current = s; }}
        title="Crúzex"
        helpTitle={HELP.cruzex.title}
        helpContent={HELP.cruzex.body}
      />

      <ScrollView contentContainerStyle={styles.container}>
        <View>
          {grid.map((row, r) => (
            <View key={r} style={styles.row}>
              {row.map((val, c) => {
                const key = `${r},${c}`;
                const isInput = puzzle.grid[r][c] !== null;
                const isSelected = selected?.[0] === r && selected?.[1] === c;
                const hasError = errors.has(key);

                if (!isInput) {
                  return <View key={c} style={[styles.cell, { width: CELL_SIZE, height: CELL_SIZE }, styles.cellBlack]} />;
                }

                return (
                  <Pressable
                    key={c}
                    onPress={() => handleCellPress(r, c)}
                    style={[
                      styles.cell,
                      { width: CELL_SIZE, height: CELL_SIZE },
                      styles.cellInput,
                      isSelected && styles.cellSelected,
                      hasError && styles.cellError,
                      solved && styles.cellSolved,
                    ]}
                  >
                    <Text style={styles.cellText}>{val && val > 0 ? val : ''}</Text>
                  </Pressable>
                );
              })}
            </View>
          ))}
        </View>

        <View style={styles.numberListBox}>
          <Text style={styles.boxTitle}>Números a colocar (sin repetir dígitos por run)</Text>
          <View style={styles.numberList}>
            {puzzle.numberList.map((n, i) => (
              <View key={i} style={styles.numberChip}>
                <Text style={styles.numberChipText}>{n}</Text>
              </View>
            ))}
          </View>
        </View>

        <Pressable style={styles.checkBtn} onPress={handleCheck}>
          <Text style={styles.checkBtnText}>Comprobar</Text>
        </Pressable>

        {solved && <Text style={styles.solvedText}>✓ ¡Resuelto!</Text>}
      </ScrollView>

      <NumberPad
        onDigit={applyValue}
        onClear={() => applyValue(null)}
        disabled={!selected || solved}
        hideZero
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper:        { flex: 1, justifyContent: 'space-between' },
  container:      { alignItems: 'center', padding: 10, gap: 12 },
  row:            { flexDirection: 'row' },
  cell:           {
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: '#2a2a3e',
  },
  cellBlack:      { backgroundColor: '#0a0a14' },
  cellInput:      { backgroundColor: '#1a1a2e' },
  cellSelected:   { borderColor: '#6c63ff', borderWidth: 2, backgroundColor: '#2a2050' },
  cellError:      { backgroundColor: '#3a1a1a', borderColor: '#ff4444' },
  cellSolved:     { backgroundColor: '#1a3a2a', borderColor: '#44ff88' },
  cellText:       { color: '#fff', fontSize: 18, fontWeight: '600' },

  numberListBox:  {
    backgroundColor: '#1a1a2e', padding: 10, borderRadius: 12,
    borderWidth: 1, borderColor: '#2a2a3e', width: '100%', gap: 6,
  },
  boxTitle:       { color: '#888', fontSize: 11, marginBottom: 4 },
  numberList:     { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  numberChip:     {
    backgroundColor: '#2a2a3e', paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 8, minWidth: 30, alignItems: 'center',
  },
  numberChipText: { color: '#fff', fontSize: 14, fontWeight: '600' },

  checkBtn:       {
    backgroundColor: '#2a2a3e', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10,
  },
  checkBtnText:   { color: '#ccc', fontSize: 14, fontWeight: '600' },
  solvedText:     { color: '#44ff88', fontSize: 20, fontWeight: '700' },
});
