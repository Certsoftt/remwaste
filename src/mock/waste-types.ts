export type WasteType = {
  id: string;
  icon: string;
  title: string;
  description: string;
  restrictions?: string[];
};

export const wasteTypes: WasteType[] = [
  {
    id: "construction",
    icon: "building",
    title: "Construction Waste",
    description: "Building materials and renovation debris.",
    restrictions: ["No hazardous materials", "No asbestos"],
  },
  {
    id: "household",
    icon: "home",
    title: "Household Waste",
    description: "General household items and furniture.",
    restrictions: ["No electronics", "No chemicals"],
  },
  {
    id: "garden",
    icon: "leaf",
    title: "Garden Waste",
    description: "Green waste and landscaping materials",
    restrictions: ["No treated wood", "No soil"],
  },
  {
    id: "commercial",
    icon: "shop",
    title: "Commercial Waste",
    description: "Business and office clearance",
    restrictions: ["No confidential documents", "No hazardous waste"],
  },
];
