/** @jsxImportSource @emotion/react */
import { css, Interpolation, Theme } from '@emotion/react'
import { LocationType } from '@gamepark/dekal/material/LocationType'
import { isOutside } from '@gamepark/dekal/rules/utils/square.utils'
import { DropAreaDescription, LocationContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { gameCardDescription } from '../material/GameCardDescription'

export class TableauLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext): Partial<Coordinates> {
    let base = { x: 0, y: 20, z: 0.5 }
    if (context.rules.players.length === 2) {
      if (location.player === (context.player ?? context.rules.players[0])) {
        base.x -= 30
      } else {
        base.x += 10
      }
    }

    base.x += location.x! * (gameCardDescription.width + .5)
    base.y += location.y! * (gameCardDescription.height + .5)

    return base
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
