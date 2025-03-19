import { isMoveItemType, ItemMove, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { PlayerId } from '../DekalOptions'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class RevealRule extends MaterialRulesPart {
  onRuleStart() {
    console.log(this.hiddenDropArea.length)
    return this.hiddenDropArea.rotateItems(false)
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move) || this.hiddenDropArea.length) return []
    return this.goToRevealedCard()
  }

  goToRevealedCard() {
    const moves: MaterialMove[] = []
    moves.push(this.startPlayerTurn(RuleId.ChooseRevealedCard, this.actualPlayer))
    return moves
  }

  /**
   * Utility function to get the id of the next player in the table order
   */
  get actualPlayer(): PlayerId {
    return  this.material(MaterialType.FirstPlayer).getItem()!.location.player!
  }

  get hiddenDropArea() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.DropArea)
      .rotation(true)
  }
}
