import { areAdjacentSquares, MaterialMove, MaterialRulesPart, XYCoordinates } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'

export class CleanupTableauRule extends MaterialRulesPart {
  onRuleStart() {
    const moves: MaterialMove[] = this.cleanupAdjacent()
    moves.push(this.endGame())
    return moves
  }

  cleanupAdjacent() {
    const moves: MaterialMove[] = []
    for (let id = 1; id <= 10; id ++) {
      const cleanupMove = this.cleanupAdjacentFor(id)
      if (cleanupMove) moves.push(cleanupMove)
    }

    return moves
  }

  cleanupAdjacentFor(id: number): MaterialMove | undefined {
    const cardOfValue = this
      .material(MaterialType.Card)
      .location(LocationType.Tableau)
      .id(id)
    const cardIndexes = cardOfValue.getIndexes()
    const cardItems = cardOfValue.getItems()

    const indexToDelete: number[] = []
    for (const index of cardIndexes) {
      const theCard = cardOfValue.index(index).getItem()!
      if (indexToDelete.includes(index)) continue
      if (cardItems
        .some((item) => item.location.player === theCard.location.player && areAdjacentSquares(item.location as XYCoordinates, theCard.location as XYCoordinates))) {
        indexToDelete.push(index)
      }
    }

    if (!indexToDelete.length) return

    return cardOfValue
      .index(indexToDelete)
      .deleteItemsAtOnce()
  }
}
