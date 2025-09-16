const empty = "Deja este string y luego me encargaré de llenarlo";

const componentTypes = [
  {
    idx: 0,
    component_type_id: 1,
    component_type_name: "Module",
    component_type_description: "A module component type",
  },
  {
    idx: 1,
    component_type_id: 2,
    component_type_name: "Lesson",
    component_type_description: "A lesson component type",
  },
  {
    idx: 2,
    component_type_id: 3,
    component_type_name: "Reading",
    component_type_description: "A reading component type",
  },
  { 
    idx: 3, 
    component_type_id: 4, 
    component_type_name: "Video", 
    component_type_description: "A video component type" 
  },
  {
    idx: 4,
    component_type_id: 5,
    component_type_name: "Project",
    component_type_description: "A project component type",
  },
  { idx: 5, component_type_id: 6, component_type_name: "Exam", component_type_description: "An exam component type" },
];

function getComponentTypeId(lessonType: string) {
  const component = componentTypes.find((c) => c.component_type_name === lessonType);
  return component ? component.component_type_id : null;
}

export function courseToCreateCourseDto(course: any, institutionId: string, courseImageId: string) {
  // Course
  var courseDto = {
    courseName: course.info.name,
    courseSummary: course.info.about,
    courseDescription: course.info.description,
    institutionId: institutionId,
    courseImageId: courseImageId,
    components: [] as any[],
  };

  course.modules.forEach((module: any, moduleIdx: number) => {
    // Module
    courseDto.components.push({
      componentName: module.title,
      componentSummary: module.title,
      componentTypeId: 1, // Module
      componentDescription: empty,
      contextBody: empty, //---------------------- ?????????????????
      position: moduleIdx + 1, //---------------------- ?????????????????
      realParentId: null, //---------------------- ?????????????????
    });

    // Lessons
    module.lessons.forEach((lesson: any, lessonIdx: number) => {
      courseDto.components.push({
        componentName: lesson.title,
        componentSummary: lesson.title,
        componentTypeId: getComponentTypeId(lesson.type),
        componentDescription: empty,
        contextBody: empty, //---------------------- ?????????????????
        position: lessonIdx + 1,
        realParentId: course.modules[moduleIdx].title, // module.title,
      });
    });
  });

  return courseDto;
}
