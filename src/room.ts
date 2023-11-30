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
    equipments: string[],
    address: string
}

// Définit une fonction pour obtenir le nom de l'icône correspondant à un équipement spécifié.
export function getEquipmentIcon(equipment: string): string {
  // Convertit la chaîne d'équipement en valeur enum correspondante de 'Equipments'.
  const equipmentEnum = Equipments[equipment as keyof typeof Equipments];
  // Retourne le nom de l'icône associé à la valeur enum dans l'objet 'EQUIPMENT_ICONS'.
  return EQUIPMENT_ICONS[equipmentEnum];
}

// Définit une fonction pour obtenir l'icône d'accessibilité en fonction de l'état d'accessibilité.
export function getAccessibilityIcon(accessibility: boolean): string {
  // Retourne 'accessible' si 'accessibility' est true, sinon retourne une chaîne vide.
  return accessibility ? 'accessible' : '';
}
