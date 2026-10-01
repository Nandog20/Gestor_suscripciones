import React, { useEffect, useRef, useState } from 'react';
import type { Person } from '../types/Person';
import type { Subscription } from '../types/Subscription';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  people: Person[];
  addSubscription: (subscription : Subscription) => void
}

export default function DialogSubscription({ isOpen, onClose, people, addSubscription }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [subscription, setSubscription] = useState<Subscription>({
    id: '',
    name: '',
    price: 1,
    paymentDay: 1,
    participants: [],
  });

  const isParticipantSelected = (personId: string) =>
    subscription.participants.some((participant) => participant.person.id === personId);

  const toggleParticipant = (person: Person) => {
    setSubscription((prev) => {
      const isSelected = prev.participants.some(
        (participant) => participant.person.id === person.id,
      );

      return {
        ...prev,
        participants: isSelected
          ? prev.participants.filter(
              (participant) => participant.person.id !== person.id,
            )
          : [...prev.participants, { person }],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(subscription.name.trim() == '' && subscription.participants.length == 0){
      return
    }
    const newSub : Subscription = {
      ...subscription,
      id: Date.now().toString(),
      name: subscription.name.trim()
    }

    addSubscription(newSub)
    
  }

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

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label htmlFor="Sub" className="text-sm font-medium text-gray-700">
            Nombre suscripción:
          </label>

          <input
            type="text"
            id="Sub"
            placeholder="Netflix"
            onChange={e => setSubscription({...subscription, name: e.target.value})}
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
            onChange={e => setSubscription({...subscription, price: Number(e.target.value)})}
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
            onChange={e => setSubscription({...subscription, paymentDay: Number(e.target.value)})}
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
