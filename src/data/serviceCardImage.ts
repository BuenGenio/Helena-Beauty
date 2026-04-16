import type { Service } from "../types/service";
import { SERVICE_ORDER } from "./serviceMeta";
import { publicUrl } from "../utils/publicUrl";

type ServiceSlug = (typeof SERVICE_ORDER)[number]["slug"];

/**
 * One thumbnail per service (JPEGs in /public/images/services/).
 * Unsplash License — https://unsplash.com/license
 *
 * Source photo IDs (for your records):
 * 1519823551278-64ac92734fb1, 1571019613454-1cb2f99b2d8b, 1600618528240-fb9fc964b853,
 * 1576091160550-2173dba999ef, 1540555700478-4be289fbecef, 1559757175-0eb30cd8c063,
 * 1515377905703-c4788e51af15, 1487412720507-e7ab37603c6f, 1522337360788-8b13dee7a37e,
 * 1570172619644-dfd03ed5d881, 1596755389378-c31d21fd1273.
 */
const CARD_FILE_BY_SLUG: Record<ServiceSlug, string> = {
  "lymphatic-drainage-post-op": "images/services/lymphatic-drainage-post-op.jpg",
  "sport-recovery-massage": "images/services/sport-recovery-massage.jpg",
  "back-problems-massage": "images/services/back-problems-massage.jpg",
  "ems-tens-recovery": "images/services/ems-tens-recovery.jpg",
  "wood-therapy": "images/services/wood-therapy.jpg",
  "tummy-tuck-support": "images/services/tummy-tuck-support.jpg",
  "body-contouring": "images/services/body-contouring.jpg",
  ipl: "images/services/ipl.jpg",
  "laser-hair-removal": "images/services/laser-hair-removal.jpg",
  hydrafacial: "images/services/hydrafacial.jpg",
  microdermabrasion: "images/services/microdermabrasion.jpg",
};

export function serviceCardImageSrc(slug: Service["slug"]): string {
  return publicUrl(CARD_FILE_BY_SLUG[slug as ServiceSlug]);
}
