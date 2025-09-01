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

export function getNavClass(
  activeModule: number,
  modulesLength: number
): string {
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
