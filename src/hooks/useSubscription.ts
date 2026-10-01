import { useState } from "react";
import type { Person } from "../types/Person";
import type { Subscription } from "../types/Subscription";

export function useSubscription() {
  
  const [people, setPeople] = useState<Person[]>([{
    id: "1",
    name:"Tu"
  }])

  const [subscriptions, setSubscription] = useState<Subscription[]>([])

  const addPerson = (person : Person) => { 
    setPeople(prev => [...prev, person])
  }

  const addSubscription = (sub : Subscription) => {
    setSubscription(prev => [...prev, sub])
  }

  return {
    people,
    addPerson,
    subscriptions,
    addSubscription
  };
}
