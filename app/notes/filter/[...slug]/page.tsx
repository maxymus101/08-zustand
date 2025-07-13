import NotesClient from "./Notes.client";
import { fetchNotes } from "../../../../lib/api";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] === "All" ? "All" : slug[0];

  const descriptionTag =
    tag === "All" ? "All notes collection." : `Notes tagged with '${tag}.`;

  const tagUrl =
    tag === "All"
      ? "https://08-zustand-seven.vercel.app/notes/filter/All"
      : `https://08-zustand-seven.vercel.app/notes/filter/${tag}`;

  return {
    title: `Notes: ${tag}`,
    description: descriptionTag,
    openGraph: {
      title: `Notes: ${tag}`,
      description: descriptionTag,
      url: tagUrl,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub",
        },
      ],
    },
  };
}

export default async function NotesPage({ params }: Props) {
  const { slug } = await params;
  const tag = slug[0] === "All" ? undefined : slug[0];
  const initialData = await fetchNotes(1, 12, "", tag);
  return <NotesClient initialNotes={initialData} tag={tag} />;
}
