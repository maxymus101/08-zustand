import TagsMenu from "../TagsMenu/TagsMenu";
import css from "./Header.module.css";
import Link from "next/link";

export default async function Header() {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        <h1>NoteHub</h1>
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <TagsMenu />
          </li>
        </ul>
      </nav>
    </header>
  );
}
