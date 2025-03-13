import { LocationType } from '@gamepark/dekal/material/LocationType'
import { MaterialType } from '@gamepark/dekal/material/MaterialType'
import { isOutside } from '@gamepark/dekal/rules/utils/square.utils'
import { MaterialGameAnimations } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'

export const gameAnimations = new MaterialGameAnimations()

gameAnimations
  .when()
  .move((move, context) => isMoveItemType(MaterialType.Card)(move)
    && context.rules.material(MaterialType.Card).getItem(move.itemIndex)!.location.type === LocationType.Tableau
    && !isOutside(context.rules.material(MaterialType.Card).getItem(move.itemIndex)!.location)
    && move.location.type === LocationType.Tableau)
  .duration(0)

gameAnimations
  .when()
  .move((move, context) => isMoveItemType(MaterialType.Card)(move)
    && context.rules.material(MaterialType.Card).getItem(move.itemIndex)!.location.type === LocationType.Tableau
    && isOutside(context.rules.material(MaterialType.Card).getItem(move.itemIndex)!.location)
    && move.location.type === LocationType.Tableau)
  .duration(0.2)

