import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="variant/sudoku" />
        <Stack.Screen name="game/[puzzleId]" />
        <Stack.Screen name="results/[puzzleId]" />
      </Stack>
    </>
  );
}
