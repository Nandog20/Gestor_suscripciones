import { useEffect, useRef } from "react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DialogSubscription({
  isOpen,
  onClose,
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={dialogRef}>
      <h2>Agrega una suscripción</h2>

      <p>dialogsuscripción</p>

      <button onClick={onClose}>
        Cerrar
      </button>
    </dialog>
  );
}
