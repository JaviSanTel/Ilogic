import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Difficulty, PuzzleType } from '../types';
import { DifficultyPicker } from './DifficultyPicker';

interface Props {
  type: PuzzleType;
  title: string;
  emoji: string;
  description: string;
  enabled?: boolean;
}

/** Puzzles que tienen pantalla intermedia de selección de variante */
const HAS_VARIANT_SCREEN: Partial<Record<PuzzleType, string>> = {
  sudoku: '/variant/sudoku',
};

export function PuzzleCard({ type, title, emoji, description, enabled = true }: Props) {
  const router = useRouter();
  const [pickerVisible, setPickerVisible] = useState(false);

  const handlePress = () => {
    if (!enabled) return;
    const variantRoute = HAS_VARIANT_SCREEN[type];
    if (variantRoute) {
      router.push(variantRoute as any);
    } else {
      setPickerVisible(true);
    }
  };

  const handleSelect = (difficulty: Difficulty) => {
    setPickerVisible(false);
    const puzzleId = `${type}-${difficulty}-${Date.now()}`;
    router.push(`/game/${puzzleId}`);
  };

  return (
    <>
      <Pressable
        style={({ pressed }) => [
          styles.card,
          pressed && styles.pressed,
          !enabled && styles.disabled,
        ]}
        onPress={handlePress}
      >
        <Text style={styles.emoji}>{emoji}</Text>
        <View style={styles.info}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description} numberOfLines={2}>{description}</Text>
        </View>
        {!enabled && <Text style={styles.soon}>Pronto</Text>}
      </Pressable>

      <DifficultyPicker
        visible={pickerVisible}
        puzzleTitle={title}
        onSelect={handleSelect}
        onCancel={() => setPickerVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    width: '100%',
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  pressed:     { opacity: 0.8, transform: [{ scale: 0.98 }] },
  disabled:    { opacity: 0.4 },
  emoji:       { fontSize: 32 },
  info:        { flex: 1, gap: 3 },
  title:       { color: '#fff', fontSize: 16, fontWeight: '700' },
  description: { color: '#888', fontSize: 12 },
  soon:        { color: '#666', fontSize: 11, fontStyle: 'italic' },
});
