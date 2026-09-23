import { useState } from "react";
import type { Person } from "../types/Person";

export function useSubscription() {
  
  const [people, setPeople] = useState<Person[]>([{
    id: "1",
    name:"Tu"
  }])

  const addPerson = (person : Person) => { 
    setPeople(prev => [...prev, person])
  }

  return {
    people,
    addPerson
  };
}
