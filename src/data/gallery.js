// Gallery data - ready for future API integration (Firebase/Sanity)
// Simply replace this file's exports with API calls when needed

export const gallery = [
  {
    id: 1,
    title: "Residential Plumbing Repair",
    image: "/images/plumbing_1.jpg",
    status: "Completed"
  },
  {
    id: 2,
    title: "Modern Bathroom Plumbing Installation",
    image: "/images/plumbing_2.jpg",
    status: "Running"
  },
  {
    id: 3,
    title: "Electrical Work - Villa Project",
    image: "/project_1.jpg",
    status: "Completed"
  },
  {
    id: 4,
    title: "Apartment Plumbing System Upgrade",
    image: "/images/plumbing_3.jpg",
    status: "Running"
  },
  {
    id: 5,
    title: "Commercial HVAC System Installation",
    image: "/project_2.jpg",
    status: "Completed"
  },
  {
    id: 6,
    title: "Electrical Panel - Office Complex",
    image: "/project_3.jpg",
    status: "Completed"
  },
  {
    id: 7,
    title: "Bungalow Water Supply System",
    image: "/images/plumbing_4.jpg",
    status: "Running"
  },
  {
    id: 8,
    title: "Smart Building Wiring - Penthouse",
    image: "/project_2.jpg",
    status: "Completed"
  }
];

// For future API integration, create a service like:
// export const fetchGallery = async () => {
//   const response = await fetch('https://your-api.com/gallery');
//   return response.json();
// }
