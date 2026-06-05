import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Timer } from './Timer';

interface Props {
  running: boolean;
  onTick?: (seconds: number) => void;
  title?: string;
}

export function GameHeader({ running, onTick, title }: Props) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <Pressable onPress={() => router.back()} style={styles.exitBtn}>
        <Text style={styles.exitText}>← Salir</Text>
      </Pressable>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.timerBox}>
        <Text style={styles.timerLabel}>⏱</Text>
        <Timer running={running} onTick={onTick} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#0a0a14',
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a3e',
  },
  exitBtn:   { padding: 8 },
  exitText:  { color: '#888', fontSize: 14, fontWeight: '600' },
  title:     { color: '#fff', fontSize: 14, fontWeight: '700' },
  timerBox:  {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: '#1a1a2e', paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 10,
  },
  timerLabel: { fontSize: 14 },
});
