import { useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { GameHeader } from '../../components/GameHeader';
import { NumberPad } from '../../components/NumberPad';
import { generateKakuro } from '../../generators/KakuroGenerator';
import { Difficulty, KakuroCell, KakuroPuzzle } from '../../types';
import { validateKakuro } from './validator';

interface Props {
  puzzleId: string;
  onComplete: (elapsedSeconds: number) => void;
}

const CELL_SIZE = 44;

export function KakuroBoard({ puzzleId, onComplete }: Props) {
  const difficulty = (puzzleId.split('-')[1] as Difficulty) ?? 'medium';

  const initial = useMemo(() => generateKakuro(difficulty), [difficulty]);
  const [puzzle, setPuzzle] = useState<KakuroPuzzle>(initial);
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [solved, setSolved] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const secondsRef = useRef(0);

  const handleCellPress = (r: number, c: number) => {
    if (solved) return;
    const cell = puzzle.grid[r][c];
    if (cell.kind !== 'input') return;
    setSelected([r, c]);
    setShowErrors(false);
  };

  const applyDigit = (val: number | null) => {
    if (!selected || solved) return;
    const [r, c] = selected;
    const newGrid = puzzle.grid.map((row) => row.map((cell) => ({ ...cell })));
    const cell = newGrid[r][c] as Extract<KakuroCell, { kind: 'input' }>;
    cell.value = val;
    const newPuzzle = { ...puzzle, grid: newGrid };
    setPuzzle(newPuzzle);

    const result = validateKakuro(newPuzzle);
    if (result.isCorrect) {
      setSolved(true);
      setTimeout(() => onComplete(secondsRef.current), 800);
    }
  };

  const handleDigit = (d: number) => {
    if (d === 0) return;
    applyDigit(d);
  };

  const handleCheck = () => setShowErrors(true);

  const errors = useMemo(() => {
    if (!showErrors) return new Set<string>();
    return new Set(validateKakuro(puzzle).errors.map((e) => `${e.row},${e.col}`));
  }, [puzzle, showErrors]);

  return (
    <View style={styles.container}>
      <GameHeader running={!solved} onTick={(s) => { secondsRef.current = s; }} title="Kakuro" />

      <ScrollView contentContainerStyle={styles.boardArea}>
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
                      <View style={styles.clueDiagonal} />
                      {/* triángulo abajo-izquierda = sumDown */}
                      {cell.sumDown !== undefined && (
                        <Text style={[styles.clueText, styles.clueDown]}>{cell.sumDown}</Text>
                      )}
                      {/* triángulo arriba-derecha = sumRight */}
                      {cell.sumRight !== undefined && (
                        <Text style={[styles.clueText, styles.clueRight]}>{cell.sumRight}</Text>
                      )}
                    </View>
                  );
                }
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

        <View style={styles.actions}>
          <Pressable style={styles.checkBtn} onPress={handleCheck}>
            <Text style={styles.checkBtnText}>Comprobar</Text>
          </Pressable>
        </View>

        {solved && <Text style={styles.solvedText}>✓ ¡Resuelto!</Text>}
      </ScrollView>

      <NumberPad
        onDigit={handleDigit}
        onClear={() => applyDigit(null)}
        disabled={!selected || solved}
        hideZero
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:      { flex: 1, justifyContent: 'space-between' },
  boardArea:      { alignItems: 'center', padding: 12 },
  row:            { flexDirection: 'row' },
  cell:           {
    width: CELL_SIZE, height: CELL_SIZE,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: '#2a2a3e',
  },
  cellBlack:      { backgroundColor: '#0a0a14' },
  cellClue:       { backgroundColor: '#2a2a3e', position: 'relative', overflow: 'hidden' },
  /** Diagonal de arriba-izquierda a abajo-derecha (\) — separa los dos triángulos */
  clueDiagonal:   {
    position: 'absolute',
    width: CELL_SIZE * 1.42,
    height: 1.5,
    backgroundColor: '#4a4a6e',
    left: -CELL_SIZE * 0.21,
    top: CELL_SIZE / 2 - 0.75,
    transform: [{ rotate: '45deg' }],
  },
  clueText:       { color: '#bbb', fontSize: 11, fontWeight: '700', position: 'absolute' },
  /** sumDown: centrado en el triángulo INFERIOR-IZQUIERDA */
  clueDown:       { left: 4, bottom: 2 },
  /** sumRight: centrado en el triángulo SUPERIOR-DERECHA */
  clueRight:      { right: 4, top: 2 },
  cellInput:      { backgroundColor: '#1a1a2e' },
  cellSelected:   { borderColor: '#6c63ff', borderWidth: 2, backgroundColor: '#2a2050' },
  cellError:      { backgroundColor: '#3a1a1a', borderColor: '#ff4444' },
  cellSolved:     { backgroundColor: '#1a3a2a', borderColor: '#44ff88' },
  inputText:      { color: '#fff', fontSize: 20, fontWeight: '600' },
  actions:        { marginTop: 16, flexDirection: 'row', gap: 8 },
  checkBtn:       {
    backgroundColor: '#2a2a3e', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10,
  },
  checkBtnText:   { color: '#ccc', fontSize: 14, fontWeight: '600' },
  solvedText:     { color: '#44ff88', fontSize: 20, fontWeight: '700', marginTop: 12 },
});
