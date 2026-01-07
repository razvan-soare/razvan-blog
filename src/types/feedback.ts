export type FeedbackCategory =
  | 'design'
  | 'functionality'
  | 'content'
  | 'accessibility'
  | 'character-animations'
  | 'other';

export interface FeedbackRatings {
  overallDesign: number;
  characterInteractions: number;
  navigation: number;
  contentPresentation: number;
  mobileResponsiveness: number;
}

export interface FeedbackEntry {
  id: string;
  category: FeedbackCategory;
  ratings: FeedbackRatings;
  comments: string;
  bugsOrIssues: string;
  contactEmail?: string;
  contactName?: string;
  page?: string;
  userAgent?: string;
  timestamp: number;
}

export interface FeedbackFormData {
  category: FeedbackCategory;
  ratings: FeedbackRatings;
  comments: string;
  bugsOrIssues: string;
  contactEmail: string;
  contactName: string;
}

export const FEEDBACK_CATEGORIES: { value: FeedbackCategory; label: string }[] = [
  { value: 'design', label: 'Design & Visual Appeal' },
  { value: 'functionality', label: 'Functionality & Features' },
  { value: 'content', label: 'Content Quality' },
  { value: 'accessibility', label: 'Accessibility' },
  { value: 'character-animations', label: 'Character Animations' },
  { value: 'other', label: 'Other' },
];

export const RATING_ASPECTS: { key: keyof FeedbackRatings; label: string; description: string }[] = [
  {
    key: 'overallDesign',
    label: 'Overall Design',
    description: 'Visual appeal, color scheme, and aesthetics',
  },
  {
    key: 'characterInteractions',
    label: 'Character Interactions',
    description: 'Stick figure, waving, thought bubbles',
  },
  {
    key: 'navigation',
    label: 'Navigation & Usability',
    description: 'Ease of use and finding content',
  },
  {
    key: 'contentPresentation',
    label: 'Content Presentation',
    description: 'Projects and blog content layout',
  },
  {
    key: 'mobileResponsiveness',
    label: 'Mobile Responsiveness',
    description: 'Experience on mobile devices',
  },
];

export const DEFAULT_RATINGS: FeedbackRatings = {
  overallDesign: 0,
  characterInteractions: 0,
  navigation: 0,
  contentPresentation: 0,
  mobileResponsiveness: 0,
};

export const DEFAULT_FORM_DATA: FeedbackFormData = {
  category: 'design',
  ratings: DEFAULT_RATINGS,
  comments: '',
  bugsOrIssues: '',
  contactEmail: '',
  contactName: '',
};
