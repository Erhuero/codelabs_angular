export enum Equipments {
    TABLE,
    VISIO
  }

  export const EQUIPMENT_ICONS = {
    [Equipments.TABLE]: 'desktop',
    [Equipments.VISIO]: 'tv',
  };

export interface Room {
    id: number,
    capacity: string, 
    telephone: string,
    accessibility: boolean,
    equipments: Equipments[],
    address: string
}

export function getEquipmentIcon(equipment: string): string {
  const equipmentEnum = Equipments[equipment as keyof typeof Equipments];
  return EQUIPMENT_ICONS[equipmentEnum];
}

export function getAccessibilityIcon(accessibility: boolean): string {
  return accessibility ? 'accessible' : '';
}
