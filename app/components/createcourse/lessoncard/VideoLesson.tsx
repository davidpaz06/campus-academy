import React, { useState } from "react";
import { supabase } from "@/supabaseClient";

import type { CourseProps } from "@/interfaces/createCourseInterfaces";
import {
  getVideoStorageKey,
  getLesson,
  removeLessonFromModule,
} from "@/utils/courseUtils";

import EditableText from "@/components/EditableText";
import ContextMenu from "@/components/ContextMenu";
import "./lessonCard.css";

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

export default function VideoLesson({
  setCourse,
  course,
  moduleIndex,
  lessonIndex,
}: CourseProps) {
  const lesson = getLesson({ course, moduleIndex, lessonIndex });

  const [duration, setDuration] = useState<number | undefined>(0);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const videoDuration = e.currentTarget.duration;
    setDuration(videoDuration);
  };

  const handleRemoveLesson = () => {
    const newModules = removeLessonFromModule(
      course.modules,
      moduleIndex ?? 0,
      lessonIndex ?? 0
    );
    setCourse({ ...course, modules: newModules });
  };

  return (
    <>
      <EditableText
        value={lesson.title}
        onChange={(newTitle) => {
          lesson.title = newTitle;
          setCourse({ ...course });
        }}
        className="lesson-title-editable"
        placeholder="Click to edit lesson title"
      />
      <span className="lesson-chips">
        <label
          className="lesson-chip"
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
      <div className="lesson-footer">
        <span className="lesson-duration">{secondsToMinutes(duration)}</span>
        <ContextMenu
          options={[
            { label: "Delete", value: "delete", className: "lesson-delete" },
            // { label: "Alert", value: "alert" },
          ]}
          position="top"
          direction="left"
          onSelect={(value) => {
            if (value === "delete") {
              handleRemoveLesson();
            }
          }}
        />
      </div>

      {loading ? (
        <div className="lesson-file">
          <div className="loader"></div>
        </div>
      ) : (
        <video
          src={lesson.file}
          className="lesson-file"
          controls
          autoPlay
          muted
          loop
          onLoadedMetadata={handleLoadedMetadata}
          onCanPlay={() => setLoading(false)}
        ></video>
      )}
    </>
  );
}
