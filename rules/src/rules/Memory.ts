import { PlayerId } from '../DekalOptions'

export enum Memory {
  LootCards = 1,
  FirstPlayer
}

export type PlayerLootCard = {
  player: PlayerId,
  itemIndex: number
}