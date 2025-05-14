import { PricingGuide } from "@/app/definitions";

export const pricingGuideList: PricingGuide[] = [
  {
    id: 1,
    title: "Exterior Rendering",
    description:
      "Perfect for showcasing the beauty and design of residential or commercial properties.",
    features: [
      "High resolution 3D exterior render",
      "One angle/view of the building",
      "Basic landscaping (grass, trees, etc.)",
      "Basic lighting (sun, moon, etc.)",
    ],
    price: "$200",
  },
  {
    id: 2,
    title: "Interior Rendering",
    description:
      "Ideal for visualizing living rooms, kitchens, bedrooms, offices, or any other interior space.",
    features: [
      "High resolution 3D render",
      "Fully furnished scene based on your design/materials",
      "Customizable lighting and materials",
      "Customizable furniture and accessories",
    ],
    price: "$400",
  },
  {
    id: 3,
    title: "3D Floor Plan",
    description:
      "Great for real estate listings, presentations, or architectural planning",
    features: [
      "High resolution 3D floor plan",
      "Customizable furniture and accessories",
      "Customizable lighting and materials",
      "Interactive elements and animations",
    ],
    price: "$600",
  },
  {
    id: 4,
    title: "3D Walkthrough",
    description:
      "A comprehensive 3D walkthrough of your property, complete with animations and interactive elements.",
    features: [
      "High resolution 3D walkthrough",
      "Interactive elements and animations",
      "Customizable lighting and materials",
      "Customizable furniture and accessories",
    ],
    price: "$600",
  },
];
