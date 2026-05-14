import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

interface Props {
  running?: boolean;
  initialSeconds?: number;
  onTick?: (seconds: number) => void;
}

export function Timer({ running = true, initialSeconds = 0, onTick }: Props) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          const next = s + 1;
          onTick?.(next);
          return next;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return <Text style={styles.timer}>{mm}:{ss}</Text>;
}

const styles = StyleSheet.create({
  timer: { color: '#6c63ff', fontSize: 18, fontWeight: '700', fontVariant: ['tabular-nums'] },
});
