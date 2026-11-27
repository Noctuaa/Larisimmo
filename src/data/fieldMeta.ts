import { Bath, BedDouble, DoorOpen, Ruler, Sofa, Zap } from '@lucide/vue';

/** Libellé et icône de chaque champ d'un bien : le panneau de filtres et la page du bien les liront ici */
export const fieldMeta = {
  surface: { label: 'Surface', icon: Ruler },
  pieces: { label: 'Pièces', icon: DoorOpen },
  chambres: { label: 'Chambres', icon: BedDouble },
  sallesDeBain: { label: 'Salles de bain', icon: Bath },
  meuble: { label: 'Meublé', icon: Sofa },
  dpe: { label: 'Classe énergie', icon: Zap },
};
