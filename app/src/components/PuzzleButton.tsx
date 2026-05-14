import { Pressable, StyleSheet, Text } from 'react-native';

interface Props {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export function PuzzleButton({ label, onPress, variant = 'primary', size = 'md', disabled }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        styles[size],
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.label, styles[`${variant}Label`], styles[`${size}Label`]]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base:           { borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  pressed:        { opacity: 0.75 },
  disabled:       { opacity: 0.4 },

  primary:        { backgroundColor: '#6c63ff' },
  secondary:      { backgroundColor: '#2a2a3e' },
  ghost:          { backgroundColor: 'transparent' },

  sm:             { paddingHorizontal: 12, paddingVertical: 6 },
  md:             { paddingHorizontal: 20, paddingVertical: 12 },
  lg:             { paddingHorizontal: 28, paddingVertical: 16 },

  label:          { fontWeight: '600' },
  primaryLabel:   { color: '#fff' },
  secondaryLabel: { color: '#ccc' },
  ghostLabel:     { color: '#888' },

  smLabel:        { fontSize: 13 },
  mdLabel:        { fontSize: 15 },
  lgLabel:        { fontSize: 17 },
});
