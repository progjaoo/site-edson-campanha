import { Archivo } from "next/font/google";

const colinhaNameFont = Archivo({
  subsets: ["latin"],
  display: "swap",
  weight: "variable",
  style: "italic",
  axes: ["wdth"],
});

export const colinhaNameFontClassName = colinhaNameFont.className;
