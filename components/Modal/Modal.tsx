import { useEffect, type MouseEvent } from "react";
import ReactDOM from "react-dom";
import css from "./Modal.module.css";

interface NoteModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ onClose, children }: NoteModalProps) {
  // useEffect для керування прокруткою сторінки.
  // Він спрацьовує при монтуванні компонента (тобто, коли модалка відкривається)
  // та очищається при розмонтуванні (коли модалка закривається).
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Обробник клавіші Escape.
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  // Обробник кліку по бекдропу
  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    document.body
  );
}
