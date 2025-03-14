import { Direction, directions, isMoveItemType, ItemMove, Location, MaterialMove, MoveItem, PlayerTurnRule, XYCoordinates } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'
import { isOutside } from './utils/square.utils'

export class ChooseRevealedCard extends PlayerTurnRule {
  getPlayerMoves() {
    if (this.cardOutsizeSquare.length) return []
    const availableCards = this.availableCards
    return this.possibleSpaces.flatMap((space) => availableCards.moveItems({
      type: LocationType.Tableau,
      player: this.player,
      ...space
    }))
  }

  get availableCards() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.DropArea)
  }

  get cardOutsizeSquare() {
    return this.tableau.location((l) => isOutside(l))
  }

  get possibleSpaces() {
    const emptySpace = this.emptySpace!
    const spaces: XYCoordinates[] = []
    for (const direction of directions) {
      if (direction === Direction.North) {
        if (emptySpace?.y === 0) continue
        spaces.push({ x: emptySpace.x, y: -1 })
      }

      if (direction === Direction.South) {
        if (emptySpace?.y === 3) continue
        spaces.push({ x: emptySpace.x, y: 4 })
      }


      if (direction === Direction.East) {
        if (emptySpace?.x === 3) continue
        spaces.push({ x: 4, y: emptySpace.y })
      }

      if (direction === Direction.West) {
        if (emptySpace?.x === 0) continue
        spaces.push({ x: -1, y: emptySpace.y })
      }
    }

    return spaces
  }

  beforeItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move) ) return []

    if (isOutside(move.location as Location)) {
      return this.moveCardBetweenFreeSpaceAndPlacedCard(move)
    }

    return []
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move)) return []
    const cardOutsize = this.cardOutsizeSquare
    if (cardOutsize.length) return []
    if (this.isEnded) return [this.startRule(RuleId.CleanupTableau)]
    if (this.availableCards.length === 0) return [this.startSimultaneousRule(RuleId.ChooseCard, this.game.players)]
    return [this.startPlayerTurn(RuleId.ChooseRevealedCard, this.nextPlayer)]
  }

  get isEnded() {
    return this.hiddenCards.length === 0 && this.availableCards.length === 0
  }

  get hiddenCards() {
    return this.material(MaterialType.Card)
      .location(LocationType.Tableau)
      .rotation(true)
  }

  moveCardBetweenFreeSpaceAndPlacedCard(move: MoveItem) {
    const freeSpace = this.emptySpace!
    const tableau = this.tableau
    const card = this.material(MaterialType.Card).index(move.itemIndex)
    const moves: MaterialMove[] = []
    const targetLocation = move.location as Location
    if (move.location.x! < 0) {
      moves.push(
        ...tableau
          .location((l) => l.y === move.location.y && l.x! > move.location.x! && l.x! < freeSpace.x)
          .sort((i) => -i.location.x!)
          .moveItems((item) => ({
            ...item.location,
            x: item.location.x! + 1
          })),
        card.moveItem({
            ...targetLocation,
            x: targetLocation.x! + 1
        })
      )
    }
    if (move.location.x! > 3) {
      moves.push(
        ...tableau
          .location((l) => l.y === move.location.y && l.x! > freeSpace.x! && l.x! < move.location.x!)
          .sort((i) => i.location.x!)
          .moveItems((item) => ({
            ...item.location,
            x: item.location.x! - 1
          })),
        card.moveItem({
            ...targetLocation,
            x: targetLocation.x! - 1
        })
      )
    }

    if (move.location.y! < 0) {
      moves.push(
        ...tableau
          .location((l) => l.x === move.location.x && l.y! > move.location.y! && l.y! < freeSpace.y)
          .sort((i) => -i.location.y!)
          .moveItems((item) => ({
            ...item.location,
            y: item.location.y! + 1
          })),
        card.moveItem({
          ...targetLocation,
          y: targetLocation.y! + 1
        })
      )

    }
    if (move.location.y! > 3) {
      moves.push(
        ...tableau
          .location((l) => l.x === move.location.x && l.y! > freeSpace.y && l.y! < move.location.y!)
          .sort((i) => i.location.y!)
          .moveItems((item) => ({
            ...item.location,
            y: item.location.y! - 1
          })),
        card.moveItem({
          ...targetLocation,
          y: targetLocation.y! - 1
        })
      )
    }

    return moves
  }

  get emptySpace() {
    const tableau = this.tableau
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        const item = tableau.location((l) => l.x == x && l.y == y)
        if (!item.length) return { x, y }
      }
    }

    return
  }

  get tableau() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.Tableau)
      .player(this.player)

  }
}
