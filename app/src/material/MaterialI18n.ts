import { MaterialType } from '@gamepark/dekal/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { firstPlayerTokenDescriptionFr } from './FirstPlayerTokenDescription'

export const MaterialI18n: Record<string, Partial<Record<MaterialType, MaterialDescription>>> = {
  fr: {
    [MaterialType.FirstPlayer]: firstPlayerTokenDescriptionFr
  }
}
