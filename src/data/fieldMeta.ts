import { AirVent, Archive, ArrowUpDown, Bath, BedDouble, CookingPot, DoorOpen, Flame, House, Ruler, Sofa, SquareParking, Sun, ThermometerSun, TreePine, Waves, Zap, type LucideIcon } from '@lucide/vue';

import type { Equipement } from '@/schemas/property';

/** Libellé et icône de chaque champ d'un bien : le panneau de filtres et la page du bien les liront ici */
export const fieldMeta = {
  surface: { label: 'Surface', icon: Ruler },
  pieces: { label: 'Pièces', icon: DoorOpen },
  chambres: { label: 'Chambres', icon: BedDouble },
  sallesDeBain: { label: 'Salles de bain', icon: Bath },
  meuble: { label: 'Meublé', icon: Sofa },
  dpe: { label: 'Classe énergie', icon: Zap },
};

/** Libellé et icône de chaque équipement (la page du bien les lit ici ; la valeur technique est en anglais) */
export const equipementMeta: Record<Equipement, { label: string; icon: LucideIcon }> = {
  parking: { label: 'Parking', icon: SquareParking },
  terrace: { label: 'Terrasse', icon: Sun },
  garden: { label: 'Jardin', icon: TreePine },
  pool: { label: 'Piscine', icon: Waves },
  elevator: { label: 'Ascenseur', icon: ArrowUpDown },
  cellar: { label: 'Cave', icon: Archive },
  attic: { label: 'Grenier', icon: House },
  air_conditioning: { label: 'Climatisation', icon: AirVent },
  fireplace: { label: 'Cheminée', icon: Flame },
  underfloor_heating: { label: 'Chauffage au sol', icon: ThermometerSun },
  equipped_kitchen: { label: 'Cuisine équipée', icon: CookingPot },
};