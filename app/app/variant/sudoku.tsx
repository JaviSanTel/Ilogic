import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DifficultyPicker } from '../../src/components/DifficultyPicker';
import { Difficulty, SudokuVariant } from '../../src/types';

const VARIANTS: {
  id: SudokuVariant;
  title: string;
  emoji: string;
  description: string;
}[] = [
  {
    id: 'classic',
    title: 'Clásico',
    emoji: '🎯',
    description: '9×9 estándar. Cada fila, columna y caja de 3×3 con dígitos 1-9 sin repetir.',
  },
  {
    id: 'x',
    title: 'Sudoku X',
    emoji: '✖️',
    description: 'Clásico + las dos diagonales tampoco repiten dígitos.',
  },
  {
    id: 'mini',
    title: 'Mini 6×6',
    emoji: '🔹',
    description: 'Versión reducida 6×6 con dígitos 1-6 y cajas de 2×3. Ideal para empezar.',
  },
  {
    id: 'hyper',
    title: 'Hyper',
    emoji: '⭐',
    description: '9×9 con 4 cajas extra marcadas en el interior, cada una sin repetir dígitos.',
  },
];

export default function SudokuVariantScreen() {
  const router = useRouter();
  const [picker, setPicker] = useState<{ variant: SudokuVariant; title: string } | null>(null);

  const handleVariantPress = (variant: SudokuVariant, title: string) => {
    setPicker({ variant, title });
  };

  const handleDifficulty = (difficulty: Difficulty) => {
    if (!picker) return;
    const puzzleId = `sudoku-${picker.variant}-${difficulty}-${Date.now()}`;
    setPicker(null);
    router.push(`/game/${puzzleId}`);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>← Atrás</Text>
        </Pressable>
        <Text style={styles.title}>Sudoku</Text>
        <Text style={styles.subtitle}>Elige una variante</Text>
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {VARIANTS.map((v) => (
          <Pressable
            key={v.id}
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            onPress={() => handleVariantPress(v.id, v.title)}
          >
            <Text style={styles.emoji}>{v.emoji}</Text>
            <View style={styles.info}>
              <Text style={styles.cardTitle}>{v.title}</Text>
              <Text style={styles.cardDesc}>{v.description}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <DifficultyPicker
        visible={picker !== null}
        puzzleTitle={picker?.title}
        onSelect={handleDifficulty}
        onCancel={() => setPicker(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:      { flex: 1, backgroundColor: '#0f0f1a' },
  header:    { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 12, gap: 4 },
  back:      { color: '#888', fontSize: 14, fontWeight: '600', marginBottom: 8 },
  title:     { color: '#fff', fontSize: 28, fontWeight: '800', letterSpacing: -0.5 },
  subtitle:  { color: '#888', fontSize: 13 },
  list:      { padding: 16, gap: 12 },
  card:      {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  cardPressed:{ opacity: 0.8, transform: [{ scale: 0.98 }] },
  emoji:     { fontSize: 32 },
  info:      { flex: 1, gap: 4 },
  cardTitle: { color: '#fff', fontSize: 16, fontWeight: '700' },
  cardDesc:  { color: '#888', fontSize: 12, lineHeight: 17 },
});
