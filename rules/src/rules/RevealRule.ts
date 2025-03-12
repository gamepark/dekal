import { isMoveItemType, ItemMove, MaterialRulesPart } from '@gamepark/rules-api'
import { PlayerId } from '../DekalOptions'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory, PlayerLootCard } from './Memory'
import { RuleId } from './RuleId'

export class RevealRule extends MaterialRulesPart {
  onRuleStart() {
    return this.hiddenDropArea.rotateItems(false)
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move) || this.hiddenDropArea.length) return []
    const firstPlayer = this.firstPlayer
    this.memorize(Memory.FirstPlayer, firstPlayer)
    return [this.startPlayerTurn(RuleId.ChooseRevealedCard, firstPlayer)]
  }

  get firstPlayer(): PlayerId {
    let first: { player: PlayerId, value: number } | undefined = undefined
    for (const card of this.lootCards) {
      const item = this.material(MaterialType.Card).getItem(card.itemIndex)!
      if (!first || first.value > item.id) first = { player: card.player, value: item.id }
      // TODO: TIE
    }

    console.log(first)

    return first!.player
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

  get visibleDropArea() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.DropArea)
      .rotation((r) => !r)
  }
}