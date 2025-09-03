import { useState } from "react";
import ReactDOM from "react-dom";
import ReactMde from "react-mde";

import ReactMarkdown from "react-markdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import "@/components/markdown.css";

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
    lesson?.file || "Upload a File or Start writing your lesson..."
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
          {lesson?.file ? "Edit File" : "Create File"}
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
                    const textarea =
                      document.activeElement as HTMLTextAreaElement;
                    const value = textarea.value;
                    const { selectionStart, selectionEnd } = textarea;
                    const before = value.slice(0, selectionStart);
                    const after = value.slice(selectionEnd);
                    const newValue = before + "\n" + after;
                    setMarkdown(newValue);
                    setTimeout(() => {
                      textarea.selectionStart = textarea.selectionEnd =
                        selectionStart + 1;
                    }, 0);
                  }
                }}
              >
                <ReactMde
                  value={markdown}
                  onChange={setMarkdown}
                  toolbarButtonComponent={[[]]}
                  disablePreview
                  toolbarCommands={[
                    ["header"],
                    ["bold", "italic", "strikethrough"],
                    ["link", "code", "quote"],
                    ["image"],
                    ["unordered-list", "ordered-list"],
                  ]}
                  classes={{
                    textArea: "custom-mde-textarea",
                  }}
                />
              </div>

              <div className="lesson-reading-file full-preview">
                <ReactMde
                  value={markdown}
                  selectedTab="preview"
                  classes={{
                    preview: "preview",
                  }}
                  generateMarkdownPreview={(markdown) =>
                    Promise.resolve(<ReactMarkdown>{markdown}</ReactMarkdown>)
                  }
                />
              </div>
              <div className="reading-modal-edit-footer lesson-reading-chips">
                <span className="lesson-reading-chip">
                  {lesson.file.split(" ").length} words
                </span>
              </div>
              <div className="reading-modal-preview-footer">View</div>
              <button
                className="reading-modal-close-button"
                onClick={() => setShowModal(false)}
              >
                X
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
