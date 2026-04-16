/** One slide in the landing hero carousel (local asset + Unsplash terms). */
export interface HeroSlide {
  src: string;
  alt: string;
  /** Short credit line (shown over the image). */
  attribution: string;
  /** Link for the credit (Unsplash license or photographer profile). */
  sourceUrl: string;
  license: string;
}
