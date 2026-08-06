import { OptionsSpecV2 } from '@gamepark/rules-api'

/**
 * This is the options for each player in the game.
 */
export type PlayerId = number

/**
 * This is the type of object that the game receives when a new game is started.
 * The first generic parameter, "{}", can be changed to include game options like variants or expansions.
 */
export type DekalOptions = {
  players: number
}

/**
 * The option space of dekal: structure only.
 *
 * Labels live in the game's presentation document, published beside its translations at
 * `/options/<locale>.json` and keyed by convention. Subscription and competitive gates live in
 * the platform database, so they can change without releasing the game again.
 */
export const DekalOptionsSpecV2: OptionsSpecV2 = {
  specVersion: 2,
  players: { min: 2, max: 6 }
}
