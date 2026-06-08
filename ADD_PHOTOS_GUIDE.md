# How to Add More Project Photos

## Quick Overview
Your photo system is **automatic keyword-based**. Photos are matched to projects based on keywords in filenames and titles. No manual linking needed!

---

## Step 1: Add Your Photo Files

**Where to place photos:**
```
public/projects/completed/
```

**File naming format:**
- Use lowercase, hyphen-separated names
- Example: `hospital-lobby-lighting.jpg`, `restaurant-rooftop-seating.jpg`

**Supported formats:** JPG, PNG, WebP

---

## Step 2: Register Photos in imageManifest.ts

**File location:**
```
src/data/imageManifest.ts
```

**Add your photo entry:**
```typescript
{
  "title": "Project Name - Specific Location/Phase",
  "category": "Wiring",  // or: Solar, Panels, Maintenance, LT/HT, Transformer
  "location": "Project Location",  // optional
  "description": "What this photo shows",  // optional
  "src": "/projects/completed/your-photo-filename.jpg"
}
```

**Example entries:**
```typescript
{
  "title": "Sky Bar Lounge Ambient Setup",
  "category": "Wiring",
  "location": "Cliff Hive Restaurant",
  "description": "Ambient lighting and bar counter electrical setup.",
  "src": "/projects/completed/sky-bar-lounge-ambient.jpg"
},
{
  "title": "Hospital Patient Room Lighting",
  "category": "Wiring",
  "location": "Healthcare Facility",
  "description": "Patient bay lighting and electrical fixtures installation.",
  "src": "/projects/completed/hospital-patient-room-lighting.jpg"
}
```

---

## Step 3: Link Photos to Projects

**File location:**
```
src/data/projectGalleries.ts
```

**Add keywords to match your project:**
```typescript
{
  slug: 'your-project-slug',
  title: 'Project Title',
  category: 'Project Type',
  location: 'Project Location',
  summary: 'Project description',
  coverKeyword: 'primary-keyword',  // For the featured image
  keywords: ['keyword1', 'keyword-2', 'keyword-3']  // Photo matching keywords
}
```

**Example - Cliff Hive Restaurant:**
```typescript
{
  slug: 'cliff-hive-restaurant',
  title: 'Cliff Hive Restaurant',
  category: 'Hospitality Project',
  location: 'Hospitality Venue',
  summary: 'Comprehensive lighting design for dining areas, rooftop, bar and venue lighting.',
  coverKeyword: 'sky-bar-lounge',  // Shows this as featured image
  keywords: ['sky-bar', 'rooftop', 'bar-', 'restaurant', 'cafe', 'lounge', 'neon']
}
```

**How it works:**
- The system searches `imageManifest.ts` for matching titles/filenames
- Any photo with a matching keyword gets linked to the project
- The `coverKeyword` becomes the featured image on the card
- All other matching photos go into the Gallery section

---

## Step 4: Regenerate Image Manifest

**Run this command after adding photos:**
```bash
npm run dev
```

The system automatically scans and regenerates the image manifest! You'll see:
```
Generated image manifest: 53 completed, 4 ongoing, 65 gallery
```

---

## Real Example: Adding Hospital Photos

### 1️⃣ Upload photos to `public/projects/completed/`
- `hospital-facade-entry.jpg`
- `hospital-lobby-reception.jpg`
- `hospital-patient-room.jpg`
- `hospital-ward-lighting.jpg`

### 2️⃣ Add to `src/data/imageManifest.ts`
```typescript
{
  "title": "Hospital Facade Entry",
  "category": "Wiring",
  "location": "Healthcare Facility",
  "description": "Main entrance facade lighting installation.",
  "src": "/projects/completed/hospital-facade-entry.jpg"
},
{
  "title": "Hospital Lobby Reception Area",
  "category": "Wiring",
  "location": "Healthcare Facility",
  "description": "Reception area lighting and electrical finishing.",
  "src": "/projects/completed/hospital-lobby-reception.jpg"
},
{
  "title": "Hospital Patient Ward Lighting",
  "category": "Wiring",
  "location": "Healthcare Facility",
  "description": "Ward lighting system for patient comfort.",
  "src": "/projects/completed/hospital-patient-room.jpg"
},
{
  "title": "Hospital Ward Electrical Panel",
  "category": "Wiring",
  "location": "Healthcare Facility",
  "description": "Ward electrical panel and distribution setup.",
  "src": "/projects/completed/hospital-ward-lighting.jpg"
}
```

### 3️⃣ Link to project in `src/data/projectGalleries.ts`
```typescript
{
  slug: 'sun-speciality-hospital',
  title: 'Sun Speciality Hospital',
  category: 'Healthcare Project',
  location: 'Healthcare Facility',
  summary: 'Complete electrical installation for hospital including facade, reception, ward and patient lighting.',
  coverKeyword: 'hospital-facade-entry',
  keywords: ['hospital-facade', 'hospital-lobby', 'hospital-patient', 'hospital-ward', 'hospital-reception']
}
```

### 4️⃣ Run dev server
```bash
npm run dev
```

✅ **Done!** All hospital photos now appear in:
- **Featured image** → `hospital-facade-entry.jpg` on the Completed Projects card
- **Gallery** → All 4 photos show in the full Gallery section
- **Project detail** → Would show all matching photos if user clicked (you removed this feature)

---

## Keyword Matching Rules

**Matching is smart:**
- ✅ `hospital-facade-entry` matches keyword `hospital-facade`
- ✅ Photo title `"Hospital Patient Room"` matches keyword `hospital-patient`
- ✅ Case-insensitive matching
- ✅ Partial word matching works

**Example keywords that work:**
```typescript
keywords: ['restaurant', 'bar-', 'sky-bar', 'lounge', 'neon']
// Matches:
// - "Sky Bar Lounge Setup"
// - "Bar Counter Lighting"  
// - "Neon Feature Wall"
// - "Restaurant Reception"
```

---

## Current Projects & Their Keywords

### Completed Projects Using This System:
1. **Sun Speciality Hospital** → `hospital-*`
2. **Cliff Hive Restaurant** → `sky-bar`, `rooftop`, `bar-`, `restaurant`, `lounge`
3. **DCC Bank** → `office`, `retail`, `building`, `facade-window`, `executive`
4. **Delhi World School** → `campus`, `atrium`, `school`, `children`, `parking`
5. **Shri Sai Dollars Apartment** → `apartment`, `landscape`, `garden`, `resort-entry`
6. **Heaven Inn Bar Lounge** → `heaven-inn`, `bar`, `backlit`, `shelf`, `neon`, `lounge`

---

## Checklist for Adding Photos

- [ ] Photo file added to `public/projects/completed/`
- [ ] Photo registered in `src/data/imageManifest.ts`
- [ ] Keywords added/updated in `src/data/projectGalleries.ts`
- [ ] Run `npm run dev` to regenerate manifest
- [ ] Check http://localhost:5173/gallery to verify photos appear
- [ ] Featured image correctly set via `coverKeyword`

---

## Pro Tips

✅ **Use consistent naming** → Easier to remember keywords
✅ **Multiple keywords** → One photo can match multiple projects
✅ **Update cover image** → Just change the `coverKeyword`
✅ **Add descriptions** → Appears in Gallery when photos are viewed
✅ **Organize by category** → Use Wiring, Solar, Panels, Maintenance, LT/HT, Transformer

---

## Need to Remove Photos?

Just delete the entry from `imageManifest.ts` and run `npm run dev`. The photo file can stay in `public/` but won't appear in any galleries.
