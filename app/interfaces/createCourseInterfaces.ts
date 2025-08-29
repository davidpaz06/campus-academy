export interface Course {
  id: string;
  info: CourseInfo;
  modules: CourseModule[];
}

export interface CourseInfo {
  name: string;
  instructor: string;
  about: string;
  description: string;
  skills: string[];
}

export interface CourseModule {
  title: string;
  lessons: CourseLesson[];
}

export interface CourseLesson {
  title: string;
  type: string;
  file: string;
}
