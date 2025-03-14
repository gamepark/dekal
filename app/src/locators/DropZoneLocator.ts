import { LocationType } from '@gamepark/dekal/material/LocationType'
import { getRelativePlayerIndex, Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { gameCardDescription } from '../material/GameCardDescription'
import { isLeftPosition, isTopPosition, playerPositions } from './position.utils'
import { tableauLocator } from './TableauLocator'

class DropZoneLocator extends Locator {

  gap = { x: gameCardDescription.height + 0.5 }

  getCoordinates(location: Location, context: MaterialContext): Partial<Coordinates> {
    const index = getRelativePlayerIndex(context, location.player)
    const position = playerPositions[context.rules.players.length - 2][index]
    const coordinates = tableauLocator.getCoordinates({ type: LocationType.Tableau, player: location.player, x: 0, y: 0 }, context)
    console.log(position, location.player, coordinates)

    if (context.rules.players.length === 2) {
      coordinates.y! -= 10
      coordinates.x! += isLeftPosition(position)? 38: -20
    } else {
      coordinates.x! += isLeftPosition(position)? 45: -25
      coordinates.y! += isTopPosition(position)? 25: -5
    }

    return coordinates
  }
}

export const dropAreaLocator = new DropZoneLocator()
