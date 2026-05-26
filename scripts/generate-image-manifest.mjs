import { readdirSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { extname, join, relative, sep } from 'node:path';

const root = process.cwd();
const publicDir = join(root, 'public');
const outputFile = join(root, 'src', 'data', 'imageManifest.ts');
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

const imageMetadata = {
  'institutional-atrium-handover.jpg': {
    title: 'Institutional Atrium Completion',
    category: 'Wiring',
    location: 'Institutional Campus',
    description: 'Completed atrium electrical readiness with clean lighting support for a public gathering space.',
  },
  'campus-inauguration-team.jpg': {
    title: 'Campus Inauguration Handover',
    category: 'Wiring',
    location: 'Institutional Campus',
    description: 'Project handover moment after coordinated electrical and lighting completion for the campus.',
  },
  'open-air-venue-lighting.jpg': {
    title: 'Open-Air Venue Lighting',
    category: 'Wiring',
    location: 'Hospitality Venue',
    description: 'Warm suspended lighting installed to create a refined evening ambience for an open-air venue.',
  },
  'ceremonial-handover-team.jpg': {
    title: 'Ceremonial Handover Team',
    category: 'Wiring',
    location: 'Project Site',
    description: 'Client-side completion milestone captured after successful electrical project delivery.',
  },
  'retail-led-ceiling-lighting.jpg': {
    title: 'Retail LED Ceiling Lighting',
    category: 'Wiring',
    location: 'Retail Interior',
    description: 'Geometric LED profile lighting and track lights delivered for a premium retail interior.',
  },
  'retail-profile-lighting.jpg': {
    title: 'Retail Profile Lighting',
    category: 'Wiring',
    location: 'Retail Interior',
    description: 'Modern profile lighting planned and installed to enhance product visibility and interior finish.',
  },
  'heaven-inn-backlit-signage.jpg': {
    title: 'Heaven Inn Backlit Signage',
    category: 'Wiring',
    location: 'Hospitality Facade',
    description: 'Backlit signage execution with crisp illumination for strong night-time brand visibility.',
  },
  'contemporary-entrance-canopy-lighting.jpg': {
    title: 'Contemporary Entrance Canopy Lighting',
    category: 'Wiring',
    location: 'Commercial Entrance',
    description: 'Architectural canopy lighting integrated with a clean exterior finish and warm linear accents.',
  },
  'rooftop-hospitality-pendant-lighting.jpg': {
    title: 'Rooftop Hospitality Pendant Lighting',
    category: 'Wiring',
    location: 'Rooftop Venue',
    description: 'Pendant and wall lighting installed to create a polished rooftop hospitality experience.',
  },
  'bar-backlit-shelf-lighting.jpg': {
    title: 'Bar Backlit Shelf Lighting',
    category: 'Wiring',
    location: 'Bar Interior',
    description: 'Layered warm backlighting installed for bottle display shelves and bar ambience.',
  },
  'decorative-display-backlighting.jpg': {
    title: 'Decorative Display Backlighting',
    category: 'Wiring',
    location: 'Hospitality Interior',
    description: 'Focused accent lighting delivered for decorative display features with a premium glow.',
  },
  'office-linear-workstation-lighting.jpg': {
    title: 'Office Linear Workstation Lighting',
    category: 'Wiring',
    location: 'Office Workspace',
    description: 'Suspended linear lights installed for balanced illumination across modern workstations.',
  },
  'office-workstation-lighting-completion.jpg': {
    title: 'Office Workstation Lighting Completion',
    category: 'Wiring',
    location: 'Office Workspace',
    description: 'Completed office lighting layout with clean linear fixtures and organized work zones.',
  },
  'mobile-storage-electrical-room.jpg': {
    title: 'Mobile Storage Electrical Room',
    category: 'Maintenance',
    location: 'Utility Room',
    description: 'Utility room completed with organized service access for compact storage systems.',
  },
  'restaurant-dining-pendant-lighting.jpg': {
    title: 'Restaurant Dining Pendant Lighting',
    category: 'Wiring',
    location: 'Restaurant Interior',
    description: 'Pendant lighting and ceiling coordination delivered for a warm restaurant dining area.',
  },
  'cafe-pendant-ceiling-lighting.jpg': {
    title: 'Cafe Pendant Ceiling Lighting',
    category: 'Wiring',
    location: 'Cafe Interior',
    description: 'Decorative pendant fixtures coordinated with ceiling finishes for a clean cafe ambience.',
  },
  'executive-office-linear-lighting.jpg': {
    title: 'Executive Office Linear Lighting',
    category: 'Wiring',
    location: 'Office Cabin',
    description: 'Linear and pendant lighting installed to support a modern executive workstation setup.',
  },
  'apartment-facade-night-lighting.jpg': {
    title: 'Apartment Facade Night Lighting',
    category: 'Wiring',
    location: 'Residential Apartment',
    description: 'Facade and balcony lighting completed for a bright, premium residential night elevation.',
  },
  'parking-area-handover.jpg': {
    title: 'Parking Area Handover',
    category: 'Maintenance',
    location: 'Commercial Parking',
    description: 'Project completion handover captured after site services were coordinated in the parking level.',
  },
  'hospital-facade-signage-lighting.jpg': {
    title: 'Hospital Facade Signage Lighting',
    category: 'Wiring',
    location: 'Sun Hospital',
    description: 'Exterior signage and facade lighting delivered for clear hospital visibility after dark.',
  },
  'hospital-reception-signage-lighting.jpg': {
    title: 'Hospital Reception Signage Lighting',
    category: 'Wiring',
    location: 'Sun Hospital',
    description: 'Reception signage lighting installed with clean linear ceiling accents and reflective wall finish.',
  },
  'hospital-lobby-handover.jpg': {
    title: 'Hospital Lobby Handover',
    category: 'Wiring',
    location: 'Sun Hospital',
    description: 'Lobby handover moment captured after completion of reception lighting and interior services.',
  },
  'apartment-corridor-ambient-lighting.jpg': {
    title: 'Apartment Corridor Ambient Lighting',
    category: 'Wiring',
    location: 'Residential Apartment',
    description: 'Corridor and planter lighting completed for a warm, premium apartment common area.',
  },
  'apartment-facade-day-completion.jpg': {
    title: 'Apartment Facade Day Completion',
    category: 'Wiring',
    location: 'Residential Apartment',
    description: 'Daytime facade completion showing coordinated balcony downlights and exterior finishing.',
  },
  'hospital-ward-lighting.jpg': {
    title: 'Hospital Ward Lighting',
    category: 'Wiring',
    location: 'Healthcare Facility',
    description: 'Ward lighting completed with bright, even illumination for a clean healthcare environment.',
  },
  'hospital-patient-bay-lighting.jpg': {
    title: 'Hospital Patient Bay Lighting',
    category: 'Wiring',
    location: 'Healthcare Facility',
    description: 'Patient bay lighting and service-area readiness completed for hospital operations.',
  },
  'hospital-lobby-linear-lighting.jpg': {
    title: 'Hospital Lobby Linear Lighting',
    category: 'Wiring',
    location: 'Healthcare Facility',
    description: 'Linear ceiling lighting installed to give the hospital lobby a clean, premium finish.',
  },
  'childrens-play-area-completion.jpg': {
    title: 'Children Play Area Completion',
    category: 'Maintenance',
    location: 'School Campus',
    description: 'Outdoor play area completion documented as part of a wider campus delivery scope.',
  },
  'school-campus-electrical-completion.jpg': {
    title: 'School Campus Electrical Completion',
    category: 'Wiring',
    location: 'Delhi World School',
    description: 'School campus project completed with exterior readiness and coordinated service support.',
  },
  'neon-feature-wall-lighting.jpg': {
    title: 'Neon Feature Wall Lighting',
    category: 'Wiring',
    location: 'Hospitality Interior',
    description: 'Custom neon feature lighting installed on a greenery wall for a vibrant photo backdrop.',
  },
  'sky-bar-lounge-lighting.jpg': {
    title: 'Sky Bar Lounge Lighting',
    category: 'Wiring',
    location: 'Sky Bar Lounge',
    description: 'Bar lounge lighting completed with illuminated shelves, feature walls and ambient ceiling detail.',
  },
  'lounge-ambient-stair-lighting.jpg': {
    title: 'Lounge Ambient Stair Lighting',
    category: 'Wiring',
    location: 'Sky Bar Lounge',
    description: 'Ambient stair and wall lighting installed to shape a warm, dramatic lounge atmosphere.',
  },
  'rooftop-lounge-feature-lighting.jpg': {
    title: 'Rooftop Lounge Feature Lighting',
    category: 'Wiring',
    location: 'Sky Bar Lounge',
    description: 'Feature ceiling and wall lighting delivered for a premium rooftop dining experience.',
  },
  'sky-bar-feature-signage.jpg': {
    title: 'Sky Bar Feature Signage',
    category: 'Wiring',
    location: 'Sky Bar Lounge',
    description: 'Backlit brand signage and greenery wall lighting completed for a standout lounge entrance.',
  },
  'hospital-facade-entry-lighting.jpg': {
    title: 'Hospital Facade Entry Lighting',
    category: 'Wiring',
    location: 'Sun Hospital',
    description: 'Hospital entry facade lighting completed with signage visibility and clean exterior illumination.',
  },
  'vasavi-school-electrical-work.jpg': {
    title: 'Commercial Office Electrical Work',
    category: 'Wiring',
  },
};

function titleFromFile(fileName) {
  return fileName
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function categoryFromRelativePath(relativePath, fallback) {
  const parts = relativePath.split(sep);
  if (parts.length > 1) {
    return titleFromFile(parts[0]);
  }
  return inferCategory(parts[0], fallback);
}

function inferCategory(fileName, fallback) {
  const name = fileName.toLowerCase();

  if (name.includes('solar')) return 'Solar';
  if (name.includes('transformer')) return 'Transformer';
  if (name.includes('panel') || name.includes('meter') || name.includes('db')) return 'Panels';
  if (name.includes('plumbing') || name.includes('pipe') || name.includes('sink') || name.includes('bathroom')) return 'Plumbing';
  if (name.includes('maintenance') || name.includes('amc') || name.includes('service')) return 'Maintenance';
  if (/(^|[-_\s])(lt|ht)([-_\s]|$)/.test(name) || name.includes('approval')) return 'LT/HT';
  if (
    name.includes('lighting') ||
    name.includes('electrical') ||
    name.includes('wiring') ||
    name.includes('chandelier') ||
    name.includes('facade')
  ) {
    return 'Wiring';
  }

  return fallback;
}

function scanImages(relativeFolder, fallbackCategory) {
  const absoluteFolder = join(publicDir, relativeFolder);

  try {
    statSync(absoluteFolder);
  } catch {
    return [];
  }

  const images = [];

  function walk(folder) {
    for (const entry of readdirSync(folder, { withFileTypes: true })) {
      const absolutePath = join(folder, entry.name);

      if (entry.isDirectory()) {
        walk(absolutePath);
        continue;
      }

      if (!imageExtensions.has(extname(entry.name).toLowerCase())) {
        continue;
      }

      const relativePath = relative(absoluteFolder, absolutePath);
      const publicPath = `/${relative(publicDir, absolutePath).split(sep).join('/')}`;

      images.push({
        title: imageMetadata[entry.name]?.title ?? titleFromFile(entry.name),
        category: imageMetadata[entry.name]?.category ?? categoryFromRelativePath(relativePath, fallbackCategory),
        location: imageMetadata[entry.name]?.location,
        description: imageMetadata[entry.name]?.description,
        src: publicPath,
      });
    }
  }

  walk(absoluteFolder);
  return images.sort((a, b) => a.src.localeCompare(b.src));
}

const manifest = {
  completedProjects: scanImages('projects/completed', 'Completed'),
  ongoingProjects: scanImages('projects/ongoing', 'Ongoing'),
  galleryImages: scanImages('gallery', 'Gallery'),
};

mkdirSync(join(root, 'src', 'data'), { recursive: true });

writeFileSync(
  outputFile,
  `export type GeneratedImage = {
  title: string;
  category: string;
  location?: string;
  description?: string;
  src: string;
};

export const completedProjectImages: GeneratedImage[] = ${JSON.stringify(manifest.completedProjects, null, 2)};

export const ongoingProjectImages: GeneratedImage[] = ${JSON.stringify(manifest.ongoingProjects, null, 2)};

export const galleryImages: GeneratedImage[] = ${JSON.stringify(manifest.galleryImages, null, 2)};
`,
  'utf8'
);

console.log(
  `Generated image manifest: ${manifest.completedProjects.length} completed, ${manifest.ongoingProjects.length} ongoing, ${manifest.galleryImages.length} gallery`
);
