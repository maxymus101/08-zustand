import NotesClient from "./Notes.client";
import { fetchNotes } from "../../../../lib/api";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotesPage({ params }: Props) {
  const { slug } = await params;
  const tag = slug[0] === "All" ? undefined : slug[0];
  const initialData = await fetchNotes(1, 12, "", tag);
  return <NotesClient initialNotes={initialData} tag={tag} />;
}
