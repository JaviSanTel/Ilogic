import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Difficulty } from '../types';

interface Props {
  visible: boolean;
  puzzleTitle?: string;
  onSelect: (difficulty: Difficulty) => void;
  onCancel: () => void;
}

const OPTIONS: { value: Difficulty; label: string; emoji: string; color: string }[] = [
  { value: 'easy',   label: 'Fácil',  emoji: '🟢', color: '#44ff88' },
  { value: 'medium', label: 'Medio',  emoji: '🟡', color: '#ffcc44' },
  { value: 'hard',   label: 'Difícil', emoji: '🔴', color: '#ff4488' },
];

export function DifficultyPicker({ visible, puzzleTitle, onSelect, onCancel }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <Pressable style={styles.backdrop} onPress={onCancel}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          {puzzleTitle && <Text style={styles.title}>{puzzleTitle}</Text>}
          <Text style={styles.subtitle}>Elige la dificultad</Text>

          <View style={styles.options}>
            {OPTIONS.map((opt) => (
              <Pressable
                key={opt.value}
                style={({ pressed }) => [
                  styles.option,
                  { borderColor: opt.color },
                  pressed && styles.optionPressed,
                ]}
                onPress={() => onSelect(opt.value)}
              >
                <Text style={styles.optionEmoji}>{opt.emoji}</Text>
                <Text style={styles.optionLabel}>{opt.label}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop:     { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center', padding: 24 },
  sheet:        { backgroundColor: '#1a1a2e', borderRadius: 20, padding: 24, width: '100%', maxWidth: 360, gap: 16 },
  title:        { color: '#fff', fontSize: 20, fontWeight: '800', textAlign: 'center' },
  subtitle:     { color: '#888', fontSize: 13, textAlign: 'center', marginBottom: 8 },
  options:      { gap: 10 },
  option:       {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: '#0f0f1a', padding: 16, borderRadius: 12, borderWidth: 2,
  },
  optionPressed:{ opacity: 0.7 },
  optionEmoji:  { fontSize: 24 },
  optionLabel:  { color: '#fff', fontSize: 16, fontWeight: '600' },
});
