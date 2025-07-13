import Home from "../components/Home/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome to NoteHub",
  description:
    "NoteHub App is an personal store of your notes, that you can use in whatever you want.",
};

export default function Main() {
  return <Home />;
}
