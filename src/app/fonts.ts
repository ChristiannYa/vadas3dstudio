import localFont from "next/font/local";
import { Raleway, Poppins, DM_Sans } from "next/font/google";

/*
  display:

  - auto: Use the browser's default font loading strategy
  - block: Briefly hide text (short blocking period) until the font loads
  - fallback: Similar to swap but with a shorter swap period
  - optional: Only use the custom font if it's already cached
*/

export const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const dreamAvenue = localFont({
  src: "../../public/fonts/Dream-Avenue.ttf",
  display: "swap",
});
