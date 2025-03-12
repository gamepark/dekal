import { Direction, directions, isMoveItemType, ItemMove, Location, MaterialMove, MoveItem, PlayerTurnRule, XYCoordinates } from '@gamepark/rules-api'
import range from 'lodash/range'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class ChooseRevealedCard extends PlayerTurnRule {
  getPlayerMoves() {
    if (this.cardOutsizeSquare) return []
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
    return this.tableau.location((l) => this.isOutside(l)).getItem()!
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

  get firstPlayer() {
    return this.remind(Memory.FirstPlayer)
  }

  beforeItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move)) return []
    const cardOutsize = this.cardOutsizeSquare
    const nextPlayer = this.nextPlayer
    if (!cardOutsize) {
      if (nextPlayer === this.firstPlayer) return [this.startSimultaneousRule(RuleId.ChooseCard, this.game.players)]
      return [this.startPlayerTurn(RuleId.ChooseRevealedCard, this.nextPlayer)]
    }

    if (!this.isOutside(move.location as Location)) return []
    return this.moveCardBetweenFreeSpaceAndPlacedCard(move)
  }

  isOutside(location: Location) {
    return location.x! < 0 || location.x! > 3 || location.y! < 0 || location.y! > 3
  }

  moveCardBetweenFreeSpaceAndPlacedCard(move: MoveItem) {
    const freeSpace = this.emptySpace!
    const moves: MaterialMove[] = []
    if (move.location.x! < 0) {
      moves.push(
        ...this.getCardInLineBetweenMovedAndFreeSpace(move.location.y!, move.location.x!, freeSpace.x)
          .moveItems((item) => ({
            ...item.location,
            x: item.location.x! + 1
          }))
      )
    }
    if (move.location.x! > 3) {
      moves.push(
        ...this.getCardInLineBetweenMovedAndFreeSpace(move.location.y!, freeSpace.x, move.location.x!)
          .moveItems((item) => ({
            ...item.location,
            x: item.location.x! - 1
          }))
      )
    }

    if (move.location.y! < 0) {
      moves.push(
        ...this.getCardInColumnBetweenMovedAndFreeSpace(move.location.x!, move.location.y!, freeSpace.y)
          .moveItems((item) => ({
            ...item.location,
            y: item.location.y! + 1
          }))
      )

    }
    if (move.location.y! > 3) {
      moves.push(
        ...this.getCardInColumnBetweenMovedAndFreeSpace(move.location.x!, freeSpace.y, move.location.y!)
          .moveItems((item) => ({
            ...item.location,
            y: item.location.y! - 1
          }))
      )
    }

    return moves
  }

  getCardInLineBetweenMovedAndFreeSpace(y: number, fromX: number, toX: number) {
    const allX = range(fromX + 1, toX)
    return this.tableau.location((l) => l.y === y && allX.includes(l.x!))
  }

  getCardInColumnBetweenMovedAndFreeSpace(x: number, fromY: number, toY: number) {
    const allY = range(fromY + 1, toY)
    return this.tableau.location((l) => l.x === x && allY.includes(l.y!))
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