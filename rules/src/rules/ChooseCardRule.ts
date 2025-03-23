import { isMoveItemType, ItemMove, SimultaneousRule } from '@gamepark/rules-api'
import { RuleMove } from '@gamepark/rules-api/dist/material/moves'
import { RuleStep } from '@gamepark/rules-api/dist/material/rules/RuleStep'
import { PlayerId } from '../DekalOptions'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class ChooseCardRule extends SimultaneousRule<PlayerId, MaterialType, LocationType> {
  onRuleStart(_move: RuleMove, previousRule?: RuleStep) {
    if (previousRule === undefined) return []
    const nextFirstPlayer = this.game.players[(this.game.players.indexOf(this.actualFirstPlayer) + 1) % this.game.players.length]
    return [
      this.material(MaterialType.FirstPlayer)
        .moveItem({
          type: LocationType.FirstPlayerArea,
          player: nextFirstPlayer
        })
    ]
  }
  
  get actualFirstPlayer(): PlayerId {
    return  this.material(MaterialType.FirstPlayer).getItem()!.location.player!
  }


  getActivePlayerLegalMoves(player:PlayerId) {
    console.log(this.getTableau(player)
      .moveItems({
        type: LocationType.DropArea,
        player: player,
        rotation: true
      }))
    return this.getTableau(player)
      .moveItems({
        type: LocationType.DropArea,
        player: player,
        rotation: true
      })
  }

  getTableau(player: PlayerId) {
    return this
      .material(MaterialType.Card)
      .location(LocationType.Tableau)
      .rotation(true)
      .player(player)
  }

  beforeItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move)) return []
    const item = this.material(MaterialType.Card).getItem(move.itemIndex)!
    const player = item.location.player!
    return [this.endPlayerTurn(player)]
  }

  getMovesAfterPlayersDone() {
    return [this.startRule(RuleId.RevealCard)]
  }
}
