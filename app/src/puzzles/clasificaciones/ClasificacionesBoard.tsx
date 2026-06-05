import { useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { GameHeader } from '../../components/GameHeader';
import { HELP } from '../../components/helpTexts';
import {
  generateClasificaciones, matchKey,
} from '../../generators/ClasificacionesGenerator';
import { ClasificacionesPuzzle, Difficulty } from '../../types';
import { ClasificacionesState } from './types';
import { validateClasificaciones } from './validator';

interface Props {
  puzzleId: string;
  onComplete: (elapsedSeconds: number) => void;
}

export function ClasificacionesBoard({ puzzleId, onComplete }: Props) {
  const difficulty = (puzzleId.split('-')[1] as Difficulty) ?? 'medium';
  const puzzle: ClasificacionesPuzzle = useMemo(
    () => generateClasificaciones(difficulty), [difficulty]
  );
  const [state, setState] = useState<ClasificacionesState>({});
  const [solved, setSolved] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [draftH, setDraftH] = useState('');
  const [draftA, setDraftA] = useState('');
  const secondsRef = useRef(0);

  // All matches as pairs
  const matches: { home: string; away: string; key: string }[] = [];
  for (let i = 0; i < puzzle.teams.length; i++) {
    for (let j = i + 1; j < puzzle.teams.length; j++) {
      matches.push({
        home: puzzle.teams[i],
        away: puzzle.teams[j],
        key:  matchKey(puzzle.teams[i], puzzle.teams[j]),
      });
    }
  }

  const startEdit = (key: string) => {
    if (solved) return;
    const cur = state[key];
    setEditing(key);
    if (cur) {
      const [h, a] = cur.split('-');
      setDraftH(h);
      setDraftA(a);
    } else {
      setDraftH('');
      setDraftA('');
    }
  };

  const setDigit = (which: 'h' | 'a', d: number) => {
    if (which === 'h') setDraftH(String(d));
    else               setDraftA(String(d));
  };

  const saveEdit = () => {
    if (!editing) return;
    if (draftH === '' || draftA === '') return;
    const value = `${draftH}-${draftA}`;
    const next = { ...state, [editing]: value };
    setState(next);
    setEditing(null);

    if (validateClasificaciones(puzzle, next).isCorrect) {
      setSolved(true);
      setTimeout(() => onComplete(secondsRef.current), 1000);
    }
  };

  const clearEdit = () => {
    if (!editing) return;
    const next = { ...state };
    delete next[editing];
    setState(next);
    setEditing(null);
  };

  return (
    <View style={styles.wrapper}>
      <GameHeader
        running={!solved}
        onTick={(s) => { secondsRef.current = s; }}
        title="Clasificaciones"
        helpTitle={HELP.clasificaciones.title}
        helpContent={HELP.clasificaciones.body}
      />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Tabla de clasificación */}
        <View style={styles.tableBox}>
          <Text style={styles.boxTitle}>🏆 Clasificación</Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.cellTeam, styles.headerText]}>Equipo</Text>
            {['G', 'E', 'P', 'F', 'C', 'Pts'].map((h) => (
              <Text key={h} style={[styles.cellStat, styles.headerText]}>{h}</Text>
            ))}
          </View>
          {puzzle.table.map((row) => (
            <View key={row.team} style={styles.tableRow}>
              <Text style={styles.cellTeam} numberOfLines={1}>{row.team}</Text>
              <Text style={styles.cellStat}>{row.G}</Text>
              <Text style={styles.cellStat}>{row.E}</Text>
              <Text style={styles.cellStat}>{row.P}</Text>
              <Text style={styles.cellStat}>{row.F}</Text>
              <Text style={styles.cellStat}>{row.C}</Text>
              <Text style={[styles.cellStat, styles.cellPts]}>{row.Pts}</Text>
            </View>
          ))}
        </View>

        {/* Partidos a deducir */}
        <View style={styles.matchesBox}>
          <Text style={styles.boxTitle}>⚽ Resultados</Text>
          {matches.map((m) => {
            const value = state[m.key];
            const isEditing = editing === m.key;
            return (
              <Pressable
                key={m.key}
                onPress={() => startEdit(m.key)}
                style={[
                  styles.matchRow,
                  isEditing && styles.matchEditing,
                  value && styles.matchFilled,
                  solved && styles.matchSolved,
                ]}
              >
                <Text style={styles.matchTeam} numberOfLines={1}>{m.home}</Text>
                <Text style={styles.matchScore}>{value ?? '?-?'}</Text>
                <Text style={styles.matchTeam} numberOfLines={1}>{m.away}</Text>
              </Pressable>
            );
          })}
        </View>

        {editing && !solved && (
          <View style={styles.editor}>
            <Text style={styles.editorTitle}>{editing}</Text>
            <View style={styles.editorRow}>
              <View style={styles.editorSide}>
                <Text style={styles.editorLabel}>Local</Text>
                <View style={styles.digitsRow}>
                  {[0, 1, 2, 3, 4, 5].map((d) => (
                    <Pressable
                      key={d}
                      style={[styles.digit, draftH === String(d) && styles.digitActive]}
                      onPress={() => setDigit('h', d)}
                    >
                      <Text style={styles.digitText}>{d}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
              <View style={styles.editorSide}>
                <Text style={styles.editorLabel}>Visitante</Text>
                <View style={styles.digitsRow}>
                  {[0, 1, 2, 3, 4, 5].map((d) => (
                    <Pressable
                      key={d}
                      style={[styles.digit, draftA === String(d) && styles.digitActive]}
                      onPress={() => setDigit('a', d)}
                    >
                      <Text style={styles.digitText}>{d}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            </View>
            <View style={styles.editorActions}>
              <Pressable style={[styles.actionBtn, styles.btnPrimary]} onPress={saveEdit}>
                <Text style={styles.actionText}>Guardar</Text>
              </Pressable>
              <Pressable style={[styles.actionBtn, styles.btnSecondary]} onPress={clearEdit}>
                <Text style={styles.actionText}>Borrar</Text>
              </Pressable>
              <Pressable style={[styles.actionBtn, styles.btnGhost]} onPress={() => setEditing(null)}>
                <Text style={styles.actionTextGhost}>Cancelar</Text>
              </Pressable>
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
  container:  { padding: 12, gap: 12 },

  tableBox:    { backgroundColor: '#1a1a2e', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#2a2a3e' },
  matchesBox:  { backgroundColor: '#1a1a2e', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#2a2a3e', gap: 6 },
  boxTitle:    { color: '#fff', fontSize: 14, fontWeight: '700', marginBottom: 8 },

  tableHeader: { flexDirection: 'row', paddingBottom: 6, borderBottomWidth: 1, borderBottomColor: '#2a2a3e' },
  tableRow:    { flexDirection: 'row', paddingVertical: 5 },
  cellTeam:    { color: '#fff', flex: 2, fontSize: 12 },
  cellStat:    { color: '#ccc', flex: 1, fontSize: 12, textAlign: 'center' },
  cellPts:     { color: '#6c63ff', fontWeight: '700' },
  headerText:  { color: '#888', fontSize: 11, fontWeight: '700' },

  matchRow:    {
    flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 8,
    paddingHorizontal: 10, borderRadius: 8, backgroundColor: '#0f0f1a',
    borderWidth: 1, borderColor: '#2a2a3e',
  },
  matchEditing: { borderColor: '#6c63ff', backgroundColor: '#2a2050' },
  matchFilled:  { backgroundColor: '#1a3a4e' },
  matchSolved:  { borderColor: '#44ff88' },
  matchTeam:    { color: '#fff', flex: 2, fontSize: 12, fontWeight: '500' },
  matchScore:   { color: '#fff', minWidth: 50, textAlign: 'center', fontSize: 16, fontWeight: '700' },

  editor:       { backgroundColor: '#1a1a2e', padding: 14, borderRadius: 12, borderWidth: 2, borderColor: '#6c63ff', gap: 12 },
  editorTitle:  { color: '#fff', fontSize: 13, fontWeight: '700', textAlign: 'center' },
  editorRow:    { flexDirection: 'row', gap: 12 },
  editorSide:   { flex: 1, gap: 6, alignItems: 'center' },
  editorLabel:  { color: '#888', fontSize: 11 },
  digitsRow:    { flexDirection: 'row', flexWrap: 'wrap', gap: 4, justifyContent: 'center' },
  digit:        {
    width: 32, height: 32, borderRadius: 8, backgroundColor: '#2a2a3e',
    alignItems: 'center', justifyContent: 'center',
  },
  digitActive:  { backgroundColor: '#6c63ff' },
  digitText:    { color: '#fff', fontSize: 14, fontWeight: '700' },
  editorActions:{ flexDirection: 'row', gap: 8, justifyContent: 'center' },
  actionBtn:    { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
  btnPrimary:   { backgroundColor: '#6c63ff' },
  btnSecondary: { backgroundColor: '#3a1a1a' },
  btnGhost:     { backgroundColor: 'transparent' },
  actionText:   { color: '#fff', fontWeight: '600', fontSize: 13 },
  actionTextGhost:{ color: '#888', fontSize: 13 },

  solvedText:   { color: '#44ff88', fontSize: 20, fontWeight: '700', textAlign: 'center', marginTop: 12 },
});
