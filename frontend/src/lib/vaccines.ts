export const VACCINE_TYPES = [
  { name: "BCG", description: "Tuberculosis" },
  { name: "Hepatitis B", description: "HepB - Birth dose" },
  { name: "Polio (OPV)", description: "Oral Polio Vaccine" },
  { name: "Pentavalent", description: "DPT+HepB+Hib (Dose 1, 2, 3)" },
  { name: "PCV", description: "Pneumococcal Conjugate Vaccine" },
  { name: "Rotavirus", description: "Rotavirus Vaccine" },
  { name: "MR", description: "Measles and Rubella" },
  { name: "Vitamin A", description: "Vitamin A supplementation" },
  { name: "YF", description: "Yellow Fever" },
  { name: "Tetanus", description: "TT/Td - Maternal/Newborn" },
  { name: "IPV", description: "Inactivated Polio Vaccine" },
  { name: " MMR", description: "Measles, Mumps, Rubella" },
] as const;

export type VaccineTypeName = typeof VACCINE_TYPES[number]["name"];

export const getVaccineOptions = () => 
  VACCINE_TYPES.map(v => ({ value: v.name, label: `${v.name} - ${v.description}` }));

export const getVaccineDescription = (name: string) => {
  const vaccine = VACCINE_TYPES.find(v => v.name === name);
  return vaccine?.description || "";
};