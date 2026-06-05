import { useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { GameHeader } from '../../components/GameHeader';
import { HELP } from '../../components/helpTexts';
import { generateLogicGrid } from '../../generators/LogicGridGenerator';
import { Difficulty, LogicGridPuzzle } from '../../types';
import { GridState, pairKey, SummaryState } from './types';
import { isSummaryConsistent, validateSummary } from './validator';

interface Props {
  puzzleId: string;
  onComplete: (elapsedSeconds: number) => void;
}

const CELL_SIZE = 34;

export function LogicGridBoard({ puzzleId, onComplete }: Props) {
  const difficulty = (puzzleId.split('-')[2] as Difficulty) ?? 'medium';
  const [puzzle] = useState<LogicGridPuzzle>(() => generateLogicGrid(difficulty));

  // ── State ─────────────────────────────────────────────────────────────────
  const [summary, setSummary] = useState<SummaryState>({});
  const [grid, setGrid] = useState<GridState>({});
  const [solved, setSolved] = useState(false);
  /** Celda del summary en edición: [anchorItem, categoryName] */
  const [editing, setEditing] = useState<[string, string] | null>(null);
  const secondsRef = useRef(0);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const anchorCat = puzzle.categories[0];
  const anchorItems = puzzle.items[anchorCat];
  const otherCats = puzzle.categories.slice(1);

  const handleSummarySelect = (anchor: string, cat: string, value: string | undefined) => {
    if (solved) return;
    const updated = { ...summary, [`${anchor}.${cat}`]: value };
    setSummary(updated);
    setEditing(null);

    if (validateSummary(puzzle, updated).isCorrect) {
      setSolved(true);
      setTimeout(() => onComplete(secondsRef.current), 1000);
    }
  };

  const cycleGridMark = (a: string, b: string) => {
    if (solved) return;
    const key = pairKey(a, b);
    const cur = grid[key];
    const next: '✓' | '✗' | undefined =
      cur === undefined ? '✓' : cur === '✓' ? '✗' : undefined;
    setGrid({ ...grid, [key]: next });
  };

  // ── Tablas de cruces (scratch) ────────────────────────────────────────────
  const subGrids: { rowCat: string; colCat: string }[] = [];
  for (let i = 0; i < puzzle.categories.length; i++) {
    for (let j = i + 1; j < puzzle.categories.length; j++) {
      subGrids.push({ rowCat: puzzle.categories[i], colCat: puzzle.categories[j] });
    }
  }

  const consistent = isSummaryConsistent(puzzle, summary);

  return (
    <View style={styles.wrapper}>
      <GameHeader
        running={!solved}
        onTick={(s) => { secondsRef.current = s; }}
        title="Quién es Quién"
        helpTitle={HELP['logic-grid'].title}
        helpContent={HELP['logic-grid'].body}
      />
    <ScrollView contentContainerStyle={styles.container}>
      {/* ── Pistas ───────────────────────────────────────────────────────── */}
      <View style={styles.cluesBox}>
        <Text style={styles.boxTitle}>📋 Pistas</Text>
        {puzzle.clues.map((clue, i) => (
          <Text
            key={i}
            style={[styles.clueText, clue.type === 'negative' && styles.clueNegative]}
          >
            • {clue.text}
          </Text>
        ))}
      </View>

      {/* ── Tabla resumen (la que valida) ────────────────────────────────── */}
      <View style={styles.summaryBox}>
        <Text style={styles.boxTitle}>✏️ Tu respuesta</Text>
        {!consistent && (
          <Text style={styles.inconsistent}>⚠️ Hay valores repetidos en alguna columna</Text>
        )}

        {/* Cabecera */}
        <View style={styles.summaryRow}>
          <View style={[styles.summaryCell, styles.summaryCellHeader, styles.summaryCellAnchor]}>
            <Text style={styles.summaryHeaderText}>{anchorCat}</Text>
          </View>
          {otherCats.map((cat) => (
            <View key={cat} style={[styles.summaryCell, styles.summaryCellHeader]}>
              <Text style={styles.summaryHeaderText} numberOfLines={1}>{cat}</Text>
            </View>
          ))}
        </View>

        {/* Filas (un anchor por fila) */}
        {anchorItems.map((anchor) => (
          <View key={anchor} style={styles.summaryRow}>
            <View style={[styles.summaryCell, styles.summaryCellAnchor]}>
              <Text style={styles.summaryAnchorText} numberOfLines={1}>{anchor}</Text>
            </View>
            {otherCats.map((cat) => {
              const value = summary[`${anchor}.${cat}`];
              const isEditing = editing?.[0] === anchor && editing?.[1] === cat;
              return (
                <Pressable
                  key={cat}
                  onPress={() => setEditing(isEditing ? null : [anchor, cat])}
                  style={[
                    styles.summaryCell,
                    styles.summaryCellValue,
                    isEditing && styles.summaryCellSelected,
                    value      && styles.summaryCellFilled,
                    solved     && styles.summaryCellSolved,
                  ]}
                >
                  <Text style={styles.summaryValueText} numberOfLines={1}>
                    {value ?? '?'}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ))}

        {/* Picker inline: aparece cuando hay celda en edición */}
        {editing && !solved && (
          <View style={styles.picker}>
            <Text style={styles.pickerTitle}>
              {editing[0]} → {editing[1]}:
            </Text>
            <View style={styles.pickerOptions}>
              {puzzle.items[editing[1]].map((item) => {
                const isCurrent = summary[`${editing[0]}.${editing[1]}`] === item;
                return (
                  <Pressable
                    key={item}
                    onPress={() => handleSummarySelect(editing[0], editing[1], isCurrent ? undefined : item)}
                    style={[styles.pickerOpt, isCurrent && styles.pickerOptActive]}
                  >
                    <Text style={[styles.pickerOptText, isCurrent && styles.pickerOptTextActive]}>
                      {item}
                    </Text>
                  </Pressable>
                );
              })}
              <Pressable
                onPress={() => handleSummarySelect(editing[0], editing[1], undefined)}
                style={[styles.pickerOpt, styles.pickerOptClear]}
              >
                <Text style={styles.pickerOptText}>Borrar</Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>

      {/* ── Tablas de cruces (scratch work) ──────────────────────────────── */}
      <Text style={styles.scratchLabel}>🔍 Tablas auxiliares (para deducir)</Text>
      {subGrids.map((sg, idx) => (
        <View key={idx} style={styles.subgrid}>
          <Text style={styles.subgridLabel}>{sg.rowCat} × {sg.colCat}</Text>
          <View style={styles.row}>
            <View style={[styles.cell, styles.cellHeader, { width: CELL_SIZE * 1.5 }]} />
            {puzzle.items[sg.colCat].map((col) => (
              <View key={col} style={[styles.cell, styles.cellHeader]}>
                <Text style={styles.cellHeaderText} numberOfLines={2}>{col.substring(0, 4)}</Text>
              </View>
            ))}
          </View>
          {puzzle.items[sg.rowCat].map((row) => (
            <View key={row} style={styles.row}>
              <View style={[styles.cell, styles.cellHeader, { width: CELL_SIZE * 1.5 }]}>
                <Text style={styles.cellHeaderText} numberOfLines={1}>{row.substring(0, 6)}</Text>
              </View>
              {puzzle.items[sg.colCat].map((col) => {
                const key = pairKey(row, col);
                const mark = grid[key];
                return (
                  <Pressable
                    key={col}
                    onPress={() => cycleGridMark(row, col)}
                    style={[
                      styles.cell,
                      mark === '✓' && styles.cellYes,
                      mark === '✗' && styles.cellNo,
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
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper:       { flex: 1 },
  container:     { alignItems: 'center', padding: 12, gap: 14 },

  // Boxes
  cluesBox:      {
    backgroundColor: '#1a1a2e', padding: 14, borderRadius: 12,
    borderWidth: 1, borderColor: '#2a2a3e', width: '100%', gap: 6,
  },
  summaryBox:    {
    backgroundColor: '#1a1a2e', padding: 14, borderRadius: 12,
    borderWidth: 2, borderColor: '#6c63ff', width: '100%', gap: 8,
  },
  boxTitle:      { color: '#fff', fontSize: 14, fontWeight: '700', marginBottom: 4 },
  clueText:      { color: '#ccc', fontSize: 12 },
  clueNegative:  { color: '#ff9999' },
  inconsistent:  { color: '#ff9944', fontSize: 11, marginBottom: 4 },

  // Summary table
  summaryRow:    { flexDirection: 'row', gap: 4 },
  summaryCell:   {
    flex: 1, paddingVertical: 8, paddingHorizontal: 4, borderRadius: 6,
    alignItems: 'center', justifyContent: 'center', minHeight: 36,
    backgroundColor: '#0f0f1a',
  },
  summaryCellHeader:   { backgroundColor: '#2a2a3e' },
  summaryCellAnchor:   { backgroundColor: '#2a2a3e' },
  summaryCellValue:    { borderWidth: 1, borderColor: '#2a2a3e' },
  summaryCellSelected: { borderColor: '#6c63ff', borderWidth: 2, backgroundColor: '#2a2050' },
  summaryCellFilled:   { backgroundColor: '#1a3a4e' },
  summaryCellSolved:   { backgroundColor: '#1a3a2a', borderColor: '#44ff88' },
  summaryHeaderText:   { color: '#aaa', fontSize: 11, fontWeight: '700' },
  summaryAnchorText:   { color: '#fff', fontSize: 12, fontWeight: '600' },
  summaryValueText:    { color: '#fff', fontSize: 12, fontWeight: '500' },

  // Inline picker
  picker:        {
    marginTop: 8, padding: 10, backgroundColor: '#0f0f1a',
    borderRadius: 8, gap: 8,
  },
  pickerTitle:   { color: '#888', fontSize: 12 },
  pickerOptions: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  pickerOpt:     {
    paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8,
    backgroundColor: '#2a2a3e', borderWidth: 1, borderColor: '#2a2a3e',
  },
  pickerOptActive: { backgroundColor: '#6c63ff', borderColor: '#6c63ff' },
  pickerOptClear:  { backgroundColor: '#3a1a1a', borderColor: '#5a2a2a' },
  pickerOptText:   { color: '#fff', fontSize: 13, fontWeight: '600' },
  pickerOptTextActive: { color: '#fff' },

  // Scratch tables
  scratchLabel:  { color: '#666', fontSize: 11, marginTop: 4 },
  subgrid:       { gap: 2, alignItems: 'center' },
  subgridLabel:  { color: '#888', fontSize: 11, marginBottom: 4 },
  row:           { flexDirection: 'row', gap: 2 },
  cell:          {
    width: CELL_SIZE, height: CELL_SIZE,
    backgroundColor: '#1a1a2e', borderRadius: 4,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: '#2a2a3e',
  },
  cellHeader:    { backgroundColor: '#2a2a3e' },
  cellHeaderText:{ color: '#aaa', fontSize: 9, fontWeight: '600', textAlign: 'center' },
  cellMark:      { color: '#fff', fontSize: 16, fontWeight: '700' },
  cellYes:       { backgroundColor: '#1a4a2a', borderColor: '#44ff88' },
  cellNo:        { backgroundColor: '#4a1a1a', borderColor: '#ff4444' },

  solvedText:    { color: '#44ff88', fontSize: 20, fontWeight: '700', marginTop: 12 },
});
