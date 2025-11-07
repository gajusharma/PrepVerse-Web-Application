export interface Mentor {
  _id?: string;
  name: string;
  title: string;
  experience: string;
  image: string;
  bio: string;
  socials: {
    linkedin?: string;
    twitter?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}
