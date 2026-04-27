// Gallery data - ready for future API integration (Firebase/Sanity)
// Simply replace this file's exports with API calls when needed

export const gallery = [
  {
    id: 1,
    title: "Electrical Work - Villa Project",
    image: "/project_1.jpg",
    status: "Completed"
  },
  {
    id: 2,
    title: "Plumbing Installation - Apartment",
    image: "/project_2.jpg",
    status: "Running"
  },
  {
    id: 3,
    title: "HVAC System - Commercial Building",
    image: "/project_3.jpg",
    status: "Completed"
  },
  {
    id: 4,
    title: "Electrical Panel - Office Complex",
    image: "/project_1.jpg",
    status: "Completed"
  },
  {
    id: 5,
    title: "Water Supply System - Bungalow",
    image: "/project_2.jpg",
    status: "Running"
  },
  {
    id: 6,
    title: "Smart Building Wiring - Penthouse",
    image: "/project_3.jpg",
    status: "Completed"
  }
];

// For future API integration, create a service like:
// export const fetchGallery = async () => {
//   const response = await fetch('https://your-api.com/gallery');
//   return response.json();
// }