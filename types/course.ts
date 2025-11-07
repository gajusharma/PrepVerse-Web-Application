export interface Course {
  _id?: string;
  title: string;
  slug: string;
  category: string;
  level: string;
  duration: string;
  price: number;
  image: string;
  syllabus: string[];
  instructor: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}
