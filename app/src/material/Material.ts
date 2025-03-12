import { MaterialType } from '@gamepark/dekal/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { gameCardDescription } from './GameCardDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.Card]: gameCardDescription
}
