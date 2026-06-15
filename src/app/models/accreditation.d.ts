import { Type } from "./type.model"

type Accreditation = { // export inutile sauf dans le cas d'un nom de Type qui est déjà un mot réservé
  id: number,
  name: string;
  borrowedTypes: Type[]
  // dans le cas d'un manyToOne :
  // loaner?: AppUser
}