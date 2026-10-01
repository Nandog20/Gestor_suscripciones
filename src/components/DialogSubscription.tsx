import React, { useEffect, useRef, useState } from 'react';
import type { Person } from '../types/Person';
import type { Subscription } from '../types/Subscription';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  people: Person[];
  addSubscription: (subscription : Subscription) => void
}

// price en 0 = campo vacío en el formulario (se valida con min={1}/required)
const emptySubscription: Subscription = {
  id: '',
  name: '',
  price: 0,
  paymentDay: 1,
  participants: [],
};

export default function DialogSubscription({ isOpen, onClose, people, addSubscription }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [subscription, setSubscription] = useState<Subscription>(emptySubscription);
  const [error, setError] = useState('');

  const isParticipantSelected = (personId: string) =>
    subscription.participants.some((participant) => participant.id === personId);

  const toggleParticipant = (person: Person) => {
    setError('');
    setSubscription((prev) => {
      const isSelected = prev.participants.some((participant) => participant.id === person.id);

      return {
        ...prev,
        participants: isSelected
          ? prev.participants.filter((participant) => participant.id !== person.id)
          : [...prev.participants, person],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = subscription.name.trim();

    if (name === '' || subscription.participants.length === 0) {
      setError('Debes indicar un nombre y al menos un participante.');
      return;
    }

    const newSub: Subscription = {
      ...subscription,
      name,
      id: Date.now().toString(),
    };

    addSubscription(newSub);
    setSubscription(emptySubscription);
    setError('');
    onClose();
  };

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (isOpen && !dialog.open) {
      setSubscription(emptySubscription);
      setError('');
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  // Escape (o el botón de navegación) cierra el <dialog> nativo sin pasar por
  // onClose, lo que dejaría isOpen en true. Sincronizamos aquí.
  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    const handleCancel = () => onClose();

    dialog.addEventListener('cancel', handleCancel);

    return () => dialog.removeEventListener('cancel', handleCancel);
  }, [onClose]);

  return (
    <dialog ref={dialogRef}>
      <div className="fixed inset-0 m-auto flex h-fit max-h-[90svh] w-full max-w-md flex-col gap-4 overflow-y-auto rounded-2xl border border-gray-300 bg-white p-6 text-gray-900 shadow-xl backdrop:bg-black/50 backdrop:blur-sm">
        <h2 className="text-2xl font-semibold">Agregar una suscripción</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label htmlFor="Sub" className="text-sm font-medium text-gray-700">
            Nombre suscripción:
          </label>

          <input
            type="text"
            id="Sub"
            placeholder="Netflix"
            value={subscription.name}
            onChange={e => {
              setError('');
              setSubscription(prev => ({ ...prev, name: e.target.value}));
            }}
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
            value={subscription.price === 0 ? '' : subscription.price}
            onChange={e => setSubscription(prev => ({ ...prev, price: e.target.value === '' ? 0 : Number(e.target.value)}))}
            required
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
            value={subscription.paymentDay === 0 ? '' : subscription.paymentDay}
            onChange={e => setSubscription(prev => ({ ...prev, paymentDay: e.target.value === '' ? 0 : Number(e.target.value)}))}
            required
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
                  checked={isParticipantSelected(person.id)}
                  onChange={() => toggleParticipant(person)}
                  className="h-4 w-4 cursor-pointer accent-black"
                />
                {person.name}
              </label>
            ))}
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

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
