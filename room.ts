export enum Equipements {
    TABLE,
    VISIO,
  }

export interface Room {
    id: number,
    capacity: string, 
    telephone: string,
    accessibility: boolean,
    equipements: Equipements[],
    address: string
}
