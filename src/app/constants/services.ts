import { Service } from "../definitions";

export const servicesList: Service[] = [
  {
    category: "Architectural Visualization",
    description:
      "Helping architects, developers, and real estate professionals present their spaces with clarity and beauty.",
    items: [
      {
        title: "Interior Rendering",
        description:
          "Stylish, fully furnished room renders ideal for marketing and pre-sale visuals.",
        details: ["Styles: Modern, minimalist, boho, industrial"],
      },
      {
        title: "Exterior Rendering",
        description:
          "Stunning building visuals with custom landscaping, lighting, and weather options.",
        details: ["Includes: Day/night scenes, aerial views"],
      },
      {
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
    category: "3D Product Visualization",
    description: "Ideal for product designers, startups, and eCommerce brands.",
    items: [
      {
        title: "3D Product Modeling",
        description:
          "High-quality digital models from sketches, CAD files, or references. Delivered in your preferred formats.",
      },
      {
        title: "Product Rendering",
        description:
          "Showcase your product in the best light with cinematic-quality lighting and camera angles.",
        details: ["Includes: Studio scenes, lifestyle mockups, close-ups"],
      },
      {
        title: "White Background Product Shots",
        description:
          "Perfect for eCommerce platforms (Amazon, Shopify, etc.). Clean, distraction-free renders.",
        details: ["Options: Transparent background, drop shadow, 360° spin"],
      },
    ],
  },
];
