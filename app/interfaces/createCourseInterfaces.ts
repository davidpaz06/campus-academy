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
  questions?: string[];
  duration?: number;
}

export interface CourseProps {
  setCourse: React.Dispatch<React.SetStateAction<Course>>;
  course: Course;
  moduleIndex?: number;
  lessonIndex?: number;
}



export interface CourseSkills {
  skills: string[];
  setSkills: (skills: string[]) => void;
}

export interface LearningComponent {
  componentName: string;
  componentSummary: string;
  componentTypeId: number;
  componentDescription: string;
  contextBody: string;
  position: number;
  realParentId: string;
}

export interface CreateCourseDto {
  courseName: string;
  courseSummary: string;
  courseDescription: string;
  institutionId: string;
  courseImageId: string;
  components: LearningComponent[];
}
