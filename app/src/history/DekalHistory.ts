/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/dekal/material/LocationType'
import { MaterialType } from '@gamepark/dekal/material/MaterialType'
import { RuleId } from '@gamepark/dekal/rules/RuleId'
import { isOutside } from '@gamepark/dekal/rules/utils/square.utils'
import { LogDescription, MoveComponentContext } from '@gamepark/react-game'
import { isEndGame, isMoveItemType, Location, MaterialMove } from '@gamepark/rules-api'
import { ChangeFirstPlayerLog } from './components/ChangeFirstPlayerLog'
import { ChooseCardLog } from './components/ChooseCardLog'
import { ChooseRevealedCardLog } from './components/ChooseRevealedCardLog'
import { RevealedCardLog } from './components/RevealedCardLog'
import { ScoreLog } from './components/ScoreLog'

export class DekalHistory implements LogDescription {
  getMovePlayedLogDescription(move: MaterialMove, context: MoveComponentContext) {
      if (context.game.rule?.id === RuleId.ChooseCard && isMoveItemType(MaterialType.Card)(move) && move.location.rotation && move.location.type === LocationType.DropArea) {
        return { Component: ChooseCardLog, player: move.location.player }
      }

      if (context.game.rule?.id === RuleId.RevealCard && isMoveItemType(MaterialType.Card)(move) && !move.location.rotation) {
        return { Component: RevealedCardLog, player: move.location.player }
      }

      if (context.game.rule?.id === RuleId.ChooseRevealedCard && isMoveItemType(MaterialType.Card)(move) && isOutside(move.location as Location)) {
        return { Component: ChooseRevealedCardLog, player: context.game.rule.player }
      }

      if (isMoveItemType(MaterialType.FirstPlayer)(move)) {
        return { Component: ChangeFirstPlayerLog }
      }

      if (isEndGame(move)) {
        return { Component: ScoreLog }
      }

      return
    }
}
