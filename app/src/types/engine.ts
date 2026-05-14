export type CellType = 'input' | 'fixed' | 'black' | 'clue';

export interface CellCoord {
  row: number;
  col: number;
}

export interface ValidationResult {
  isCorrect: boolean;
  errors: CellCoord[];
}

export interface CellStyle {
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
}

export interface CellConfig {
  type: CellType;
  value?: number | string | null;
  style?: CellStyle;
}

export interface GridConfig {
  rows: number;
  cols: number;
  cellSize: number;
  cells: CellConfig[][];
}
