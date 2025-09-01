// Utility functions for deleting lessons and modules from a course structure
import type {
  CourseProps,
  CourseLesson,
  CourseModule,
} from "@/interfaces/createCourseInterfaces";

/**
 * Remove a lesson from a module in the course
 * @param modules Array of course modules
 * @param moduleIndex Index of the module to modify
 * @param lessonIndex Index of the lesson to remove
 * @returns New array of modules with the lesson removed
 */
export function removeLessonFromModule(
  modules: CourseModule[],
  moduleIndex: number,
  lessonIndex: number
): CourseModule[] {
  return modules.map((mod, idx) => {
    if (idx !== moduleIndex) return mod;
    return {
      ...mod,
      lessons: mod.lessons.filter((_, lIdx) => lIdx !== lessonIndex),
    };
  });
}

/**
 * Remove a module from the course
 * @param modules Array of course modules
 * @param moduleIndex Index of the module to remove
 * @returns New array of modules with the module removed
 */
export function removeModule(
  modules: CourseModule[],
  moduleIndex: number
): CourseModule[] {
  return modules.filter((_, idx) => idx !== moduleIndex);
}
