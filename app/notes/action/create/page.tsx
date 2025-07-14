import css from "./CreateNote.module.css";
import NoteForm from "../../../../components/NoteForm/NoteForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create your note",
  description: "Create your small reminder.",
  openGraph: {
    title: "Create your note",
    description: "Create your small reminder.",
    url: "https://08-zustand-fawn-six.vercel.app/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub card",
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h2 className={css.title}>Create note</h2>
        <NoteForm />
      </div>
    </main>
  );
}
