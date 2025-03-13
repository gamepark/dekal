import { MaterialType } from '@gamepark/dekal/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { firstPlayerTokenDescription } from './FirstPlayerTokenDescription'
import { gameCardDescription } from './GameCardDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.Card]: gameCardDescription,
  [MaterialType.FirstPlayer]: firstPlayerTokenDescription
}
