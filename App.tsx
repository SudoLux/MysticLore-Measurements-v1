
import React, { useState, useCallback, useEffect } from 'react';
import { MeasurementForm } from './components/MeasurementForm';
import { Mannequin } from './components/Mannequin';
import { Tooltip } from './components/Tooltip';
import { SummaryPanel } from './components/SummaryPanel';
import { INITIAL_MEASUREMENTS } from './constants';
import type { Measurements, TooltipState } from './types';
import { LOGO_IMAGE_DATA } from './image-assets';

declare global {
  interface Window {
    jspdf: any;
    html2canvas: any;
    ML_generatePdf: () => void;
  }
}

const sanitize = (str: string) => {
  if (typeof str !== 'string') return str;
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

function App() {
  const [measurements, setMeasurements] = useState<Measurements>(INITIAL_MEASUREMENTS);
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, content: '', x: 0, y: 0 });

  const handleMeasurementChange = useCallback((id: string, value: string) => {
    setMeasurements(prev => ({ ...prev, [id]: value }));
  }, []);

  const handleFieldFocus = useCallback((id: string | null) => {
    setActiveRegion(id);
  }, []);
  
  const collectFormValues = useCallback((): Measurements => {
    const values: Measurements = {};
    const fields = document.querySelectorAll('[data-field]');
    fields.forEach(field => {
      const input = field as HTMLInputElement;
      values[input.id] = sanitize(input.value);
    });
    return values;
  }, []);

  const renderSummary = useCallback((values: Measurements) => {
    setMeasurements(values);
  }, []);

  const saveToLocal = useCallback(() => {
    const values = collectFormValues();
    renderSummary(values);
    for (const key in values) {
      localStorage.setItem(`ml.${key}`, String(values[key]));
    }
  }, [collectFormValues, renderSummary]);

  const loadFromLocal = useCallback(() => {
    const values: Measurements = { ...INITIAL_MEASUREMENTS };
    let hasValues = false;
    for (const key in values) {
      const storedValue = localStorage.getItem(`ml.${key}`);
      if (storedValue) {
        values[key] = storedValue;
        hasValues = true;
      }
    }
    if (hasValues) {
      setMeasurements(values);
      renderSummary(values);
    }
  }, [renderSummary]);

  const clearLocal = useCallback(() => {
    if (window.confirm('Are you sure you want to clear all fields? This will also clear your saved data.')) {
      for (const key in INITIAL_MEASUREMENTS) {
        localStorage.removeItem(`ml.${key}`);
      }
      setMeasurements(INITIAL_MEASUREMENTS);
      renderSummary(INITIAL_MEASUREMENTS);
      setActiveRegion(null);
    }
  }, [renderSummary]);

  const downloadJSON = useCallback(() => {
    const values = collectFormValues();
    const name = (values.client_name || 'client').toString().trim().replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `MysticLore_${name}.json`;
    const jsonStr = JSON.stringify(values, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [collectFormValues]);

  const loadJSON = useCallback((file: File) => {
    if (!file || !file.type.match('json.*')) {
        alert('Please select a valid JSON file.');
        return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const json = JSON.parse(event!.target!.result as string);
            const values: Measurements = { ...INITIAL_MEASUREMENTS };
            for (const key in values) {
                if (json[key] !== undefined) {
                    values[key] = sanitize(String(json[key]));
                }
            }
            renderSummary(values);
            for (const key in values) {
              localStorage.setItem(`ml.${key}`, String(values[key]));
            }
        } catch (e) {
            alert('Error parsing JSON file.');
            console.error(e);
        }
    };
    reader.readAsText(file);
  }, [renderSummary]);

  const showTooltip = useCallback((content: string, element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    setTooltip({
      visible: true,
      content,
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  }, []);

  const hideTooltip = useCallback(() => {
    setTooltip(prev => ({ ...prev, visible: false }));
  }, []);

  useEffect(() => {
    window.addEventListener('DOMContentLoaded', loadFromLocal);
    document.addEventListener('input', saveToLocal, true);

    const downloadBtn = document.getElementById('downloadBtn');
    downloadBtn?.addEventListener('click', downloadJSON);

    const uploadInput = document.getElementById('uploadInput') as HTMLInputElement;
    const handleUpload = (e: Event) => {
        const target = e.target as HTMLInputElement;
        if (target.files && target.files[0]) {
          loadJSON(target.files[0]);
        }
    };
    uploadInput?.addEventListener('change', handleUpload);
    
    return () => {
      window.removeEventListener('DOMContentLoaded', loadFromLocal);
      document.removeEventListener('input', saveToLocal, true);
      downloadBtn?.removeEventListener('click', downloadJSON);
      uploadInput?.removeEventListener('change', handleUpload);
    };
  }, [loadFromLocal, saveToLocal, downloadJSON, loadJSON]);
  
  return (
    <>
      <div className="wrap">
        <header className="apphead">
          <img src={LOGO_IMAGE_DATA} alt="Mystic Lore Logo" className="logo" />
          <div className="titles">
            <h1>Mystic Lore Measurements</h1>
            <p>Custom Garment Measurement Summary</p>
          </div>
        </header>
        <div className="grid">
          <MeasurementForm
            measurements={measurements}
            onMeasurementChange={handleMeasurementChange}
            onFieldFocus={handleFieldFocus}
            onShowTooltip={showTooltip}
            onHideTooltip={hideTooltip}
            onClear={clearLocal}
          />
          <Mannequin activeRegion={activeRegion} />
          <SummaryPanel measurements={measurements} />
        </div>
      </div>
      <Tooltip
        visible={tooltip.visible}
        content={tooltip.content}
        x={tooltip.x}
        y={tooltip.y}
      />
    </>
  );
}

export default App;