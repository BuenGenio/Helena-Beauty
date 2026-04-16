export type ServiceCategory = "massage" | "body" | "skin";

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  category: ServiceCategory;
  intro: string;
  benefits: string[];
  idealFor: string[];
  sessionNote?: string;
}
