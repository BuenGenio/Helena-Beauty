import { publicUrl } from "../utils/publicUrl";

/** Hero filenames under `public/images/hero/` (order matches locale `hero.alts`). */
const HOME_HERO_IMAGE_FILES = [
  "images/hero/massage-spa-stones.jpg",
  "images/hero/massage-therapy-session.jpg",
  "images/hero/massage-facial-relaxation.jpg",
  "images/hero/north-sea-coast-aberdeen.jpg",
  "images/hero/scotland-misty-mountains.jpg",
] as const;

export const HOME_HERO_IMAGE_PATHS = HOME_HERO_IMAGE_FILES.map((p) =>
  publicUrl(p),
) as readonly string[];

export const UNSPLASH_LICENSE_URL = "https://unsplash.com/license";
