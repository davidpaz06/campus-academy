import React, { useState } from "react";
import EditableText from "@/components/EditableText";
import type { Course, CourseLesson } from "@/interfaces/createCourseInterfaces";
import ContextMenu from "@/components/ContextMenu";
import { supabase } from "@/supabaseClient";
import { getVideoStorageKey } from "@/utils/courseUtils";
import { removeLessonFromModule } from "@/utils/courseDeleteUtils";
import "./lessonCard.css";
type VideoLessonProps = {
  lesson: CourseLesson;
  onTitleChange: (newTitle: string) => void;
  onDurationChange?: (duration: number) => void;
  course: Course;
  setCourse: React.Dispatch<React.SetStateAction<Course>>;
  moduleIndex: number;
  lessonIndex: number;
};

function secondsToMinutes(duration: number | undefined): React.ReactNode {
  if (typeof duration !== "number" || isNaN(duration)) return "0:00";
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  if (minutes === 0 && seconds > 0)
    return `${seconds.toString().padStart(2, "0")} seconds`;
  else
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
}

export default function VideoLesson(props: VideoLessonProps) {
  const {
    lesson,
    onTitleChange,
    onDurationChange,
    course,
    setCourse,
    moduleIndex,
    lessonIndex,
  } = props;
  const [duration, setDuration] = useState<number | undefined>(lesson.duration);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const videoDuration = e.currentTarget.duration;
    setDuration(videoDuration);
    if (onDurationChange) onDurationChange(videoDuration);
  };

  return (
    <div className="lesson-video">
      <EditableText
        value={lesson.title}
        onChange={onTitleChange}
        className="lesson-title-editable"
        placeholder="Click to edit lesson title"
      />
      <span className="video-chips">
        <label
          className="video-chip"
          style={{
            cursor: "pointer",
            position: "relative",
            backgroundColor: uploading ? "#ccc" : "",
            color: uploading ? "#666" : "",
          }}
        >
          {uploading ? "Uploading..." : "Upload video"}
          <input
            type="file"
            accept="video/*"
            style={{ display: "none" }}
            disabled={uploading}
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) {
                setUploading(true);
                setLoading(true);
                const filePath = getVideoStorageKey({
                  courseName: course.info?.name ?? "course",
                  moduleIndex: moduleIndex ?? 0,
                  lessonIndex: lessonIndex ?? 0,
                  fileName: file.name,
                });
                const { data, error } = await supabase.storage
                  .from("Campus Academy Storage")
                  .upload(filePath, file, {
                    cacheControl: "3600",
                    upsert: false,
                  });
                setUploading(false);
                setLoading(false);
                if (!error && data && data.path) {
                  const { data: urlData } = supabase.storage
                    .from("Campus Academy Storage")
                    .getPublicUrl(data.path);
                  if (urlData?.publicUrl) {
                    if (typeof lesson.file !== "undefined") {
                      lesson.file = urlData.publicUrl;
                    }
                  }
                }
              }
            }}
          />
        </label>
      </span>
      <span className="lesson-video-footer">
        <span className="lesson-video-duration">
          {secondsToMinutes(duration)}
        </span>
        <ContextMenu
          options={[
            { label: "Delete", value: "delete", className: "lesson-delete" },
            // { label: "Alert", value: "alert" },
          ]}
          position="top"
          direction="left"
          onSelect={(value) => {
            if (value === "delete") {
              const newModules = removeLessonFromModule(
                course.modules,
                moduleIndex,
                lessonIndex
              );
              setCourse({ ...course, modules: newModules });
            } else if (value === "alert") {
              alert(`Module: ${moduleIndex}, Lesson: ${lessonIndex}`);
            }
          }}
        />
      </span>

      {loading ? (
        <div className="lesson-video-file">
          <div className="loader"></div>
        </div>
      ) : (
        <video
          src={lesson.file}
          className="lesson-video-file"
          controls
          autoPlay
          muted
          loop
          onLoadedMetadata={handleLoadedMetadata}
          onCanPlay={() => setLoading(false)}
        ></video>
      )}
    </div>
  );
}
