import { useEffect, useRef } from 'react';
import type { Person } from '../types/Person';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  people: Person[];
}

export default function DialogSubscription({ isOpen, onClose, people }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={dialogRef}>
      <div className="fixed inset-0 m-auto flex h-fit max-h-[90svh] w-full max-w-md flex-col gap-4 overflow-y-auto rounded-2xl border border-gray-300 bg-white p-6 text-gray-900 shadow-xl backdrop:bg-black/50 backdrop:blur-sm">
        <h2 className="text-2xl font-semibold">Agregar una suscripción</h2>

        <form className="flex flex-col gap-3">
          <label htmlFor="Sub" className="text-sm font-medium text-gray-700">
            Nombre suscripción:
          </label>

          <input
            type="text"
            id="Sub"
            placeholder="Netflix"
            required
            className="rounded-xl border border-gray-400 px-3 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label htmlFor="price" className="text-sm font-medium text-gray-700">
            Precio:
          </label>

          <input
            type="number"
            id="price"
            min={1}
            placeholder="250"
            className="rounded-xl border border-gray-400 px-3 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label htmlFor="day" className="text-sm font-medium text-gray-700">
            Día de pago:
          </label>

          <input
            type="number"
            id="day"
            min={1}
            max={31}
            placeholder="12"
            className="rounded-xl border border-gray-400 px-3 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <span className="text-sm font-medium text-gray-700">
            Participantes:
          </span>

          <div className="flex flex-col gap-2">
            {people.map((person) => (
              <label
                key={person.id}
                className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer accent-black"
                />
                {person.name}
              </label>
            ))}
          </div>

          <button
            type="submit"
            className="cursor-pointer rounded-xl bg-black px-4 py-2 text-white hover:scale-105"
          >
            Agregar suscripción
          </button>
        </form>

        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer rounded-xl border border-gray-400 px-4 py-2 hover:scale-105"
        >
          Cerrar
        </button>
      </div>
    </dialog>
  );
}
