export enum Equipements {
    TABLE,
    VISIO,
  }

export interface Room {
    id: number,
    capacity: string, 
    accessibility: boolean,
    equipements: Equipements[],
    address: string,
    telephone: string
}
