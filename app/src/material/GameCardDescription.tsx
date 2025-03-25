import { css, Interpolation, Theme } from '@emotion/react'
import { faHandPointer } from '@fortawesome/free-regular-svg-icons/faHandPointer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LocationType } from '@gamepark/dekal/material/LocationType'
import { MaterialType } from '@gamepark/dekal/material/MaterialType'
import { RuleId } from '@gamepark/dekal/rules/RuleId'
import { isOutside } from '@gamepark/dekal/rules/utils/square.utils'
import { CardDescription, ItemContext, ItemMenuButton } from '@gamepark/react-game'
import { isMoveItemType, MaterialItem, MaterialMove, Location } from '@gamepark/rules-api'
import One from '../images/cards/1.jpg'
import Ten from '../images/cards/10.jpg'
import Two from '../images/cards/2.jpg'
import Three from '../images/cards/3.jpg'
import Four from '../images/cards/4.jpg'
import Five from '../images/cards/5.jpg'
import Six from '../images/cards/6.jpg'
import Seven from '../images/cards/7.jpg'
import Eight from '../images/cards/8.jpg'
import Nine from '../images/cards/9.jpg'
import Back from '../images/cards/back.jpg'
import { GameCardHelp } from './help/GameCardHelp'

export class GameCardDescription extends CardDescription {
  height = 6
  width = 6
  backImage = Back
  images: Record<number, string> = {
    1: One,
    2: Two,
    3: Three,
    4: Four,
    5: Five,
    6: Six,
    7: Seven,
    8: Eight,
    9: Nine,
    10: Ten
  }

  menuAlwaysVisible = true

  getItemExtraCss(item: MaterialItem, context: ItemContext): Interpolation<Theme> {
    if (item.location.type !== LocationType.DropArea) return
    const selected = context.rules.material(context.type).selected(true)
    if(selected.length && !item.selected) return css`> div > div { filter: brightness(50%) }`
    return
  }

  getItemMenu(_item: MaterialItem, context: ItemContext, legalMoves: MaterialMove[]) {
    const chooseCard = legalMoves.find((move) => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.DropArea && move.itemIndex === context.index)

    if (chooseCard) {
      return (
        <>
          <ItemMenuButton
            move={chooseCard}
            radius={2.5}
            angle={180}>
            <FontAwesomeIcon icon={faHandPointer  }/>
          </ItemMenuButton>
        </>
      )
    }

    const place = legalMoves.find((move) => isMoveItemType(MaterialType.Card)(move)
      && move.location.type === LocationType.Tableau
      && move.itemIndex === context.index && isOutside(move.location as Location))

    if (place) {
      const selected = context.rules.material(MaterialType.Card).index(context.index).getItem()!.selected
      const move = selected?
        context.rules.material(MaterialType.Card).index(context.index).unselectItem():
        context.rules.material(MaterialType.Card).index(context.index).selectItem()
      return (
        <>
          <ItemMenuButton
            move={move}
            options={{ local: true }}
            radius={2.5}
            angle={180}>
            <FontAwesomeIcon icon={faHandPointer}/>
          </ItemMenuButton>
        </>
      )
    }

    return
  }

  getShortClickLocalMove(context: ItemContext) {
    const { rules } = context
    if (rules.game.rule?.id === RuleId.ChooseRevealedCard && context.player === rules.getActivePlayer()) {
      const card = rules.material(MaterialType.Card).index(context.index)
      const item = card.getItem()!
      const { tutorial } = rules.game

      if (tutorial?.step && [5, 6, 7, 9].includes(tutorial.step)) return
      if (tutorial?.step && tutorial.step === 8 && item.location.player === context.player) return
      if (item.location.type !== LocationType.DropArea || item.selected) return
      return rules.material(MaterialType.Card).index(context.index).selectItem()
    }

    return
  }


  canShortClick(move: MaterialMove, context: ItemContext): boolean {
    if (!isMoveItemType(MaterialType.Card)(move) || move.location.type !== LocationType.DropArea) return false
    return move.itemIndex === context.index
  }

  help = GameCardHelp
}

export const gameCardDescription = new GameCardDescription()
