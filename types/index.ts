export interface Link {
  label: string;
  href: string;
}

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  url: string;
  domain: string;
  image: ImageAsset;
}

export interface Stat {
  value: string;
  label: string;
}

export interface MessageShot extends ImageAsset {
  id: number;
}

export interface ComparisonRow {
  id: string;
  feature: string;
  them: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  isHighlighted: boolean;
  /** The build shown above the price, plus the subpages whose windows stack behind it. */
  preview: { projectId: string; subpages: string[] };
}

export interface ProcessStep {
  id: string;
  when: string;
  title: string;
  description: string;
  /** Shown in the address bar of the window that illustrates this step. */
  domain: string;
}

export interface FaqGroup {
  name: string;
  items: FaqItem[];
}

export interface FaqItem {
  question: string;
  answer: string;
}
