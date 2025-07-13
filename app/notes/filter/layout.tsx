import css from "./LayoutNotes.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notes Layout",
  description: "List of your notes.",
};

type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

const NotesLayout = ({ children, sidebar }: Props) => {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
};

export default NotesLayout;
