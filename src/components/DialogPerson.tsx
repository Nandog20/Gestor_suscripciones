import React, { useEffect, useRef, useState } from 'react';
import type { Person } from '../types/Person';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  addPerson: (person: Person) => void;
}

export default function Dialog({ isOpen, onClose, addPerson }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [person, setPerson] = useState<Person>({
    name: '',
    id: '',
  });

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (person.name.trim() === '') {
      return;
    }

    const newPerson: Person = {
      ...person,
      name: person.name.trim(),
      id: Date.now().toString(),
    };

    addPerson(newPerson);
    onClose();

    setPerson({
      name: '',
      id: '',
    });
  };

  return (
    <dialog ref={dialogRef}>
      <div className="fixed inset-0 m-auto flex h-fit max-h-[90svh] w-full max-w-md flex-col gap-4 overflow-y-auto rounded-2xl border border-gray-300 bg-white p-6 text-gray-900 shadow-xl backdrop:bg-black/50 backdrop:blur-sm">
        <h2 className="text-2xl font-semibold">Agrega a una persona</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Nombre:
          </label>

          <input
            type="text"
            id="name"
            placeholder="Juan"
            value={person.name}
            onChange={(e) =>
              setPerson({
                ...person,
                name: e.target.value,
              })
            }
            required
            className="rounded-xl border border-gray-400 px-3 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="cursor-pointer rounded-xl bg-black px-4 py-2 text-white hover:scale-105"
          >
            Agregar persona
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
