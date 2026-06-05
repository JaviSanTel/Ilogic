import { useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { GameHeader } from '../../components/GameHeader';
import { HELP } from '../../components/helpTexts';
import { NumberPad } from '../../components/NumberPad';
import { generateSudoku } from '../../generators/SudokuGenerator';
import { Difficulty, SudokuPuzzle, SudokuVariant } from '../../types';
import { SudokuState } from './types';
import { validateSudoku } from './validator';

interface Props {
  puzzleId: string;
  onComplete: (elapsedSeconds: number) => void;
}

const VARIANT_TITLES: Record<SudokuVariant, string> = {
  classic: 'Sudoku Clásico',
  x:       'Sudoku X',
  mini:    'Sudoku Mini',
  hyper:   'Sudoku Hyper',
};

export function SudokuBoard({ puzzleId, onComplete }: Props) {
  // puzzleId format: sudoku-{variant}-{difficulty}-{timestamp}
  const parts = puzzleId.split('-');
  const variant = (parts[1] ?? 'classic') as SudokuVariant;
  const difficulty = (parts[2] ?? 'medium') as Difficulty;

  const puzzle: SudokuPuzzle = useMemo(
    () => generateSudoku(variant, difficulty),
    [variant, difficulty]
  );

  const [state, setState] = useState<SudokuState>(() =>
    puzzle.grid.map((row) => [...row])
  );
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [solved, setSolved] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const secondsRef = useRef(0);

  const isFixed = (r: number, c: number) => puzzle.grid[r][c] !== null;
  const isOnDiagonal = (r: number, c: number) =>
    variant === 'x' && (r === c || r + c === puzzle.size - 1);
  const isOnHyperBox = (r: number, c: number) => {
    if (variant !== 'hyper') return false;
    return (
      (r >= 1 && r <= 3 && c >= 1 && c <= 3) ||
      (r >= 1 && r <= 3 && c >= 5 && c <= 7) ||
      (r >= 5 && r <= 7 && c >= 1 && c <= 3) ||
      (r >= 5 && r <= 7 && c >= 5 && c <= 7)
    );
  };

  const handleCellPress = (r: number, c: number) => {
    if (isFixed(r, c) || solved) return;
    setSelected([r, c]);
    setShowErrors(false);
  };

  const applyValue = (val: number | null) => {
    if (!selected || solved) return;
    const [r, c] = selected;
    const newState = state.map((row) => [...row]);
    newState[r][c] = val;
    setState(newState);

    if (validateSudoku(puzzle, newState).isCorrect) {
      setSolved(true);
      setTimeout(() => onComplete(secondsRef.current), 800);
    }
  };

  const handleCheck = () => setShowErrors(true);

  const errors = useMemo(() => {
    if (!showErrors) return new Set<string>();
    return new Set(validateSudoku(puzzle, state).errors.map((e) => `${e.row},${e.col}`));
  }, [puzzle, state, showErrors]);

  // Tamaño de celda según variante
  const CELL_SIZE = puzzle.size === 6 ? 50 : 38;
  const boxRows = puzzle.size === 6 ? 2 : 3;
  const boxCols = puzzle.size === 6 ? 3 : 3;

  const cellsBorder = (r: number, c: number) => {
    const borders: any = {};
    if (r % boxRows === 0 && r !== 0) borders.borderTopWidth = 2;
    if (c % boxCols === 0 && c !== 0) borders.borderLeftWidth = 2;
    return borders;
  };

  return (
    <View style={styles.wrapper}>
      <GameHeader
        running={!solved}
        onTick={(s) => { secondsRef.current = s; }}
        title={VARIANT_TITLES[variant]}
        helpTitle={HELP.sudoku.title}
        helpContent={HELP.sudoku.body}
      />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.gridWrapper}>
          {Array.from({ length: puzzle.size }).map((_, r) => (
            <View key={r} style={styles.row}>
              {Array.from({ length: puzzle.size }).map((__, c) => {
                const key = `${r},${c}`;
                const val = state[r][c];
                const fixed = isFixed(r, c);
                const isSelected = selected?.[0] === r && selected?.[1] === c;
                const hasError = errors.has(key);
                const onDiag = isOnDiagonal(r, c);
                const onHyper = isOnHyperBox(r, c);

                return (
                  <Pressable
                    key={c}
                    onPress={() => handleCellPress(r, c)}
                    style={[
                      styles.cell,
                      { width: CELL_SIZE, height: CELL_SIZE },
                      cellsBorder(r, c),
                      onDiag       && styles.cellDiagonal,
                      onHyper      && styles.cellHyper,
                      fixed        && styles.cellFixed,
                      isSelected   && styles.cellSelected,
                      hasError     && styles.cellError,
                      solved       && styles.cellSolved,
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
  wrapper:      { flex: 1, justifyContent: 'space-between' },
  container:    { alignItems: 'center', padding: 10, gap: 12 },
  gridWrapper:  { borderWidth: 2, borderColor: '#6c63ff' },
  row:          { flexDirection: 'row' },
  cell:         {
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#1a1a2e',
    borderWidth: 0.5, borderColor: '#2a2a3e',
  },
  cellDiagonal: { backgroundColor: '#1d1d2f' },
  cellHyper:    { backgroundColor: '#1e1a2f' },
  cellFixed:    { backgroundColor: '#2a2a3e' },
  cellSelected: { backgroundColor: '#2a2050', borderColor: '#6c63ff', borderWidth: 2 },
  cellError:    { backgroundColor: '#3a1a1a', borderColor: '#ff4444', borderWidth: 1.5 },
  cellSolved:   { backgroundColor: '#1a3a2a', borderColor: '#44ff88' },
  cellText:     { color: '#fff', fontSize: 16, fontWeight: '600' },
  cellTextFixed:{ color: '#aaa' },

  checkBtn:     {
    backgroundColor: '#2a2a3e', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10,
  },
  checkBtnText: { color: '#ccc', fontSize: 14, fontWeight: '600' },
  solvedText:   { color: '#44ff88', fontSize: 20, fontWeight: '700' },
});
