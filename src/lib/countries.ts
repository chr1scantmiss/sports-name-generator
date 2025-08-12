// List of countries with regions so the generator can pick the right names
export interface Country {
  name: string;
  region: "North America" | "Europe" | "Asia" | "Africa" | "South America" | "Oceania";
}

export const COUNTRIES: Country[] = [
  // North America
  { name: "United States", region: "North America" },
  { name: "Canada", region: "North America" },

  // Europe
  { name: "France", region: "Europe" },
  { name: "Spain", region: "Europe" },
  { name: "Germany", region: "Europe" },
  { name: "Italy", region: "Europe" },
  { name: "Russia", region: "Europe" },

  // Asia
  { name: "Japan", region: "Asia" },
  { name: "China", region: "Asia" },

  // Africa
  { name: "Nigeria", region: "Africa" },

  // South America
  { name: "Brazil", region: "South America" },

  // Oceania
  { name: "Australia", region: "Oceania" }
];

// Helper to get all countries in a region
export const getCountriesByRegion = (region: Country["region"]) => {
  return COUNTRIES.filter(country => country.region === region);
};

// Helper to get a random country
export const getRandomCountry = () => {
  return COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
};
