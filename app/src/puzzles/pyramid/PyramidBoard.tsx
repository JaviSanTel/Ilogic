import { useCallback, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GameHeader } from '../../components/GameHeader';
import { HELP } from '../../components/helpTexts';
import { NumberPad } from '../../components/NumberPad';
import { generatePyramid } from '../../generators/PyramidGenerator';
import { Difficulty, PyramidPuzzle } from '../../types';
import { validatePyramid } from './validator';

interface Props {
  puzzleId: string;
  onComplete: (elapsedSeconds: number) => void;
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
  const secondsRef = useRef(0);

  const isFixed = useCallback(
    (r: number, c: number) => puzzle.cells[r][c] !== null,
    [puzzle]
  );

  const handleCellPress = (r: number, c: number) => {
    if (isFixed(r, c) || solved) return;
    setSelected([r, c]);
  };

  const applyValue = (r: number, c: number, val: number | null) => {
    const updated = current.map((row) => [...row]);
    updated[r][c] = val;
    setCurrent(updated);

    const result = validatePyramid(puzzle, updated);
    setErrors(new Set(result.errors.map(({ row, col }) => `${row},${col}`)));

    if (result.isCorrect) {
      setSolved(true);
      setTimeout(() => onComplete(secondsRef.current), 800);
    }
  };

  const handleDigit = (d: number) => {
    if (!selected || solved) return;
    const [r, c] = selected;
    const cur = current[r][c];
    const newVal =
      cur === null
        ? d
        : Number(String(cur) + d) > 999
        ? cur
        : Number(String(cur) + d);
    applyValue(r, c, newVal);
  };

  const handleClear = () => {
    if (!selected || solved) return;
    applyValue(selected[0], selected[1], null);
  };

  const handleBackspace = () => {
    if (!selected || solved) return;
    const [r, c] = selected;
    const cur = current[r][c];
    if (cur === null) return;
    const str = String(cur).slice(0, -1);
    applyValue(r, c, str.length === 0 ? null : Number(str));
  };

  const CELL_SIZE = puzzle.levels <= 4 ? 56 : puzzle.levels <= 5 ? 48 : 42;

  return (
    <View style={styles.container}>
      <GameHeader
        running={!solved}
        onTick={(s) => { secondsRef.current = s; }}
        title="Pirámide"
        helpTitle={HELP.pyramid.title}
        helpContent={HELP.pyramid.body}
      />

      <View style={styles.boardArea}>
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

        {solved && <Text style={styles.solvedText}>✓ ¡Completado!</Text>}

        {!solved && (
          <Text style={styles.hint}>
            {selected ? 'Pulsa un número para rellenar' : 'Toca una celda para editar'}
          </Text>
        )}
      </View>

      <NumberPad
        onDigit={handleDigit}
        onClear={handleClear}
        onBackspace={handleBackspace}
        disabled={!selected || solved}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:     { flex: 1, justifyContent: 'space-between' },
  boardArea:     { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16, gap: 16 },
  pyramid:       { alignItems: 'center', gap: 6 },
  row:           { flexDirection: 'row', gap: 6 },
  cell:          {
    borderRadius: 10, borderWidth: 2, borderColor: '#2a2a3e',
    backgroundColor: '#1a1a2e', alignItems: 'center', justifyContent: 'center',
  },
  cellFixed:     { backgroundColor: '#2a2a3e', borderColor: '#3a3a5e' },
  cellSelected:  { borderColor: '#6c63ff', backgroundColor: '#2a2050' },
  cellError:     { borderColor: '#ff4444', backgroundColor: '#3a1a1a' },
  cellSolved:    { borderColor: '#44ff88', backgroundColor: '#1a3a2a' },
  cellText:      { color: '#aaa', fontSize: 18, fontWeight: '600' },
  cellTextFixed: { color: '#fff' },
  hint:          { color: '#666', fontSize: 12, fontStyle: 'italic' },
  solvedText:    { color: '#44ff88', fontSize: 22, fontWeight: '700' },
});
