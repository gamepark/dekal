import { isMoveItemType, ItemMove, MoveItem, SimultaneousRule } from '@gamepark/rules-api'
import { PlayerId } from '../DekalOptions'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory, PlayerLootCard } from './Memory'
import { RuleId } from './RuleId'

export class ChooseCardRule extends SimultaneousRule<PlayerId, MaterialType, LocationType> {
  onRuleStart() {
    this.forget(Memory.FirstPlayer)
    this.forget(Memory.LootCards)
    return []
  }
  getActivePlayerLegalMoves(player:PlayerId) {
    return this.getTableau(player)
      .moveItems({
        type: LocationType.DropArea,
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
    this.persistLootCard(move, player)
    return [this.endPlayerTurn(player)]
  }

  persistLootCard(move: MoveItem, player: PlayerId) {
    this.memorize<PlayerLootCard[]>(Memory.LootCards, (cards: PlayerLootCard[] = []) => {
      cards.push({
        player: player,
        itemIndex: move.itemIndex
      })

      return cards
    })
  }

  getMovesAfterPlayersDone() {
    return [this.startRule(RuleId.RevealCard)]
  }
}
