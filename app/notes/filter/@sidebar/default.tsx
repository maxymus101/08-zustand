import css from "./default.module.css";
import Link from "next/link";

import { tags } from "../../../../lib/constants/constants";

export default async function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      {["All", ...tags].map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
