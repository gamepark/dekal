import { LocationType } from '@gamepark/dekal/material/LocationType'
import { getRelativePlayerIndex, Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { isLeftPosition, isTopPosition, playerPositions, Position } from './position.utils'
import { tableauLocator } from './TableauLocator'

export class FirstPlayerAreaLocator extends Locator {

  getCoordinates(location: Location, context: MaterialContext): Partial<Coordinates> {
    const index = getRelativePlayerIndex(context, location.player)
    const position = playerPositions[context.rules.players.length - 2][index]
    const coordinates = tableauLocator.getCoordinates({ type: LocationType.Tableau, player: location.player, x: 0, y: 0 }, context)

    const players = context.rules.players.length
    if (players === 2) {
      coordinates.y! += 33
      coordinates.x! += isLeftPosition(position)? 7: 12
      return coordinates
    }


    if(players === 3) {
      coordinates.y! += 33
      coordinates.x! += position === Position.BottomCenter? 16: 10
      return coordinates
    }

    if (players === 4) {
      coordinates.x! += isLeftPosition(position)? -23: 43
      coordinates.y! += isTopPosition(position)? 1: 20
      return coordinates
    }

    if (players >= 5) {
      if (position === Position.TopCenter || position === Position.BottomCenter) {
        coordinates.x! += 4
        coordinates.y! += isTopPosition(position)? -11: 31
      } else {
        coordinates.x! += isLeftPosition(position)? -16: 36
        coordinates.y! += isTopPosition(position)? -3: 23
      }

      return coordinates
    }


    if (!isTopPosition(position)) {
      coordinates.x! += isLeftPosition(position)? 26: -7
      coordinates.y! -= 5
    } else {
      coordinates.x! += isLeftPosition(position)? 26: -7
      coordinates.y! += 30
    }

    return coordinates
  }
}

export const firstPlayerAreaLocator = new FirstPlayerAreaLocator()
