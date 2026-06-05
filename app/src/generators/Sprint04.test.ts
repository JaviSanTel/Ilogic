import { generateGoteo } from './GoteoGenerator';
import { generateClasificaciones, matchKey } from './ClasificacionesGenerator';
import { generateCruzex } from './CruzexGenerator';
import { generateLanzarayos } from './LanzarayosGenerator';
import { Difficulty } from '../types';
import { validateGoteo, buildAttempt } from '../puzzles/goteo/validator';
import { validateClasificaciones } from '../puzzles/clasificaciones/validator';
import { validateCruzex } from '../puzzles/cruzex/validator';
import { validateLanzarayos } from '../puzzles/lanzarrayos/validator';

const DIFFICULTIES: Difficulty[] = ['easy', 'medium', 'hard'];

// ─── GOTEO ─────────────────────────────────────────────────────────────────
describe('GoteoGenerator', () => {
  DIFFICULTIES.forEach((d) => {
    it(`generates and validates a ${d} puzzle`, () => {
      const p = generateGoteo(d);
      expect(p.type).toBe('goteo');
      expect(p.solution.length).toBeGreaterThan(0);
      expect(p.columns.length).toBe(p.solution.length);

      // Solución correcta debe validar
      const state = p.columns.map((col) => {
        if (col.length === 1) return undefined;
        return col.indexOf(p.solution[p.columns.indexOf(col)]);
      });
      // Reconstruyo el state correctamente
      const goodState = p.columns.map((col, i) =>
        col.length === 1 ? undefined : col.indexOf(p.solution[i])
      );
      expect(validateGoteo(p, goodState).isCorrect).toBe(true);
      expect(buildAttempt(p, goodState)).toBe(p.solution);
    });
  });
});

// ─── CLASIFICACIONES ───────────────────────────────────────────────────────
describe('ClasificacionesGenerator', () => {
  DIFFICULTIES.forEach((d) => {
    it(`generates and validates a ${d} puzzle`, () => {
      const p = generateClasificaciones(d);
      expect(p.type).toBe('clasificaciones');
      expect(p.teams.length).toBeGreaterThanOrEqual(3);

      // Pts = G*3 + E
      for (const row of p.table) {
        expect(row.Pts).toBe(row.G * 3 + row.E);
      }

      // Validar con solución completa
      expect(validateClasificaciones(p, p.solution).isCorrect).toBe(true);
    });
  });

  it('matchKey is order-independent', () => {
    expect(matchKey('A', 'B')).toBe(matchKey('B', 'A'));
  });
});

// ─── CRUZEX ────────────────────────────────────────────────────────────────
describe('CruzexGenerator', () => {
  DIFFICULTIES.forEach((d) => {
    it(`generates and validates a ${d} puzzle`, () => {
      const p = generateCruzex(d);
      expect(p.type).toBe('cruzex');
      expect(p.solution.length).toBeGreaterThan(0);
      expect(p.numberList.length).toBeGreaterThan(0);

      // Solución completa valida
      expect(validateCruzex(p, p.solution).isCorrect).toBe(true);
    });
  });
});

// ─── LANZARRAYOS ───────────────────────────────────────────────────────────
describe('LanzarayosGenerator', () => {
  DIFFICULTIES.forEach((d) => {
    it(`generates and validates a ${d} puzzle`, () => {
      const p = generateLanzarayos(d);
      expect(p.type).toBe('lanzarrayos');
      expect(p.capsules.length).toBeGreaterThan(0);
      expect(p.solution.length).toBe(p.capsules.length);

      // Cada cápsula tiene totalCells = 1 + length del rayo
      for (let i = 0; i < p.capsules.length; i++) {
        const cap = p.capsules[i];
        const ray = p.solution[i];
        expect(cap.totalCells).toBe(ray.length + 1);
      }

      // Validador con solución correcta
      const state = p.solution.map((r) => ({ direction: r.direction, length: r.length }));
      expect(validateLanzarayos(p, state).isCorrect).toBe(true);
    });
  });
});
