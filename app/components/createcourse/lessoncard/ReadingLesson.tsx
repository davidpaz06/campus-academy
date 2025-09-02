import React, { useState } from "react";
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import "react-mde/lib/styles/css/react-mde-all.css";

import type { CourseProps } from "@/interfaces/createCourseInterfaces";
import { calculateReadingTime, getLesson } from "@/utils/courseUtils";
import EditableText from "@/components/EditableText";
import ContextMenu from "@/components/ContextMenu";

export default function ReadingLesson({
  setCourse,
  course,
  moduleIndex,
  lessonIndex,
}: CourseProps) {
  const lesson = getLesson({ course, moduleIndex, lessonIndex });

  const [markdown, setMarkdown] = useState<string>(
    lesson?.file || "Start writing your lesson..."
  );
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");

  const handleMarkdownChange = (value: string) => {
    setMarkdown(value);
    if (
      typeof moduleIndex === "number" &&
      typeof lessonIndex === "number" &&
      setCourse
    ) {
      const updatedCourse: CourseProps["course"] = { ...course };
      updatedCourse.modules[moduleIndex].lessons[lessonIndex].file = value;
      setCourse(updatedCourse);
    }
  };

  const duration = lesson?.file ? calculateReadingTime(lesson.file) : "";
  const [loading, setLoading] = useState(false);

  return (
    <div className="lesson-reading">
      <EditableText
        value={lesson?.title || ""}
        onChange={(newTitle) => {
          if (
            typeof moduleIndex === "number" &&
            typeof lessonIndex === "number" &&
            setCourse
          ) {
            const updatedCourse: CourseProps["course"] = { ...course };
            updatedCourse.modules[moduleIndex].lessons[lessonIndex].title =
              newTitle;
            setCourse(updatedCourse);
          }
        }}
        className="lesson-title-editable"
        placeholder="Click to edit lesson title"
      />
      <span className="lesson-reading-chips">
        <label className="lesson-reading-chip">
          {loading ? "Uploading..." : "Upload file"}
          <input
            type="file"
            accept=".md,.txt"
            style={{ display: "none" }}
            disabled={loading}
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) {
                setLoading(true);
                const text = await file.text();
                handleMarkdownChange(text);
                setLoading(false);
              }
            }}
          />
        </label>
      </span>
      <div className="lesson-reading-footer">
        <span className="lesson-reading-duration">{duration}</span>
        <ContextMenu
          options={[
            { label: "Delete", value: "delete", className: "lesson-delete" },
            {
              label: "Full Screen",
              value: "full-screen",
              className: "full-screen-lesson",
            },
          ]}
          position="top"
          direction="left"
          onSelect={(value) => {
            if (value === "delete") {
              if (
                typeof moduleIndex === "number" &&
                typeof lessonIndex === "number" &&
                setCourse
              ) {
                const updatedCourse = { ...course };
                updatedCourse.modules[moduleIndex].lessons.splice(
                  lessonIndex,
                  1
                );
                setCourse(updatedCourse);
              }
            }
            if (value === "full-screen") {
              // setShowModal(true);
            }
          }}
        />
      </div>
      {loading ? (
        <div className="lesson-reading-file">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="lesson-reading-file">
          <ReactMde
            value={markdown}
            onChange={handleMarkdownChange}
            selectedTab={selectedTab}
            onTabChange={(tab) => {
              setSelectedTab(tab);
              // if (tab === "preview") setShowModal(true);
            }}
            generateMarkdownPreview={(markdown) =>
              Promise.resolve(<ReactMarkdown>{markdown}</ReactMarkdown>)
            }
            childProps={{
              writeButton: { tabIndex: -1 },
              textArea: {
                onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                  if (e.key === "Enter") {
                    e.stopPropagation();
                  }
                },
              },
            }}
            toolbarCommands={[
              ["bold", "italic", "strikethrough", "link"],
              ["unordered-list", "ordered-list"],
            ]}
          />
        </div>
      )}
      <div className="lesson-reading-file-options">Options</div>
    </div>
  );
}
