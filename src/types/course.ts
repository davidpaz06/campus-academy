import type { User } from "./user";

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: User;
  thumbnail?: string;
  price: number;
  modules: Module[];
  createdAt: string;
  updatedAt: string;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  type: "video" | "reading";
  content: VideoContent | ReadingContent;
  order: number;
  duration?: number;
}

export interface VideoContent {
  videoUrl: string;
  transcript?: string;
}

export interface ReadingContent {
  content: string;
  estimatedReadTime: number;
}
