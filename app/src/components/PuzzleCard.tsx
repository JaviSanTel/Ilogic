import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { PuzzleType, Difficulty } from '../types';

interface Props {
  type: PuzzleType;
  title: string;
  emoji: string;
  description: string;
  difficulty?: Difficulty;
}

export function PuzzleCard({ type, title, emoji, description, difficulty = 'medium' }: Props) {
  const router = useRouter();

  const handlePress = () => {
    const puzzleId = `${type}-${difficulty}-${Date.now()}`;
    router.push(`/game/${puzzleId}`);
  };

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={handlePress}
    >
      <Text style={styles.emoji}>{emoji}</Text>
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description} numberOfLines={2}>{description}</Text>
      </View>
    </Pressable>
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
  pressed: { opacity: 0.8, transform: [{ scale: 0.98 }] },
  emoji:   { fontSize: 32 },
  info:    { flex: 1, gap: 3 },
  title:   { color: '#fff', fontSize: 16, fontWeight: '700' },
  description: { color: '#888', fontSize: 12 },
});
