import React from 'react';
import { UPPER_BODY_FIELDS, LOWER_BODY_FIELDS } from '../constants';
import type { Measurements } from '../types';

interface SummaryPanelProps {
  measurements: Measurements;
}

const formatHeight = (ft: string | number, inches: string | number): string => {
  const feetVal = ft ? String(ft) : '';
  const inchesVal = inches ? String(inches) : '';
  if (!feetVal && !inchesVal) return '—';
  return `${feetVal || '0'}' ${inchesVal || '0'}"`;
};

const SummaryField: React.FC<{ label: string, value: string | number, unit?: string }> = ({ label, value, unit }) => {
  const displayValue = (value === '' || value === null || value === undefined) ? '—' : String(value);
  return (
    <div className="summary-field">
      <span className="summary-label">{label}</span>
      <span className="summary-value">{displayValue}{unit && ` ${unit}`}</span>
    </div>
  );
};

const SummarySection: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => {
    const childArray = React.Children.toArray(children);
    if (childArray.length === 0) return null;

    return (
        <div className="summary-section">
            <h3>{title}</h3>
            <div className="summary-grid">
                {children}
            </div>
        </div>
    );
};


export const SummaryPanel: React.FC<SummaryPanelProps> = ({ measurements }) => {
  const formattedHeight = formatHeight(measurements.height_ft, measurements.height_in);
  
  return (
    <section className="panel light">
      <h2>Summary</h2>
      
      <SummarySection title="Client Info">
        <SummaryField label="Full Name" value={measurements.client_name} />
        <SummaryField label="Email" value={measurements.client_email} />
      </SummarySection>

      <SummarySection title="Basics">
        <SummaryField label="Height" value={formattedHeight} />
        <SummaryField label="Weight" value={measurements.weight} unit="lb" />
      </SummarySection>
      
      <SummarySection title="Upper Body">
          {UPPER_BODY_FIELDS.map(field => (
              <SummaryField 
                  key={field.id}
                  label={field.label} 
                  value={measurements[field.id]} 
                  unit="in"
              />
          ))}
      </SummarySection>
      
      <SummarySection title="Lower Body">
          {LOWER_BODY_FIELDS.map(field => (
              <SummaryField 
                  key={field.id}
                  label={field.label} 
                  value={measurements[field.id]} 
                  unit="in"
              />
          ))}
      </SummarySection>
    </section>
  );
};
