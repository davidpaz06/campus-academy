import React, { useState } from "react";
import ReactDOM from "react-dom";
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import "react-mde/lib/styles/css/react-mde-all.css";

import type { CourseProps } from "@/interfaces/createCourseInterfaces";
import { calculateReadingTime, getLesson } from "@/utils/courseUtils";
import EditableText from "@/components/EditableText";
import ContextMenu from "@/components/ContextMenu";
import { preview } from "vite";

export default function ReadingLesson({
  setCourse,
  course,
  moduleIndex,
  lessonIndex,
}: CourseProps) {
  const lesson = getLesson({ course, moduleIndex, lessonIndex });

  const [markdown, setMarkdown] = useState<string>(
    lesson?.file || "Upload a File or Start writing your lesson..."
  );
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">(
    "preview"
  );

  // const [showModal, setShowModal] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleMarkdownChange = (value: string) => {
    setMarkdown(value);
    if (
      setCourse &&
      typeof moduleIndex === "number" &&
      typeof lessonIndex === "number"
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
        <label
          className="lesson-reading-chip"
          onClick={() => setShowModal(true)}
        >
          {selectedTab === "preview" && lesson?.file
            ? "Edit File"
            : "Create File"}
        </label>
      </span>
      <div className="lesson-reading-footer">
        <span className="lesson-reading-duration">{duration}</span>
        <ContextMenu
          options={[
            { label: "Delete", value: "delete", className: "lesson-delete" },
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
            selectedTab="preview"
            generateMarkdownPreview={(markdown) =>
              Promise.resolve(<ReactMarkdown>{markdown}</ReactMarkdown>)
            }
          />
        </div>
      )}
      <div className="lesson-reading-file-options"></div>

      {/* ////////////////////////////////////////////////////// */}
      {showModal &&
        ReactDOM.createPortal(
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridTemplateRows: "1fr 50px",
                background: "#fff",
                borderRadius: 8,
                padding: 32,
                width: "90vw",
                height: "80vh",
                boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
                overflow: "hidden",
              }}
            >
              {/* <div
                style={{
                  gridColumn: "1 / 2",
                  padding: "16px",
                }}
                className="reading-modal-editor"
              > */}
              <ReactMde
                value={markdown}
                onChange={handleMarkdownChange}
                selectedTab="write"
                generateMarkdownPreview={(markdown) =>
                  Promise.resolve(<ReactMarkdown>{markdown}</ReactMarkdown>)
                }
                childProps={{
                  writeButton: { tabIndex: -1 },
                  textArea: {
                    onKeyDown: (
                      e: React.KeyboardEvent<HTMLTextAreaElement>
                    ) => {
                      if (e.key === "Enter") {
                        e.stopPropagation();
                      }
                    },
                  },
                }}
                toolbarCommands={[
                  ["bold", "italic", "strikethrough", "link", "quote"],
                  ["unordered-list", "ordered-list", "image", "code"],
                ]}
              />
              {/* </div> */}
              <div className="lesson-reading-file preview">
                <ReactMde
                  value={markdown}
                  selectedTab="preview"
                  generateMarkdownPreview={(markdown) =>
                    Promise.resolve(<ReactMarkdown>{markdown}</ReactMarkdown>)
                  }
                />
              </div>
              <div
                className="reading-modal-edit-footer"
                style={{ gridColumn: "1 / 2", padding: "16px" }}
              >
                Edit button
              </div>
              <div
                className="reading-modal-preview-footer"
                style={{ gridColumn: "2 / 3", padding: "16px" }}
              >
                View
              </div>
              <button
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  background: "#eee",
                  border: "none",
                  borderRadius: 4,
                  padding: "4px 8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                onClick={() => setShowModal(false)}
              >
                X
              </button>
            </div>
          </div>,
          document.body
        )}
      {/* ////////////////////////////////////////////////////// */}
    </div>
  );
}
