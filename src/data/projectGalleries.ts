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
    slug: 'sun-speciality-hospital',
    title: 'Sun Speciality Hospital',
    category: 'Healthcare Project',
    location: 'Healthcare Facility',
    summary: 'Complete electrical installation including facade, reception, lobby, ward and patient-bay lighting systems for Sun Speciality Hospital.',
    coverKeyword: 'hospital-facade-entry',
    keywords: ['hospital-facade', 'hospital-lobby', 'hospital-patient', 'hospital-reception', 'hospital-ward'],
  },
  {
    slug: 'cliff-hive-restaurant',
    title: 'Cliff Hive Restaurant',
    category: 'Hospitality Project',
    location: 'Hospitality Venue',
    summary: 'Comprehensive lighting design and installation for dining areas, rooftop, bar and ambient venue lighting at Cliff Hive Restaurant.',
    coverKeyword: 'sky-bar-lounge',
    keywords: ['sky-bar', 'rooftop', 'bar-', 'restaurant', 'cafe', 'lounge', 'neon', 'open-air', 'heaven-inn', 'hospitality', 'banquet', 'event-canopy'],
  },
  {
    slug: 'dcc-bank',
    title: 'DCC Bank',
    category: 'Commercial Project',
    location: 'Banking Facility',
    summary: 'Professional electrical systems, office lighting, security infrastructure and facade work completed for DCC Bank premises.',
    coverKeyword: 'office-workstation',
    keywords: ['office', 'retail', 'building', 'facade-window', 'executive', 'contemporary-entrance', 'decorative-display'],
  },
  {
    slug: 'delhi-world-school',
    title: 'Delhi World School',
    category: 'Institutional Project',
    location: 'Educational Campus',
    summary: 'Complete electrical infrastructure including classroom lighting, campus facilities, auditorium and safety systems for Delhi World School.',
    coverKeyword: 'school-campus',
    keywords: ['campus', 'atrium', 'school', 'institutional', 'children', 'parking', 'aerial', 'ceremonial'],
  },
  {
    slug: 'shri-sai-dollars-apartment',
    title: 'Shri Sai Dollars Apartment',
    category: 'Residential Project',
    location: 'Residential Complex',
    summary: 'Full electrical installation for apartment units including facade lighting, corridor systems, landscape lighting and common area electrical work.',
    coverKeyword: 'apartment-facade-night',
    keywords: ['apartment', 'landscape', 'garden', 'palm', 'resort-entry', 'temple'],
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
