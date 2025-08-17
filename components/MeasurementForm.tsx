import React from 'react';
import { UPPER_BODY_FIELDS, LOWER_BODY_FIELDS } from '../constants';
import type { MeasurementField, Measurements } from '../types';

interface MeasurementFormProps {
  measurements: Measurements;
  onMeasurementChange: (id: string, value: string) => void;
  onFieldFocus: (id: string | null) => void;
  onShowTooltip: (content: string, element: HTMLElement) => void;
  onHideTooltip: () => void;
  onClear: () => void;
}

const InfoIcon: React.FC<{tip: string, onShow: Function, onHide: Function}> = ({ tip, onShow, onHide }) => (
    <span className="info"
        onMouseOver={(e) => onShow(tip, e.currentTarget)}
        onMouseOut={() => onHide()}
    >i</span>
);

const MeasurementInput: React.FC<{
    field: MeasurementField;
    value: string | number;
    onMeasurementChange: (id: string, value: string) => void;
    onFieldFocus: (id: string) => void;
    onShowTooltip: (content: string, element: HTMLElement) => void;
    onHideTooltip: () => void;
}> = ({ field, value, onMeasurementChange, onFieldFocus, onShowTooltip, onHideTooltip}) => (
    <div className="field">
        <label>
            <span>{field.label} <span className="unit">(in)</span></span>
            <InfoIcon tip={field.tip} onShow={onShowTooltip} onHide={onHideTooltip} />
        </label>
        <input
            type="number" min="0" placeholder="in" id={field.id}
            data-field
            value={value || ''}
            onChange={(e) => onMeasurementChange(field.id, e.target.value)}
            onFocus={() => onFieldFocus(field.id)}
            onBlur={() => onFieldFocus(null)}
        />
    </div>
);


export const MeasurementForm: React.FC<MeasurementFormProps> = ({
  measurements,
  onMeasurementChange,
  onFieldFocus,
  onShowTooltip,
  onHideTooltip,
  onClear
}) => {
  return (
    <section className="panel">
      
      <h2>Client Info</h2>
      <div className="two">
          <div className="field">
              <label>Full Name</label>
              <input
                  type="text" placeholder="e.g. Jane Doe" id="client_name"
                  data-field
                  value={measurements.client_name}
                  onChange={(e) => onMeasurementChange('client_name', e.target.value)}
                  onFocus={() => onFieldFocus(null)}
              />
          </div>
          <div className="field">
              <label>Email</label>
              <input
                  type="email" placeholder="e.g. jane.doe@example.com" id="client_email"
                  data-field
                  value={measurements.client_email}
                  onChange={(e) => onMeasurementChange('client_email', e.target.value)}
                  onFocus={() => onFieldFocus(null)}
              />
          </div>
      </div>

      <h2>Basics</h2>
      <div className="two">
          <div className="field">
            <label>
                <span>Height</span>
                <InfoIcon tip="Enter height as feet + inches (e.g., 5 and 10 for 5′10″)." onShow={onShowTooltip} onHide={onHideTooltip} />
            </label>
            <div className="row">
                <input
                    type="number" min="0" placeholder="ft" id="height_ft"
                    data-field
                    value={measurements.height_ft}
                    onChange={(e) => onMeasurementChange('height_ft', e.target.value)}
                    onFocus={() => onFieldFocus(null)}
                />
                <input
                    type="number" min="0" placeholder="in" id="height_in"
                    data-field
                    value={measurements.height_in}
                    onChange={(e) => onMeasurementChange('height_in', e.target.value)}
                    onFocus={() => onFieldFocus(null)}
                />
            </div>
          </div>
          <div className="field">
            <label>
                <span>Weight <span className="unit">(lb)</span></span>
                <InfoIcon tip="Body weight in pounds." onShow={onShowTooltip} onHide={onHideTooltip} />
            </label>
            <input
                type="number" min="0" placeholder="lbs" id="weight"
                data-field
                value={measurements.weight}
                onChange={(e) => onMeasurementChange('weight', e.target.value)}
                onFocus={() => onFieldFocus(null)}
            />
          </div>
      </div>

      <h2>Upper Body</h2>
      <div className="three">
          {UPPER_BODY_FIELDS.map(field => (
              <MeasurementInput 
                  key={field.id}
                  field={field} 
                  value={measurements[field.id]} 
                  onMeasurementChange={onMeasurementChange}
                  onFieldFocus={onFieldFocus}
                  onShowTooltip={onShowTooltip}
                  onHideTooltip={onHideTooltip}
              />
          ))}
      </div>
      
      <h2>Lower Body</h2>
      <div className="three">
          {LOWER_BODY_FIELDS.map(field => (
                <MeasurementInput 
                  key={field.id}
                  field={field} 
                  value={measurements[field.id]} 
                  onMeasurementChange={onMeasurementChange}
                  onFieldFocus={onFieldFocus}
                  onShowTooltip={onShowTooltip}
                  onHideTooltip={onHideTooltip}
              />
          ))}
      </div>

      <div className="actions">
        <button id="saveBtn" className="primary" onClick={() => window.ML_generatePdf && window.ML_generatePdf()}>
          Save as PDF
        </button>
        <button id="downloadBtn">
          Download JSON
        </button>
        <label htmlFor="uploadInput" className="button">
            Load JSON
        </label>
        <input type="file" id="uploadInput" accept=".json" style={{ display: 'none' }}/>
        <button onClick={onClear}>
          Clear
        </button>
      </div>
    </section>
  );
};