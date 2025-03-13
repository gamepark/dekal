import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import sample from 'lodash/sample'
import groupBy from 'lodash/groupBy'
import keys from 'lodash/keys'
import min from 'lodash/min'
import { PlayerId } from '../DekalOptions'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMoveType'
import { Memory, PlayerLootCard } from './Memory'
import { RuleId } from './RuleId'

export class RevealRule extends MaterialRulesPart {
  onRuleStart() {
    return this.hiddenDropArea.rotateItems(false)
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move) || this.hiddenDropArea.length) return []
    const lowestValuePlayers = this.lowestValuePlayers
    if (lowestValuePlayers.length === 1) {
      return this.goToRevealedCard(lowestValuePlayers[0])
    } else {
      return [this.customMove(CustomMoveType.SamplePlayer, lowestValuePlayers)]
    }
  }

  onCustomMove(move: CustomMove) {
    if (isCustomMoveType(CustomMoveType.SamplePlayer)(move)) return []
    const player = sample(move.data)
    this.memorize(Memory.FirstPlayer, player)
    return this.goToRevealedCard(player)
  }

  goToRevealedCard(player: PlayerId) {
    this.memorize(Memory.FirstPlayer, player)
    const moves: MaterialMove[] = []
    const actualPlayer = this.material(MaterialType.FirstPlayer).getItem()!.location.player
    if (player !== actualPlayer) {
      moves.push(
        this.material(MaterialType.FirstPlayer).moveItem({
          type: LocationType.FirstPlayerArea,
          player
        })
      )
    }

    moves.push(this.startPlayerTurn(RuleId.ChooseRevealedCard, player))
    return moves
  }

  get lowestValuePlayers(): PlayerId[] {
    const cardsByValue = groupBy(this.lootCards, (card) => this.material(MaterialType.Card).getItem(card.itemIndex)!.id)
    const minValue: number = +min(keys(cardsByValue))!
    return cardsByValue[minValue].map((c) => c.player)
  }

  get lootCards() {
    return this.remind<PlayerLootCard[]>(Memory.LootCards)
  }

  get hiddenDropArea() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.DropArea)
      .rotation(true)
  }
}
