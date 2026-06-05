import { useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { GameHeader } from '../../components/GameHeader';
import { generateLanzarayos } from '../../generators/LanzarayosGenerator';
import { Difficulty, LanzarayosPuzzle } from '../../types';
import { LanzarayosState } from './types';
import { validateLanzarayos } from './validator';

interface Props {
  puzzleId: string;
  onComplete: (elapsedSeconds: number) => void;
}

type Direction = 'up' | 'down' | 'left' | 'right';

const ARROW: Record<Direction, string> = {
  up: '↑', down: '↓', left: '←', right: '→',
};

export function LanzarayosBoard({ puzzleId, onComplete }: Props) {
  const difficulty = (puzzleId.split('-')[1] as Difficulty) ?? 'medium';
  const puzzle: LanzarayosPuzzle = useMemo(() => generateLanzarayos(difficulty), [difficulty]);

  const [state, setState] = useState<LanzarayosState>(() => puzzle.capsules.map(() => undefined));
  const [selected, setSelected] = useState<number | null>(null);
  const [solved, setSolved] = useState(false);
  const secondsRef = useRef(0);

  const CELL_SIZE = puzzle.rows <= 6 ? 38 : puzzle.rows <= 8 ? 32 : 26;

  // Mapa de celdas → "capsule" o "ray-i" o undefined
  const cellMap: Record<string, { kind: 'capsule' | 'ray'; capsuleIdx: number; dir?: Direction }> = {};
  for (let i = 0; i < puzzle.capsules.length; i++) {
    const cap = puzzle.capsules[i];
    cellMap[`${cap.row},${cap.col}`] = { kind: 'capsule', capsuleIdx: i };
  }
  for (let i = 0; i < state.length; i++) {
    const ray = state[i];
    if (!ray) continue;
    const cap = puzzle.capsules[i];
    let [r, c] = [cap.row, cap.col];
    for (let j = 0; j < ray.length; j++) {
      switch (ray.direction) {
        case 'up':    r--; break;
        case 'down':  r++; break;
        case 'left':  c--; break;
        case 'right': c++; break;
      }
      cellMap[`${r},${c}`] = { kind: 'ray', capsuleIdx: i, dir: ray.direction };
    }
  }

  const handleCellPress = (r: number, c: number) => {
    if (solved) return;
    const k = `${r},${c}`;
    const info = cellMap[k];
    if (info?.kind === 'capsule') setSelected(info.capsuleIdx);
  };

  const setRay = (dir: Direction, length: number) => {
    if (selected === null || solved) return;
    const next = [...state];
    next[selected] = { direction: dir, length };
    setState(next);

    if (validateLanzarayos(puzzle, next).isCorrect) {
      setSolved(true);
      setTimeout(() => onComplete(secondsRef.current), 1000);
    }
  };

  const selectedCap = selected !== null ? puzzle.capsules[selected] : null;
  const selectedRay = selected !== null ? state[selected] : undefined;

  return (
    <View style={styles.wrapper}>
      <GameHeader running={!solved} onTick={(s) => { secondsRef.current = s; }} title="Lanzarrayos" />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.hint}>
          Cada cápsula muestra el total de celdas que su rayo debe cubrir (cápsula incluida).
        </Text>

        <View>
          {Array.from({ length: puzzle.rows }).map((_, r) => (
            <View key={r} style={styles.row}>
              {Array.from({ length: puzzle.cols }).map((__, c) => {
                const info = cellMap[`${r},${c}`];
                const isSelected = info?.kind === 'capsule' && info.capsuleIdx === selected;
                return (
                  <Pressable
                    key={c}
                    onPress={() => handleCellPress(r, c)}
                    style={[
                      styles.cell, { width: CELL_SIZE, height: CELL_SIZE },
                      info?.kind === 'capsule' && styles.cellCapsule,
                      info?.kind === 'ray'     && styles.cellRay,
                      isSelected               && styles.cellSelected,
                      solved                   && styles.cellSolved,
                    ]}
                  >
                    {info?.kind === 'capsule' && (
                      <Text style={styles.capsuleText}>
                        {puzzle.capsules[info.capsuleIdx].totalCells}
                      </Text>
                    )}
                    {info?.kind === 'ray' && info.dir && (
                      <Text style={styles.rayArrow}>{ARROW[info.dir]}</Text>
                    )}
                  </Pressable>
                );
              })}
            </View>
          ))}
        </View>

        {selectedCap && !solved && (
          <View style={styles.controls}>
            <Text style={styles.controlsTitle}>
              Cápsula seleccionada · debe cubrir {selectedCap.totalCells} celdas
            </Text>
            <View style={styles.dirRow}>
              {(['up', 'down', 'left', 'right'] as Direction[]).map((dir) => {
                const isActive = selectedRay?.direction === dir;
                return (
                  <Pressable
                    key={dir}
                    style={[styles.dirBtn, isActive && styles.dirBtnActive]}
                    onPress={() => setRay(dir, selectedRay?.length ?? 1)}
                  >
                    <Text style={styles.dirArrow}>{ARROW[dir]}</Text>
                  </Pressable>
                );
              })}
            </View>
            <Text style={styles.controlsLabel}>Longitud del rayo:</Text>
            <View style={styles.lenRow}>
              {[1, 2, 3, 4].map((len) => {
                const isActive = selectedRay?.length === len;
                return (
                  <Pressable
                    key={len}
                    style={[styles.lenBtn, isActive && styles.lenBtnActive]}
                    onPress={() => selectedRay
                      ? setRay(selectedRay.direction, len)
                      : setRay('right', len)
                    }
                  >
                    <Text style={styles.lenText}>{len}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}

        {solved && <Text style={styles.solvedText}>✓ ¡Resuelto!</Text>}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper:    { flex: 1 },
  container:  { padding: 10, gap: 12, alignItems: 'center' },
  hint:       { color: '#888', fontSize: 11, textAlign: 'center', paddingHorizontal: 12 },
  row:        { flexDirection: 'row' },
  cell:       {
    backgroundColor: '#1a1a2e', borderWidth: 1, borderColor: '#2a2a3e',
    alignItems: 'center', justifyContent: 'center',
  },
  cellCapsule:{ backgroundColor: '#6c63ff' },
  cellRay:    { backgroundColor: '#2a2050' },
  cellSelected:{ borderColor: '#fff', borderWidth: 2 },
  cellSolved: { borderColor: '#44ff88' },
  capsuleText:{ color: '#fff', fontSize: 14, fontWeight: '800' },
  rayArrow:   { color: '#ccc', fontSize: 16, fontWeight: '700' },

  controls:   {
    backgroundColor: '#1a1a2e', padding: 12, borderRadius: 12,
    borderWidth: 2, borderColor: '#6c63ff', width: '100%', gap: 10,
  },
  controlsTitle: { color: '#fff', fontSize: 12, textAlign: 'center', fontWeight: '600' },
  controlsLabel: { color: '#888', fontSize: 11, marginTop: 4 },
  dirRow:        { flexDirection: 'row', gap: 8, justifyContent: 'center' },
  dirBtn:        {
    width: 50, height: 50, borderRadius: 10, backgroundColor: '#2a2a3e',
    alignItems: 'center', justifyContent: 'center',
  },
  dirBtnActive:  { backgroundColor: '#6c63ff' },
  dirArrow:      { color: '#fff', fontSize: 22, fontWeight: '800' },
  lenRow:        { flexDirection: 'row', gap: 8, justifyContent: 'center' },
  lenBtn:        {
    width: 50, height: 40, borderRadius: 10, backgroundColor: '#2a2a3e',
    alignItems: 'center', justifyContent: 'center',
  },
  lenBtnActive:  { backgroundColor: '#6c63ff' },
  lenText:       { color: '#fff', fontSize: 16, fontWeight: '700' },

  solvedText:    { color: '#44ff88', fontSize: 20, fontWeight: '700' },
});
