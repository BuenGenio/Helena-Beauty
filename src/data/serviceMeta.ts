import type { ServiceCategory } from "../types/service";

export const SERVICE_ORDER: { slug: string; category: ServiceCategory }[] = [
  { slug: "lymphatic-drainage-post-op", category: "massage" },
  { slug: "sport-recovery-massage", category: "massage" },
  { slug: "back-problems-massage", category: "massage" },
  { slug: "ems-tens-recovery", category: "massage" },
  { slug: "wood-therapy", category: "body" },
  { slug: "tummy-tuck-support", category: "body" },
  { slug: "body-contouring", category: "body" },
  { slug: "ipl", category: "skin" },
  { slug: "laser-hair-removal", category: "skin" },
  { slug: "hydrafacial", category: "skin" },
  { slug: "microdermabrasion", category: "skin" },
];

export const VALID_SERVICE_SLUGS = new Set(
  SERVICE_ORDER.map((s) => s.slug),
);
