import { LocationType } from '@gamepark/dekal/material/LocationType'
import { getRelativePlayerIndex, Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { tableauLocator } from './TableauLocator'

export class FirstPlayerAreaLocator extends Locator {

  getCoordinates(location: Location, context: MaterialContext): Partial<Coordinates> {
    if (location.player === undefined) return { x: 0, y: 12 }
    const index = getRelativePlayerIndex(context, location.player)
    console.log(index)
    const coordinates = tableauLocator.getCoordinates({ type: LocationType.Tableau, player: location.player, x: 0, y: 0 }, context)

    if (context.rules.players.length === 2) {
      coordinates.x! += 10
      coordinates.y! -= 10
    }

    // TODO: 3 & 4 players
    return coordinates
  }
}

export const firstPlayerAreaLocator = new FirstPlayerAreaLocator()
