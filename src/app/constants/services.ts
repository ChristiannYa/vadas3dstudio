import { Service, Industries } from "../definitions";

export const servicesList: Service[] = [
  {
    id: 1,
    category: [
      { text: "Architectural", highlight: true },
      { text: " Visualization", highlight: false },
    ],
    description:
      "Helping architects, developers, and real estate professionals showcase their spaces with compelling visuals.",
    items: [
      {
        id: 1,
        title: "Interior Rendering",
        description:
          "Stylish, fully furnished room renders ideal for marketing and pre-sale visuals.",
        details: ["Styles: Modern, minimalist, boho, industrial"],
      },
      {
        id: 2,
        title: "Exterior Rendering",
        description:
          "Stunning building visuals with custom landscaping, lighting, and weather options.",
        details: ["Includes: Day/night scenes, aerial views"],
      },
      {
        id: 3,
        title: "2D & 3D Floor Plan Design",
        description:
          "Communicate space clearly with accurate and visually compelling plans.",
        details: [
          "Includes: Color-coded or monochrome, furnished or unfurnished",
        ],
      },
    ],
  },
  {
    id: 2,
    category: [
      { text: "3D Product ", highlight: true },
      { text: "Visualization", highlight: false },
    ],
    description: "Ideal for product designers, startups, and eCommerce brands.",
    items: [
      {
        id: 1,
        title: "3D Product Modeling",
        description:
          "High-quality digital models from sketches, CAD files, or references. Delivered in your preferred formats.",
      },
      {
        id: 2,
        title: "Product Rendering",
        description:
          "Showcase your product in the best light with cinematic-quality lighting and camera angles.",
        details: ["Includes: Studio scenes, lifestyle mockups, close-ups"],
      },
      {
        id: 3,
        title: "White Background Product Shots",
        description:
          "Perfect for eCommerce platforms (Amazon, Shopify, etc.). Clean, distraction-free renders.",
        details: ["Options: Transparent background, drop shadow, 360° spin"],
      },
    ],
  },
];

export const IndustriesServed: Industries[] = [
  {
    id: 1,
    industry: "Real Estate",
    description:
      "Complete digital marketing packages: renders, floor plans, and virtual tours. Furniture & Decor",
  },
  {
    id: 2,
    industry: "Interior Designers",
    description:
      "Rendered sets, configuration visuals, exploded views for manuals or marketing.",
  },
];
