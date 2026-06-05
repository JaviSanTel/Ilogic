import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Timer } from './Timer';

interface Props {
  running: boolean;
  onTick?: (seconds: number) => void;
  title?: string;
  helpTitle?: string;
  helpContent?: string;
}

export function GameHeader({ running, onTick, title, helpTitle, helpContent }: Props) {
  const router = useRouter();
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.btn}>
          <Text style={styles.exitText}>← Salir</Text>
        </Pressable>

        {title && <Text style={styles.title}>{title}</Text>}

        <View style={styles.rightCluster}>
          {helpContent && (
            <Pressable onPress={() => setHelpOpen(true)} style={styles.helpBtn}>
              <Text style={styles.helpText}>?</Text>
            </Pressable>
          )}
          <View style={styles.timerBox}>
            <Text style={styles.timerLabel}>⏱</Text>
            <Timer running={running} onTick={onTick} />
          </View>
        </View>
      </View>

      <Modal visible={helpOpen} transparent animationType="fade" onRequestClose={() => setHelpOpen(false)}>
        <View style={modalStyles.backdrop}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setHelpOpen(false)} />
          <View style={modalStyles.sheet}>
            <Text style={modalStyles.title}>{helpTitle ?? 'Cómo jugar'}</Text>
            <ScrollView style={modalStyles.scroll} contentContainerStyle={{ gap: 10 }}>
              <Text style={modalStyles.body}>{helpContent}</Text>
            </ScrollView>
            <Pressable style={modalStyles.closeBtn} onPress={() => setHelpOpen(false)}>
              <Text style={modalStyles.closeText}>Entendido</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
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
  btn:        { padding: 8 },
  exitText:   { color: '#888', fontSize: 14, fontWeight: '600' },
  title:      { color: '#fff', fontSize: 14, fontWeight: '700', flex: 1, textAlign: 'center' },
  rightCluster:{ flexDirection: 'row', alignItems: 'center', gap: 8 },
  helpBtn:    {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: '#2a2a3e', alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: '#3a3a5e',
  },
  helpText:   { color: '#6c63ff', fontSize: 16, fontWeight: '800' },
  timerBox:   {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: '#1a1a2e', paddingHorizontal: 10, paddingVertical: 6,
    borderRadius: 10,
  },
  timerLabel: { fontSize: 14 },
});

const modalStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  sheet: {
    backgroundColor: '#1a1a2e',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    maxWidth: 480,
    maxHeight: '85%',
    gap: 12,
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  title:    { color: '#fff', fontSize: 18, fontWeight: '800', textAlign: 'center' },
  scroll:   { maxHeight: 420 },
  body:     { color: '#ccc', fontSize: 14, lineHeight: 22 },
  closeBtn: {
    backgroundColor: '#6c63ff',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 6,
  },
  closeText:{ color: '#fff', fontSize: 14, fontWeight: '700' },
});
