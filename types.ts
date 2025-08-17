export interface MeasurementField {
  id: string;
  label: string;
  tip: string;
}

export interface Measurements {
  [key: string]: string | number;
}

export interface BandData {
  y: number;
  left: number;
  right: number;
  arc: number;
}

export interface LineData {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface MapData {
  bands: { [key: string]: BandData };
  lines: { [key: string]: LineData };
  vlines: { [key: string]: { x: number; y1: number; y2: number } };
}

export interface HighlightsMap {
  [key: string]: string[];
}

export interface TooltipState {
  visible: boolean;
  content: string;
  x: number;
  y: number;
}
