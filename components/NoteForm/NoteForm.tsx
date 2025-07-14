"use client";

import css from "./NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { type NoteTag, type Note, NewNote } from "../../types/note";
import { type NewNoteContent, createNote } from "../../lib/api";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { useNoteDraftStore } from "../../lib/store/noteStore";

// Схема валідації за допомогою Yup
const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be at most 50 characters")
    .required("Title is required"),
  content: Yup.string().max(500, "Content must be at most 500 characters"),
  tag: Yup.string<NoteTag>()
    .oneOf(
      ["Todo", "Work", "Personal", "Meeting", "Shopping"],
      "Invalid tag selected"
    )
    .required("Tag is required"),
});

export default function NoteForm() {
  const [errors, setErrors] = useState<
    Partial<Record<"title" | "content" | "tag", string>>
  >({});
  const fieldId = useId();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  // === useMutation для створення нової нотатки ===
  const createNoteMutation = useMutation<Note, Error, NewNoteContent>({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note created successfully!");
    },
    onError: (error) => {
      toast.error(`Error creating note: ${error.message}`);
    },
  });

  async function handleSubmitForm(formData: FormData) {
    try {
      const note: NewNote = {
        title: formData.get("title") as string,
        content: formData.get("content") as string,
        tag: formData.get("tag") as NewNote["tag"],
      };

      await validationSchema.validate(note, { abortEarly: false });
      setErrors({});

      createNoteMutation.mutate(note);
    } catch (error: unknown) {
      if (error instanceof Yup.ValidationError) {
        const formattedErrors: Record<string, string> = {};
        error.inner.forEach((err) => {
          if (err.path) {
            formattedErrors[err.path] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
    }
  }

  const handleCancelForm = () => {
    router.back();
  };

  return (
    <form className={css.form} action={handleSubmitForm}>
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          id={`${fieldId}-title`}
          type="text"
          name="title"
          className={css.input}
          defaultValue={draft?.title}
          onChange={handleChange}
        />
        {(errors.title && <div className={css.error}>{errors.title}</div>) ||
          "\u00A0"}
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          id={`${fieldId}-content`}
          name="content"
          className={css.textarea}
          defaultValue={draft?.content}
          onChange={handleChange}
        />
        {(errors.content && (
          <div className={css.error}>{errors.content}</div>
        )) ||
          "\u00A0"}
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select
          id={`${fieldId}-tag`}
          name="tag"
          className={css.select}
          defaultValue={draft?.tag}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {(errors.tag && <div className={css.error}>{errors.tag}</div>) ||
          "\u00A0"}
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancelForm}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={createNoteMutation.isPending}
        >
          Create note
        </button>
      </div>
    </form>
  );
}
