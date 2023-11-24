export enum Equipements {
    TABLE ,
    VISIO
  }

  export const EQUIPMENT_ICONS = {
    [Equipements.TABLE]: 'desktop',
    [Equipements.VISIO]: 'tv',
  };


export interface Room {
    id: number,
    capacity: string, 
    telephone: string,
    accessibility: boolean,
    equipements: Equipements[],
    address: string
}

export function getEquipmentIcon(equipment: Equipements): string {
  return EQUIPMENT_ICONS[equipment];
}

export function getAccessibilityIcon(accessibility: boolean): string {
  return accessibility ? 'accessible' : '';
}
