/** @jsxImportSource @emotion/react */
import { css, Interpolation, Theme } from '@emotion/react'
import { LocationType } from '@gamepark/dekal/material/LocationType'
import { isOutside } from '@gamepark/dekal/rules/utils/square.utils'
import { DropAreaDescription, getRelativePlayerIndex, LocationContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, XYCoordinates } from '@gamepark/rules-api'
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
        return { x: 10, y: 20, z: 0.5 }
      case Position.BottomLeft:
      default:
        if (players === 3) return { x: -50, y: 20, z: 0.5 }
        if (players === 4) return { x: -40, y: 20, z: 0.5 }
        return { x: -30, y: 20, z: 0.5 }
    }
  }

  getLocations(context: MaterialContext) {
    const locations: Location[] = []
    for (const player of context.rules.players) {
      for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 4; y++) {
          //const itemOnPosition = context.rules.material(MaterialType.Card).player(player).location((l) => l.x === x && l.y === y)
          //if (itemOnPosition.length) continue
          locations.push({
            type: LocationType.Tableau,
            player: player,
            x: x,
            y: y,
          })
        }
      }
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
}

export const tableauLocator = new TableauLocator()
