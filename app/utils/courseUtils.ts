// Utilidad para leer el curso desde localStorage
export function getCourseFromLocalStorage(emptyCourse: any): any {
  try {
    const stored = localStorage.getItem("courseDraft");
    if (stored) {
      const parsed = JSON.parse(stored);
      // Validar estructura y asegurar al menos un módulo
      if (
        parsed &&
        typeof parsed === "object" &&
        parsed.info &&
        typeof parsed.info === "object" &&
        Array.isArray(parsed.modules)
      ) {
        if (parsed.modules.length === 0) {
          parsed.modules = [
            {
              title: "> Click to edit <",
              lessons: [],
            },
          ];
        }
        return parsed;
      }
    }
  } catch (e) {
    // ignorar errores de parseo
  }
  return emptyCourse;
}

// Utilidad para guardar el curso en localStorage
export function saveCourseToLocalStorage(course: any) {
  localStorage.setItem("courseDraft", JSON.stringify(course));
}

// Maneja la creación de módulos y navegación al siguiente módulo
export function nextModule(
  setCourse: (course: any) => void,
  course: any,
  setActiveModule: (idx: number) => void,
  activeModule: number
) {
  if (activeModule === course.modules.length - 1) {
    const newModule = {
      title: `Module ${course.modules.length + 1}`,
      lessons: [],
    };
    setCourse((prevCourse: any) => {
      const updatedModules = [...prevCourse.modules, newModule];
      // setActiveModule con el nuevo length
      setActiveModule(updatedModules.length - 1);
      return { ...prevCourse, modules: updatedModules };
    });
  } else {
    setActiveModule(activeModule + 1);
  }
}

export function deleteModule(
  setCourse: (course: any) => void,
  setActiveModule: (idx: number) => void,
  moduleIndex?: number
) {
  setCourse((prevCourse: any) => {
    const updatedModules = [...prevCourse.modules];
    const index = typeof moduleIndex === "number" ? moduleIndex : 0;
    updatedModules.splice(index, 1);

    index > 0 ? setActiveModule(index - 1) : setActiveModule(0);

    return { ...prevCourse, modules: updatedModules };
  });
}

// Devuelve la lección correspondiente a los índices dados
import type { Course, CourseLesson, CourseModule } from "@/interfaces/createCourseInterfaces";
import { getWordCount } from "./markdownUtils";

export function getLesson({
  course,
  moduleIndex,
  lessonIndex,
}: {
  course: Course;
  moduleIndex?: number;
  lessonIndex?: number;
}): CourseLesson {
  if (!course || !course.modules) return { title: "Lesson", type: "Lesson", file: "Lesson", duration: 0 };

  const modIdx = typeof moduleIndex === "number" ? moduleIndex : 0;

  const lessonIdx = typeof lessonIndex === "number" ? lessonIndex : 0;

  const module = course.modules[modIdx];

  if (!module || !module.lessons) return { title: "Lesson", type: "Lesson", file: "Lesson", duration: 0 };

  return module.lessons[lessonIdx];
}

// Agrega una lección al módulo correspondiente y hace scroll al final
export function handleLessonAdded(
  setCourse: (course: any) => void,
  moduleIndex: number,
  lesson: any,
  courseContentRef?: React.RefObject<HTMLDivElement>
) {
  setCourse((prevCourse: any) => {
    const updatedModules = [...prevCourse.modules];
    const idx = typeof moduleIndex === "number" ? moduleIndex : 0;
    updatedModules[idx] = {
      ...updatedModules[idx],
      lessons: [...updatedModules[idx].lessons, lesson],
    };
    // Hacer scroll al final del módulo si se provee el ref
    if (courseContentRef && courseContentRef.current) {
      setTimeout(() => {
        const moduleBoxes = courseContentRef.current!.querySelectorAll(".module-box");
        const activeModuleBox = moduleBoxes[idx] as HTMLElement | undefined;
        if (activeModuleBox) {
          const boxBottom = activeModuleBox.offsetTop + activeModuleBox.offsetHeight;
          courseContentRef.current!.scrollTo({
            top: boxBottom - courseContentRef.current!.offsetHeight,
            behavior: "smooth",
          });
        }
      }, 0);
    }
    return { ...prevCourse, modules: updatedModules };
  });
}

// Navigation actions for modules
export function handleNavActions(
  action: string,
  activeModule: number,
  setActiveModule: (idx: number) => void,
  course: any,
  setCourse: (course: any) => void
) {
  switch (action) {
    case "prev":
      if (activeModule > 0) {
        setActiveModule(activeModule - 1);
      }
      break;
    case "next":
      if (activeModule < course.modules.length - 1) {
        setActiveModule(activeModule + 1);
      }
      if (activeModule === course.modules.length - 1) {
        const newModule = {
          title: "Module " + (course.modules.length + 1),
          lessons: [],
        };
        setCourse({ ...course, modules: [...course.modules, newModule] });
        setActiveModule(course.modules.length);
      }
      break;
  }
}

// Set active module
export function handleActiveModule(index: number, setActiveModule: (idx: number) => void) {
  setActiveModule(index);
}

// Form submit handler
export function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
}

// KeyDown handler for form navigation
export interface HandleKeyDownEvent extends React.KeyboardEvent<HTMLFormElement> {
  target: HTMLInputElement | HTMLTextAreaElement;
  currentTarget: HTMLFormElement;
}

export type HandleKeyDown = (e: HandleKeyDownEvent) => void;

export const handleKeyDown: HandleKeyDown = (e) => {
  if (e.key === "Enter" && (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const elements = Array.from(form.elements) as HTMLElement[];
    const idx = elements.indexOf(e.target as HTMLElement);
    for (let i = idx + 1; i < elements.length; i++) {
      const el = elements[i];
      if (
        (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) &&
        !el.disabled &&
        el.offsetParent !== null
      ) {
        el.focus();
        break;
      }
    }
  }
};
// Utilidad para generar el key del video en Supabase Storage
export function getVideoStorageKey({
  courseName,
  moduleIndex,
  lessonIndex,
  fileName,
}: {
  courseName: string;
  moduleIndex: number;
  lessonIndex: number;
  fileName: string;
}): string {
  const timestamp = Date.now();
  // Limpiar entradas antes de codificar
  const clean = (str: string) => str.replace(/[^a-zA-Z0-9._-]/g, "_");
  const encodedCourseName = encodeURIComponent(clean(courseName));
  const encodedModule = encodeURIComponent(moduleIndex.toString());
  const encodedLesson = encodeURIComponent(lessonIndex.toString());
  const encodedFileName = encodeURIComponent(clean(fileName));
  return `videos/${timestamp}_${encodedCourseName}_m${encodedModule}_l${encodedLesson}_${encodedFileName}`;
}

export function getNavClass(activeModule: number, modulesLength: number): string {
  const lastIndex = modulesLength - 1;
  if (activeModule === 0 && lastIndex === 0) {
    return "initial";
  } else if (activeModule === 0 && activeModule < lastIndex) {
    return "first";
  } else if (activeModule > 0 && activeModule < lastIndex) {
    return "middle";
  } else if (activeModule === lastIndex) {
    return "last";
  }
  return "";
}

export function getModuleClass(idx: number, activeModule: number): string {
  if (idx < activeModule) {
    return "prev-module";
  } else if (idx === activeModule) {
    return "present-module";
  } else if (idx > activeModule) {
    return "next-module";
  }
  return "";
}

export function calculateReadingTime(text: string): string {
  const wordsPerMinute = 100;
  const textLength = getWordCount(text);
  const readingTimeInMinutes = Math.ceil(textLength / wordsPerMinute);

  const readingTimeRounded = Math.round(readingTimeInMinutes / 5) * 10;

  return intToTime(readingTimeRounded * 60);
}

export function intToTime(int: number): string {
  const hours = Math.floor(int / 3600);
  const minutes = Math.floor((int % 3600) / 60);

  if (hours === 0 && minutes === 0) {
    return ``;
  }
  if (hours === 0 && minutes > 0) {
    return `${minutes}min`;
  }
  if (hours > 0 && minutes === 0) {
    return `${hours}h`;
  }
  return `${hours}:${minutes}min`;
}

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
