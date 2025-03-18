/** @jsxImportSource @emotion/react */
import { css, Interpolation, Theme } from '@emotion/react'
import { LocationType } from '@gamepark/dekal/material/LocationType'
import { MaterialType } from '@gamepark/dekal/material/MaterialType'
import { ChooseRevealedCard } from '@gamepark/dekal/rules/ChooseRevealedCard'
import { isOutside } from '@gamepark/dekal/rules/utils/square.utils'
import { DropAreaDescription, getRelativePlayerIndex, LocationContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, isMoveItemType, Location, MaterialMove, XYCoordinates } from '@gamepark/rules-api'
import isEqual from 'lodash/isEqual'
import { gameCardDescription } from '../material/GameCardDescription'
import { playerPositions, Position } from './position.utils'


export class TableauLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext): Partial<Coordinates> {
    let base = this.getBaseCoordinates(location, context)
    base.x += location.x! * (gameCardDescription.width + .5)
    base.y += location.y! * (gameCardDescription.height + .5)

    return base
  }

  getBaseCoordinates(location: Location, context: MaterialContext): XYCoordinates & { z?: number } {
    const playerIndex = getRelativePlayerIndex(context, location.player)
    const position = playerPositions[context.rules.players.length - 2][playerIndex]
    const players = context.rules.players.length
    switch (position) {
      case Position.TopLeft:
        return { x: -40, y: -20, z: 0.5 }
      case Position.TopCenter:
        return { x: 4, y: -17.5}
      case Position.TopRight:
        return { x: 20, y: -20, z: 0.5 }
      case Position.BottomRight:
        if (players === 3) return { x: 30, y: 20, z: 0.5 }
        if (players === 4) return { x: 20, y: 20, z: 0.5 }
        return { x: 15, y: 21, z: 0.5 }
      case Position.BottomLeft:
      default:
        if (players === 3) return { x: -50, y: 20, z: 0.5 }
        if (players === 4) return { x: -40, y: 20, z: 0.5 }
        return { x: -35, y: 21, z: 0.5 }
    }
  }


  getLocations(context: MaterialContext) {
    const locations: Location[] = []
    for (const player of context.rules.players) {
      for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 4; y++) {
          locations.push({
            type: LocationType.Tableau,
            player: player,
            x: x,
            y: y,
          })
        }
      }
    }


    const { rules } = context
    const selected = rules.material(MaterialType.Card).selected()

    if (selected.length) {
      const player = rules.getActivePlayer()
      const possibleSpaces = new ChooseRevealedCard(context.rules.game).possibleSpaces

      locations.push(
        ...possibleSpaces.map((space) => ({
          type: LocationType.Tableau,
          player: player,
          ...space
        }))
      )

      console.log("????", locations)
    }


    return locations
  }

  locationDescription = new TableauDescription()

}

class TableauDescription extends DropAreaDescription {
  constructor() {
    super(gameCardDescription)
  }

  getExtraCss(location: Location, context: LocationContext): Interpolation<Theme> {
    if (isOutside(location)) return super.getExtraCss(location, context)
    return css`
      background-image: linear-gradient(45deg, #ffffff30 25%, #ffffff00 25%, #ffffff00 50%, #ffffff30 50%, #ffffff30 75%, #ffffff00 75%, #ffffff00 100%);
      background-size: 56.57px 56.57px;
  `
  }

  canShortClick(move: MaterialMove, location: Location, context: MaterialContext) {
    const { rules } = context
    const selected = rules.material(MaterialType.Card).selected()
    if (selected.length && isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.Tableau) {
      if (!isEqual(move.location, location)) return false
      selected.getIndex() === move.itemIndex && console.log("Is move to location", selected.getIndex(), move.itemIndex, move)
      return selected.getIndex() === move.itemIndex
    }
    return super.canShortClick(move, location, context)
  }
}

export const tableauLocator = new TableauLocator()
