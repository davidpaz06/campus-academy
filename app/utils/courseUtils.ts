// Utils for course navigation and module class

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
