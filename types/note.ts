export interface Note {
  id: number;
  title: string; // Заголовок нотатки
  content: string; // Текст нотатки
  createdAt: string; // Дата створення
  updatedAt: string; // Дата останнього оновлення
  tag: NoteTag;
}

export interface NewNote {
  title: string;
  content?: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
