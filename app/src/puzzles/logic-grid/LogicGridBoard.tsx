import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { generateLogicGrid } from '../../generators/LogicGridGenerator';
import { Difficulty, LogicGridPuzzle } from '../../types';
import { GridState, pairKey } from './types';
import { validateLogicGrid } from './validator';

interface Props {
  puzzleId: string;
  onComplete: () => void;
}

const CELL_SIZE = 34;

export function LogicGridBoard({ puzzleId, onComplete }: Props) {
  const difficulty = (puzzleId.split('-')[2] as Difficulty) ?? 'medium';
  const [puzzle] = useState<LogicGridPuzzle>(() => generateLogicGrid(difficulty));
  const [state, setState] = useState<GridState>({});
  const [solved, setSolved] = useState(false);

  const cycleMark = (a: string, b: string) => {
    if (solved) return;
    const key = pairKey(a, b);
    const cur = state[key];
    const next: '✓' | '✗' | undefined =
      cur === undefined ? '✓' : cur === '✓' ? '✗' : undefined;
    const updated = { ...state, [key]: next };
    setState(updated);

    if (validateLogicGrid(puzzle, updated).isCorrect) {
      setSolved(true);
      setTimeout(onComplete, 1000);
    }
  };

  // Build the subgrids: one cross-table per pair of categories
  const subGrids: { rowCat: string; colCat: string }[] = [];
  for (let i = 0; i < puzzle.categories.length; i++) {
    for (let j = i + 1; j < puzzle.categories.length; j++) {
      subGrids.push({ rowCat: puzzle.categories[i], colCat: puzzle.categories[j] });
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* ── Pistas ─────────────────────────────────────────────────────── */}
      <View style={styles.cluesBox}>
        <Text style={styles.cluesTitle}>📋 Pistas</Text>
        {puzzle.clues.map((clue, i) => (
          <Text
            key={i}
            style={[
              styles.clueText,
              clue.type === 'negative' && styles.clueNegative,
            ]}
          >
            • {clue.text}
          </Text>
        ))}
      </View>

      {/* ── Tablas de cruces ───────────────────────────────────────────── */}
      {subGrids.map((grid, idx) => (
        <View key={idx} style={styles.subgrid}>
          <Text style={styles.subgridLabel}>
            {grid.rowCat} × {grid.colCat}
          </Text>

          {/* Cabecera de columnas */}
          <View style={styles.row}>
            <View style={[styles.cell, styles.cellHeader, { width: CELL_SIZE * 1.5 }]} />
            {puzzle.items[grid.colCat].map((col) => (
              <View key={col} style={[styles.cell, styles.cellHeader]}>
                <Text style={styles.cellHeaderText} numberOfLines={2}>
                  {col.substring(0, 4)}
                </Text>
              </View>
            ))}
          </View>

          {/* Filas */}
          {puzzle.items[grid.rowCat].map((row) => (
            <View key={row} style={styles.row}>
              <View style={[styles.cell, styles.cellHeader, { width: CELL_SIZE * 1.5 }]}>
                <Text style={styles.cellHeaderText} numberOfLines={1}>
                  {row.substring(0, 6)}
                </Text>
              </View>
              {puzzle.items[grid.colCat].map((col) => {
                const key = pairKey(row, col);
                const mark = state[key];
                return (
                  <Pressable
                    key={col}
                    onPress={() => cycleMark(row, col)}
                    style={[
                      styles.cell,
                      mark === '✓' && styles.cellYes,
                      mark === '✗' && styles.cellNo,
                      solved && styles.cellSolved,
                    ]}
                  >
                    <Text style={styles.cellMark}>{mark ?? ''}</Text>
                  </Pressable>
                );
              })}
            </View>
          ))}
        </View>
      ))}

      {solved && <Text style={styles.solvedText}>✓ ¡Resuelto!</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:        { alignItems: 'center', padding: 12, gap: 16 },
  cluesBox:         {
    backgroundColor: '#1a1a2e', padding: 14, borderRadius: 12,
    borderWidth: 1, borderColor: '#2a2a3e', width: '100%', gap: 6,
  },
  cluesTitle:       { color: '#fff', fontSize: 14, fontWeight: '700', marginBottom: 4 },
  clueText:         { color: '#ccc', fontSize: 12 },
  clueNegative:     { color: '#ff9999' },
  subgrid:          { gap: 2, alignItems: 'center' },
  subgridLabel:     { color: '#888', fontSize: 11, marginBottom: 4 },
  row:              { flexDirection: 'row', gap: 2 },
  cell:             {
    width: CELL_SIZE, height: CELL_SIZE,
    backgroundColor: '#1a1a2e', borderRadius: 4,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: '#2a2a3e',
  },
  cellHeader:       { backgroundColor: '#2a2a3e' },
  cellHeaderText:   { color: '#aaa', fontSize: 9, fontWeight: '600', textAlign: 'center' },
  cellMark:         { color: '#fff', fontSize: 16, fontWeight: '700' },
  cellYes:          { backgroundColor: '#1a4a2a', borderColor: '#44ff88' },
  cellNo:           { backgroundColor: '#4a1a1a', borderColor: '#ff4444' },
  cellSolved:       { borderColor: '#44ff88' },
  solvedText:       { color: '#44ff88', fontSize: 20, fontWeight: '700', marginTop: 12 },
});
