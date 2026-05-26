import { completedProjectImages, type GeneratedImage } from './imageManifest';

export type CompletedProjectGallery = {
  slug: string;
  title: string;
  category: string;
  location: string;
  summary: string;
  coverImage: string;
  photos: GeneratedImage[];
};

type ProjectDefinition = Omit<CompletedProjectGallery, 'coverImage' | 'photos'> & {
  coverKeyword: string;
  keywords: string[];
};

const projectDefinitions: ProjectDefinition[] = [
  {
    slug: 'sun-hospital-healthcare',
    title: 'Sun Hospital Healthcare Work',
    category: 'Healthcare Project',
    location: 'Healthcare Facility',
    summary: 'Facade, reception, lobby, ward and patient-bay lighting work grouped into one clean healthcare project gallery.',
    coverKeyword: 'hospital-facade-entry',
    keywords: ['hospital-facade', 'hospital-lobby', 'hospital-patient', 'hospital-reception', 'hospital-ward'],
  },
  {
    slug: 'sky-bar-hospitality',
    title: 'Sky Bar & Hospitality Lighting',
    category: 'Hospitality Project',
    location: 'Hospitality Venues',
    summary: 'Bar, rooftop, lounge, restaurant, cafe and venue lighting references organized as one hospitality project set.',
    coverKeyword: 'sky-bar-lounge',
    keywords: ['sky-bar', 'rooftop', 'bar-', 'restaurant', 'cafe', 'lounge', 'neon', 'open-air', 'heaven-inn', 'hospitality', 'banquet', 'event-canopy'],
  },
  {
    slug: 'commercial-office-retail',
    title: 'Commercial Office & Retail Works',
    category: 'Commercial Project',
    location: 'Office and Retail Sites',
    summary: 'Office lighting, retail profile lighting, facade lighting and commercial completion photos in one focused gallery.',
    coverKeyword: 'office-workstation',
    keywords: ['office', 'retail', 'building', 'facade-window', 'executive', 'contemporary-entrance', 'decorative-display'],
  },
  {
    slug: 'institutional-campus',
    title: 'Institutional Campus Electrical Work',
    category: 'Institutional Project',
    location: 'Campus Sites',
    summary: 'Campus, atrium, school and handover photos grouped for easier browsing without loading every completed image at once.',
    coverKeyword: 'school-campus',
    keywords: ['campus', 'atrium', 'school', 'institutional', 'children', 'parking', 'aerial', 'ceremonial'],
  },
  {
    slug: 'residential-landscape-lighting',
    title: 'Residential & Landscape Lighting',
    category: 'Residential Project',
    location: 'Residential and Landscape Areas',
    summary: 'Apartment facade, corridor, landscape, garden and feature-lighting photos arranged as a dedicated residential gallery.',
    coverKeyword: 'apartment-facade-night',
    keywords: ['apartment', 'landscape', 'garden', 'palm', 'resort-entry', 'temple'],
  },
  {
    slug: 'transformer-panel-works',
    title: 'Transformer & Panel Works',
    category: 'Power Infrastructure',
    location: 'Power and Utility Sites',
    summary: 'Transformer lifting, yard installation, panel delivery and utility-room work grouped into a technical project gallery.',
    coverKeyword: 'transformer-yard',
    keywords: ['transformer', 'panel', 'mobile-storage'],
  },
];

function normalize(value: string) {
  return value.toLowerCase();
}

function matchesKeyword(image: GeneratedImage, keyword: string) {
  const haystack = normalize(`${image.title} ${image.category} ${image.location ?? ''} ${image.src}`);
  return haystack.includes(normalize(keyword));
}

function buildProject(definition: ProjectDefinition): CompletedProjectGallery {
  const photos = completedProjectImages.filter((image) =>
    definition.keywords.some((keyword) => matchesKeyword(image, keyword))
  );
  const cover =
    photos.find((image) => matchesKeyword(image, definition.coverKeyword)) ??
    photos[0] ??
    completedProjectImages[0];

  return {
    slug: definition.slug,
    title: definition.title,
    category: definition.category,
    location: definition.location,
    summary: definition.summary,
    coverImage: cover?.src ?? '/project_1.jpg',
    photos,
  };
}

export const completedProjectGalleries = projectDefinitions
  .map(buildProject)
  .filter((project) => project.photos.length > 0);

export function getCompletedProjectGallery(slug: string) {
  return completedProjectGalleries.find((project) => project.slug === slug);
}
