import React from 'react';
import { MAP, HIGHLIGHTS } from '../constants';
import type { BandData, LineData } from '../types';
import { MANNEQUIN_IMAGE_DATA } from '../image-assets';

interface MannequinProps {
  activeRegion: string | null;
  isThumbnail?: boolean;
}

// Coordinate scaling functions to map original coords to the SVG's viewBox
const scaleX = (x: number): number => x * (700 / 768);
const scaleY = (y: number): number => y * (1100 / 1152);

const Band: React.FC<{ id: string; cfg: BandData; isHighlighted: boolean }> = ({ id, cfg, isHighlighted }) => {
  const d = `M ${scaleX(cfg.left)} ${scaleY(cfg.y)} C ${scaleX(cfg.left + 50)} ${scaleY(cfg.y + cfg.arc)}, ${scaleX(cfg.right - 50)} ${scaleY(cfg.y + cfg.arc)}, ${scaleX(cfg.right)} ${scaleY(cfg.y)}`;
  return <path d={d} id={id} className={`measurement-band ${isHighlighted ? 'highlight' : ''}`} />;
};

const Line: React.FC<{ id: string; cfg: LineData; isHighlighted: boolean }> = ({ id, cfg, isHighlighted }) => {
  return <line x1={scaleX(cfg.x1)} y1={scaleY(cfg.y1)} x2={scaleX(cfg.x2)} y2={scaleY(cfg.y2)} id={id} className={`measurement-line ${isHighlighted ? 'highlight' : ''}`} />;
};

const VLine: React.FC<{ id: string; cfg: { x: number; y1: number; y2: number }; isHighlighted: boolean }> = ({ id, cfg, isHighlighted }) => {
  return <line x1={scaleX(cfg.x)} y1={scaleY(cfg.y1)} x2={scaleX(cfg.x)} y2={scaleY(cfg.y2)} id={id} className={`measurement-line ${isHighlighted ? 'highlight' : ''}`} />;
};


export const Mannequin: React.FC<MannequinProps> = ({ activeRegion, isThumbnail = false }) => {
  const highlightedIds = activeRegion ? HIGHLIGHTS[activeRegion] || [] : [];
  
  const svgContent = (
    <svg id="mannequin-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 1100">
      <image href={MANNEQUIN_IMAGE_DATA} x="0" y="0" width="700" height="1100" />
      
      {/* Circumference Bands */}
      {Object.entries(MAP.bands).map(([key, cfg]) => (
        <Band key={key} id={`band-${key}`} cfg={cfg} isHighlighted={highlightedIds.includes(`band-${key}`)} />
      ))}

      {/* Straight Lines */}
      {Object.entries(MAP.lines).map(([key, cfg]) => (
        <Line key={key} id={`line-${key}`} cfg={cfg} isHighlighted={highlightedIds.includes(`line-${key}`)} />
      ))}
      
      {/* Vertical Lines */}
      {Object.entries(MAP.vlines).map(([key, cfg]) => (
        <VLine key={key} id={`vline-${key}`} cfg={cfg} isHighlighted={highlightedIds.includes(`vline-${key}`)} />
      ))}
    </svg>
  );

  if (isThumbnail) {
    return svgContent;
  }
  
  return (
    <section className="panel" style={{display: 'flex', flexDirection: 'column'}}>
       <h2>Measure Guide</h2>
      <div className="mannequin-box">
        {svgContent}
      </div>
    </section>
  );
};