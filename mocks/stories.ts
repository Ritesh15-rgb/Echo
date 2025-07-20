export interface Story {
  id: string;
  title: string;
  duration: string;
  author: string;
  imageUrl: string;
  category: string;
}

const stories: Story[] = [
  {
    id: "1",
    title: "The Lost City of Atlantis",
    duration: "15 min",
    author: "Echo AI",
    imageUrl: "https://images.unsplash.com/photo-1682686580391-615b1f28e6d0?q=80&w=1170&auto=format&fit=crop",
    category: "Adventure",
  },
  {
    id: "2",
    title: "Whispers in the Dark Forest",
    duration: "12 min",
    author: "Echo AI",
    imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1170&auto=format&fit=crop",
    category: "Mystery",
  },
  {
    id: "3",
    title: "Journey to the Stars",
    duration: "18 min",
    author: "Echo AI",
    imageUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1222&auto=format&fit=crop",
    category: "Sci-Fi",
  },
  {
    id: "4",
    title: "The Enchanted Kingdom",
    duration: "20 min",
    author: "Echo AI",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1169&auto=format&fit=crop",
    category: "Fantasy",
  },
  {
    id: "5",
    title: "Secrets of the Ancient Tomb",
    duration: "14 min",
    author: "Echo AI",
    imageUrl: "https://images.unsplash.com/photo-1544979590-37e9b47eb705?q=80&w=1170&auto=format&fit=crop",
    category: "Adventure",
  },
  {
    id: "6",
    title: "The Haunted Mansion",
    duration: "16 min",
    author: "Echo AI",
    imageUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1165&auto=format&fit=crop",
    category: "Horror",
  },
  {
    id: "7",
    title: "Love Beyond Time",
    duration: "22 min",
    author: "Echo AI",
    imageUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1287&auto=format&fit=crop",
    category: "Romance",
  },
  {
    id: "8",
    title: "The Detective's Last Case",
    duration: "25 min",
    author: "Echo AI",
    imageUrl: "https://images.unsplash.com/photo-1453873623425-04e3561289aa?q=80&w=1170&auto=format&fit=crop",
    category: "Mystery",
  },
];

export const categories = [
  "All",
  "Adventure",
  "Mystery",
  "Sci-Fi",
  "Fantasy",
  "Horror",
  "Romance",
];

export default stories;