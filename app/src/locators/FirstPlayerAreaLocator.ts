import { LocationType } from '@gamepark/dekal/material/LocationType'
import { getRelativePlayerIndex, Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { isLeftPosition, isTopPosition, playerPositions } from './position.utils'
import { tableauLocator } from './TableauLocator'

export class FirstPlayerAreaLocator extends Locator {

  getCoordinates(location: Location, context: MaterialContext): Partial<Coordinates> {
    const index = getRelativePlayerIndex(context, location.player)
    const position = playerPositions[context.rules.players.length - 2][index]
    const coordinates = tableauLocator.getCoordinates({ type: LocationType.Tableau, player: location.player, x: 0, y: 0 }, context)

    if (!isTopPosition(position)) {
      coordinates.x! += isLeftPosition(position)? 28: -7
      coordinates.y! -= 7
    } else {
      coordinates.x! += isLeftPosition(position)? 28: -7
      coordinates.y! += 28
    }

    return coordinates
  }
}

export const firstPlayerAreaLocator = new FirstPlayerAreaLocator()
