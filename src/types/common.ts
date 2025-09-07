export type LoadingState = "idle" | "loading" | "success" | "error";

export type Theme = "light" | "dark";

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface FileUpload {
  file: File;
  preview?: string;
  progress?: number;
}
