import "./LessonCard.css";
import { useState } from "react";
import ReactDOM from "react-dom";

import type { CourseProps } from "@/types/createcourse";
import { getLesson } from "@/utils/courseUtils";

import EditableText from "@/components/EditableText";
import ContextMenu from "@/components/ContextMenu";

export default function ReadingLesson({ setCourse, course, moduleIndex, lessonIndex }: CourseProps) {
  const lesson = getLesson({ course, moduleIndex, lessonIndex });
  const [markdown, setMarkdown] = useState<string>(lesson?.file || "Upload a File or Start writing your lesson...");
  const [content, setContent] = useState<string>(markdown);
  const [showModal, setShowModal] = useState(false);

  const handleMarkdownChange = (value: string) => {
    setMarkdown(value);
    if (setCourse && typeof moduleIndex === "number" && typeof lessonIndex === "number") {
      const updatedCourse: CourseProps["course"] = { ...course };
      updatedCourse.modules[moduleIndex].lessons[lessonIndex].file = value;
      setCourse(updatedCourse);
    }
  };
  const [loading, setLoading] = useState(false);
  const duration = lesson?.file ? "readTime" : "";

  return (
    <>
      <EditableText
        value={lesson?.title || ""}
        onChange={(newTitle) => {
          if (typeof moduleIndex === "number" && typeof lessonIndex === "number" && setCourse) {
            const updatedCourse: CourseProps["course"] = { ...course };
            updatedCourse.modules[moduleIndex].lessons[lessonIndex].title = newTitle;
            setCourse(updatedCourse);
          }
        }}
        className="lesson-title-editable"
        placeholder="Click to edit lesson title"
      />
      <span className="lesson-chips">
        <label className="lesson-chip">
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
          className="lesson-chip"
          onClick={() => {
            setShowModal(true);
            setContent(lesson?.file);
          }}
        >
          {lesson?.file ? "Edit File" : "Create File"}
        </label>
      </span>
      <div className="lesson-footer">
        <span className="lesson-duration">{duration}</span>
        <ContextMenu
          options={[{ label: "Delete", value: "delete", className: "lesson-delete" }]}
          position="top"
          direction="left"
          onSelect={(value) => {
            if (value === "delete") {
              if (typeof moduleIndex === "number" && typeof lessonIndex === "number" && setCourse) {
                const updatedCourse = { ...course };
                updatedCourse.modules[moduleIndex].lessons.splice(lessonIndex, 1);
                setCourse(updatedCourse);
              }
            }
          }}
        />
      </div>
      {loading ? (
        <div className="lesson-file">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="lesson-file">
          <div className="markdown-body">Markdown</div>
        </div>
      )}

      {showModal &&
        ReactDOM.createPortal(
          <div className="reading-modal">
            <div className="reading-modal-content">
              <div
                className="reading-modal-edit"
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    document.activeElement &&
                    document.activeElement.classList.contains("mde-text")
                  ) {
                    e.preventDefault();
                    const textarea = document.activeElement as HTMLTextAreaElement;
                    const value = textarea.value;
                    const { selectionStart, selectionEnd } = textarea;
                    const before = value.slice(0, selectionStart);
                    const after = value.slice(selectionEnd);
                    const newValue = before + "\n" + after;
                    setMarkdown(newValue);
                    setTimeout(() => {
                      textarea.selectionStart = textarea.selectionEnd = selectionStart + 1;
                    }, 0);
                  }
                }}
              >
                <div>Markdown</div>
              </div>

              <div className="full-preview">
                <div>Markdown</div>
              </div>
              <div className="modal-edit-reading-footer">
                <span className="modal-chip-primary">{"count()"} words</span>
                {/* {calculateReadingTime(markdown) !== "" ? (
                  <span className="modal-chip-primary">{calculateReadingTime(markdown)} read</span>
                ) : null} */}
                <span className="modal-chip-primary">{duration} read</span>
              </div>
              <div className="reading-modal-preview-footer">
                <span
                  className="modal-chip-secondary back"
                  onClick={() => {
                    setShowModal(false);
                    setMarkdown(content);
                  }}
                >
                  Cancel
                </span>
                <span
                  className="modal-chip-secondary save"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  Save
                </span>
              </div>
              <button className="reading-modal-close-button" onClick={() => setShowModal(false)}>
                X
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
