import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PuzzleCard } from '../src/components/PuzzleCard';
import { PuzzleType } from '../src/types';

const PUZZLES: {
  type: PuzzleType;
  title: string;
  emoji: string;
  description: string;
  enabled: boolean;
}[] = [
  { type: 'pyramid',          title: 'Pirámide',         emoji: '🔺', description: 'Rellena la pirámide numérica',     enabled: true  },
  { type: 'logic-grid',       title: 'Quién es Quién',   emoji: '🧩', description: 'Deducción lógica con pistas',       enabled: true  },
  { type: 'kakuro',           title: 'Kakuro',           emoji: '➕', description: 'Sumas cruzadas sin repetición',     enabled: false },
  { type: 'nonogram',         title: 'Nonograma',        emoji: '🖼️', description: 'Pinta el Picross',                  enabled: false },
  { type: 'lanzarrayos',      title: 'Lanzarrayos',      emoji: '⚡', description: 'Lanza rayos desde las cápsulas',    enabled: false },
  { type: 'cruzex',           title: 'Crúzex',           emoji: '🔢', description: 'Crucigrama numérico',                enabled: false },
  { type: 'clasificaciones',  title: 'Clasificaciones',  emoji: '⚽', description: 'Deduce los resultados del torneo',   enabled: false },
  { type: 'goteo',            title: 'Goteo',            emoji: '💧', description: 'Descifra la frase letra a letra',    enabled: false },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>Ilogic</Text>
        <Text style={styles.subtitle}>Pasatiempos de lógica</Text>
      </View>
      <ScrollView contentContainerStyle={styles.grid}>
        {PUZZLES.map((p) => (
          <PuzzleCard
            key={p.type}
            type={p.type}
            title={p.title}
            emoji={p.emoji}
            description={p.description}
            enabled={p.enabled}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0f0f1a',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  grid: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
});
