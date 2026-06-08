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
  {
    slug: 'heaven-inn-bar-lounge',
    title: 'Heaven Inn Bar Lounge',
    category: 'Hospitality Project',
    location: 'Hospitality Venue',
    summary: 'Premium bar and lounge lighting design featuring backlit signage, ambient stair lighting, neon feature walls and shelf accent lighting for an upscale hospitality experience.',
    coverKeyword: 'heaven-inn-backlit',
    keywords: ['heaven-inn', 'bar', 'backlit', 'shelf', 'neon', 'lounge', 'ambient', 'feature'],
  },
  {
    slug: 'car-nest',
    title: 'Car Nest',
    category: 'Commercial Project',
    location: 'Shivamogga',
    summary: 'Service centre and showroom exterior signage electrical work including facade illumination and signage integration for Car Nest.',
    coverKeyword: 'car-nest',
    keywords: ['car-nest', 'car-nest-sign', 'car-nest-facade', 'car', 'showroom', 'signage'],
  },
  {
    slug: 'farmhouse-changiri',
    title: 'Farmhouse, Changiri',
    category: 'Residential Project',
    location: 'Changiri',
    summary: 'Rural farmhouse project featuring ambient and architectural lighting for a warm, natural finish.',
    coverKeyword: 'farmhouse-changiri',
    keywords: ['farmhouse', 'changiri', 'farmhouse-changiri', 'wooden', 'cabin', 'night'],
  },
  {
    slug: 'nandini-milk-booth',
    title: 'Nandini Milk Booth',
    category: 'Retail Project',
    location: 'Local Retail',
    summary: 'Small retail milk booth electrical and signage project for Nandini Milk Booth.',
    coverKeyword: 'nandini',
    keywords: ['nandini', 'milk-booth', 'nandini-milk-booth', 'signage', 'retail'],
  },
  {
    slug: 'moira-goa',
    title: 'Moira, Goa',
    category: 'Residential / Hospitality Project',
    location: 'Moira, Goa',
    summary: 'Coastal villa and hospitality project in Moira, Goa with exterior and landscape electrical finishes.',
    coverKeyword: 'moira-goa',
    keywords: ['moira', 'goa', 'moira-goa', 'villa', 'resort', 'coastal'],
  },
  {
    slug: 'jayanagara-shimoga',
    title: 'Jayanagara, Shimoga',
    category: 'Residential Project',
    location: 'Jayanagara, Shimoga',
    summary: 'Residential building and apartment facade electrical completion in Jayanagara, Shimoga.',
    coverKeyword: 'jayanagara-shimoga',
    keywords: ['jayanagara', 'shimoga', 'jayanagara-shimoga', 'building', 'residency', 'facade'],
  },
  {
    slug: 'architect-office-balraj-uras',
    title: 'Architect Office, Balraj Uras Road',
    category: 'Commercial Project',
    location: 'Balraj Uras Road, Shimoga',
    summary: 'Modern architect office entrance with premium ceiling lighting and decorative accent features for professional workspace.',
    coverKeyword: 'architect-office',
    keywords: ['architect', 'office', 'balraj', 'uras', 'myriad', 'lighting', 'entrance'],
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
