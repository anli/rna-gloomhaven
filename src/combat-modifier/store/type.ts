export interface Card {
  name: string;
  imageUrl: string;
  isShuffle?: boolean;
}

export interface Perk {
  name: string;
  totalCount: number;
  activeCount: number;
}

export interface PerkSelection {
  [name: string]: number;
}

export interface State {
  cards: Card[];
  perkSelection: PerkSelection;
  characterSelection: string;
  drawCards: Card[];
  discardCards: Card[];
  minusOneCards: Card[];
}

export type SliceProps =
  | 'combatModifier'
  | 'combatModifier2'
  | 'combatModifier3'
  | 'combatModifier4';

export type CharacterPerk = Omit<Perk, 'activeCount'>;
