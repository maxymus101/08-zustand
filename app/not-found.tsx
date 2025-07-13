import Link from "next/link";
import css from "../components/Home/Home.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 Not-Found",
  description: "Page not found.",
  openGraph: {
    title: "404 Not-Found",
    description: "Page not found.",
    url: "https://08-zustand-fawn-six.vercel.app/not-found",
    siteName: "NoteHub",
    images: [
      {
        url: "/page-note-found.jpeg",
        width: 1200,
        height: 630,
        alt: `404 Page not found`,
      },
    ],
    type: "article",
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>

      <Link href="/">Go back home</Link>
    </div>
  );
};

export default NotFound;
