import type { MeasurementField, Measurements, MapData, HighlightsMap } from './types';

export const UPPER_BODY_FIELDS: MeasurementField[] = [
  { id: 'neck', label: 'Neck', tip: 'Wrap tape around the base of the neck; keep it level and relaxed.' },
  { id: 'shoulders', label: 'Shoulder Width', tip: 'Measure straight across from shoulder tip to shoulder tip.' },
  { id: 'chest', label: 'Chest/Bust', tip: 'Around the fullest part of chest/bust, tape parallel to floor.' },
  { id: 'underbust', label: 'Underbust', tip: 'Around ribcage just under the bust.' },
  { id: 'waist', label: 'Waist', tip: 'Natural waist at the narrowest point; don’t suck in.' },
  { id: 'back', label: 'Back Length', tip: 'From the nape (base of neck) down the spine to natural waist.' },
  { id: 'sleeve', label: 'Sleeve Length', tip: 'From shoulder tip over elbow to wrist with arm slightly bent.' },
  { id: 'bicep', label: 'Bicep', tip: 'Around the fullest part of upper arm.' },
  { id: 'wrist', label: 'Wrist', tip: 'Around the wrist bone.' }
];

export const LOWER_BODY_FIELDS: MeasurementField[] = [
  { id: 'hip', label: 'Hip', tip: 'Around the fullest part of hips/seat, tape parallel to floor.' },
  { id: 'rise', label: 'Rise', tip: 'Vertical distance from crotch level up to natural waist.' },
  { id: 'outseam', label: 'Outseam', tip: 'Vertical line from waist to ankle along the outside of the leg.' },
  { id: 'inseam', label: 'Inseam', tip: 'Vertical line from crotch to ankle along the inside of the leg.' },
  { id: 'thigh', label: 'Thigh', tip: 'Around the fullest part of thigh.' },
  { id: 'knee', label: 'Knee', tip: 'Around the knee cap with leg straight.' },
  { id: 'calf', label: 'Calf', tip: 'Around the fullest part of calf.' },
  { id: 'ankle', label: 'Ankle', tip: 'Around the narrowest part above the ankle bone.' }
];

export const MAP: MapData = {
  bands: {
    neck:{y:195.745,left:355.664,right:414.515,arc:1.279},
    shoulders:{y:231.567,left:280.18,right:487.44,arc:-19.191},
    chest:{y:301.9332275390625,left:300.651,right:470.80780029296875,arc:8.956},
    underbust:{y:335.1970520019531,left:301.93,right:465.6902770996094,arc:1.279},
    waist:{y:408.1216125488281,left:317.282,right:452.8965148925781,arc:2.5589704589843905},
    hip:{y:515.58935546875,left:284.0185852050781,right:486.16033935546875,arc:10.23504638671875},
    thighL:{y:616.66,left:286.577,right:373.575,arc:3.838},
    thighR:{y:617.94,left:394,right:484.881,arc:2.559},
    kneeL:{y:739.4805297851562,left:301.9299011230469,right:360.781,arc:5.11749267578125},
    kneeR:{y:740.7598876953125,left:405.559,right:466.96966552734375,arc:2.559},
    calfL:{y:846.948,left:300,right:346.708,arc:3.838},
    calfR:{y:848.228,left:410.677,right:477.205,arc:5.117},
    ankleL:{y:972.327,left:304.489,right:344.149,arc:2.559},
    ankleR:{y:971.048,left:423.471,right:461.852,arc:3.838108398437498},
    bicepL:{y:324.962,left:250.755,right:287.857,arc:6.397},
    bicepR:{y:327.521,left:477.205,right:525.821,arc:3.83791723632811},
    wristL:{y:519.427,left:180.389,right:216.212,arc:1.279},
    wristR:{y:521.9862670898438,left:559.085,right:587.231201171875,arc:0}
  },
  lines: {
    sleeveL:{x1:260.9897766113281,y1:230.28805541992188,x2:165.03643798828125,y2:519.427490234375},
    sleeveR:{x1:506.63037109375,y1:227.7292938232422,x2:608.9806518554688,y2:515.58935546875},
    back:{x1:382.53070068359375,y1:200.86236572265625,x2:382.53070068359375,y2:409.4009704589844}
  },
  vlines: {
    inseam:{x:384,y1:569.3232421875,y2:1000},
    outseamL:{x:271.2248229980469,y1:410.68035888671875,y2:1000},
    rise:{x:395.3244934082031,y1:418.35662841796875,y2:551.4119262695312}
  }
};

export const HIGHLIGHTS: HighlightsMap = {
  neck: ['band-neck'],
  shoulders: ['band-shoulders'],
  chest: ['band-chest'],
  underbust: ['band-underbust'],
  waist: ['band-waist'],
  hip: ['band-hip'],
  back: ['line-back'],
  sleeve: ['line-sleeveL', 'line-sleeveR'],
  bicep: ['band-bicepL', 'band-bicepR'],
  wrist: ['band-wristL', 'band-wristR'],
  thigh: ['band-thighL', 'band-thighR'],
  knee: ['band-kneeL', 'band-kneeR'],
  calf: ['band-calfL', 'band-calfR'],
  ankle: ['band-ankleL', 'band-ankleR'],
  rise: ['vline-rise'],
  outseam: ['vline-outseamL'],
  inseam: ['vline-inseam']
};

export const INITIAL_MEASUREMENTS: Measurements = {
  client_name: '', client_email: '', height_ft: '', height_in: '', weight: '',
  neck: '', shoulders: '', chest: '', underbust: '', waist: '', back: '', sleeve: '', bicep: '', wrist: '',
  hip: '', rise: '', outseam: '', inseam: '', thigh: '', knee: '', calf: '', ankle: ''
};
