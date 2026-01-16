// Mapeo de Estados y sus Ciudades correspondientes
// Basado en el formulario de DemoQA
export const STATES = {
  NCR: ['Delhi', 'Gurgaon', 'Noida'],
  'Uttar Pradesh': ['Agra', 'Lucknow', 'Merrut'],
  Haryana: ['Karnal', 'Panipat'],
  Rajasthan: ['Jaipur', 'Jaiselmer'],
};

// Tipos para autocompletado
export type StateName = keyof typeof STATES;
export type CityName = typeof STATES[StateName][number];

export const VALIDATION_LIMITS = {
  FIRST_NAME_MIN: 1,
  FIRST_NAME_MAX: 50,
  LAST_NAME_MIN: 1,
  LAST_NAME_MAX: 50,
  MOBILE_EXACT: 10,
  EMAIL_MIN: 5,
  EMAIL_MAX: 100,
};
