// import localFont from "next/font/local";

import { Manrope, DM_Serif_Text } from "next/font/google";

// const geistSans = localFont({
//   src: "../../public/fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "../../public/fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
});

const dmSerifText = DM_Serif_Text({
  subsets: ["latin"],
  variable: "--font-dm-serif-text",
  weight: ["400"],
});

export { manrope, dmSerifText };
