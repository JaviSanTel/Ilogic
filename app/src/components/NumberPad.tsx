import { Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
  onDigit: (d: number) => void;
  onClear: () => void;
  onBackspace?: () => void;
  /** Si true, todos los botones se ven pero no son interactivos */
  disabled?: boolean;
  /** Sólo dígitos 1-9, oculta el 0 */
  hideZero?: boolean;
}

export function NumberPad({ onDigit, onClear, onBackspace, disabled, hideZero }: Props) {
  const press = (action: () => void) => () => {
    if (disabled) return;
    action();
  };

  return (
    <View style={[styles.container, disabled && styles.disabled]}>
      <View style={styles.row}>
        {[1, 2, 3].map((n) => (
          <Key key={n} label={String(n)} onPress={press(() => onDigit(n))} />
        ))}
      </View>
      <View style={styles.row}>
        {[4, 5, 6].map((n) => (
          <Key key={n} label={String(n)} onPress={press(() => onDigit(n))} />
        ))}
      </View>
      <View style={styles.row}>
        {[7, 8, 9].map((n) => (
          <Key key={n} label={String(n)} onPress={press(() => onDigit(n))} />
        ))}
      </View>
      <View style={styles.row}>
        <Key label="C" variant="aux" onPress={press(onClear)} />
        {hideZero
          ? <View style={styles.key} />
          : <Key label="0" onPress={press(() => onDigit(0))} />}
        <Key label="⌫" variant="aux" onPress={press(() => onBackspace?.())} />
      </View>
    </View>
  );
}

function Key({
  label, onPress, variant = 'num',
}: { label: string; onPress: () => void; variant?: 'num' | 'aux' }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.key,
        variant === 'aux' && styles.keyAux,
        pressed && styles.keyPressed,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.keyLabel, variant === 'aux' && styles.keyLabelAux]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0a0a14',
    borderTopWidth: 1,
    borderTopColor: '#2a2a3e',
    padding: 10,
    gap: 8,
  },
  disabled:    { opacity: 0.4 },
  row:         { flexDirection: 'row', gap: 8, justifyContent: 'center' },
  key: {
    flex: 1,
    maxWidth: 90,
    minHeight: 52,
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2a2a3e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyAux:      { backgroundColor: '#2a2a3e' },
  keyPressed:  { opacity: 0.7, backgroundColor: '#3a3a5e' },
  keyLabel:    { color: '#fff', fontSize: 22, fontWeight: '600' },
  keyLabelAux: { color: '#aaa', fontSize: 18 },
});
