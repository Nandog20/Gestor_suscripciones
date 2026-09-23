import { useState } from 'react';
import Card from './components/Card';
import Header from './components/Header';
import Dialog from './components/DialogPerson';
import { useSubscription } from './hooks/useSubscription';

export default function App() {

  const [isPersonOpen, setPersonOpen] = useState(false)
  const {people, addPerson} = useSubscription()

  return (
    <div>
      <Header />
      <section className="px-4 py-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Dashboard</h2>
        {/* 1 col en móvil, 2 en tablet, 3 en desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card title="Suscripciones" quantity={4} />

          <Card title="Suscripciones Pagadas" quantity={4} missing={2} />

          <Card title="Total a pagar" quantity={400} missing={250} format="currency"/>
        </div>
      </section>

      <section className="flex items-start gap-4 p-2 align-middle">
        <button className= "bg-black text-white py-1 px-2 rounded-xl cursor-pointer hover:scale-105"> + Agregar suscripción</button>
        <button className= " border border-gray-400 py-1 px-2 rounded-xl cursor-pointer hover:scale-105" onClick={()=> setPersonOpen(true)}>Agregar persona</button>
      </section>
      {/*dialogs*/}
      <section className="items-center">
        <Dialog isOpen = {isPersonOpen} onClose={()=> setPersonOpen(false)} addPerson={addPerson}/>
      </section>

      <section>
        <h2>Suscripciones</h2>
      </section>
      <section>
        <h2>Personas</h2>
        {
          people.map(person => (
            <div key={person.id}>
              <h2>{person.name}</h2>
            </div>
          ))
        }
      </section>
    </div>
  );
}
