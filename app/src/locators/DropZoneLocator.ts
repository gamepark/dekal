import { getRelativePlayerIndex, Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { gameCardDescription } from '../material/GameCardDescription'

class DropZoneLocator extends Locator {

  gap = { x: gameCardDescription.height + 0.5 }

  getCoordinates(location: Location, context: MaterialContext): Partial<Coordinates> {
    const index = getRelativePlayerIndex(context, location.player)
    const players = context.rules.players.length
    //const position = playerPositions[players - 2][index]
    if (players === 6) return this.getSixPlayerDropArea(location, context)
    if (players === 5) return this.getFivePlayerDropArea(location)
    if (players === 4) return this.getFourPlayerDropArea(location)
    if (players === 2) return this.getTwoPlayerDropArea(location, context)

    //const coordinates = tableauLocator.getCoordinates({ type: LocationType.Tableau, player: location.player, x: 0, y: 0 }, context)

    if (context.rules.players.length === 3) {

      const delta = Math.floor(players / 2)
      const baseX = -((delta * gameCardDescription.height + .5))
      return {
        x: baseX + index * (gameCardDescription.width + .5),
        y: 2,
      }
    }

    return { x: 0, y: 0 }
  }

  getTwoPlayerDropArea(location: Location, context: MaterialContext)  {
    const index = getRelativePlayerIndex(context, location.player)
    return {
      x: 0,
        y: 21 + index * (gameCardDescription.height + 0.5),
  }
  }

  getSixPlayerDropArea(location: Location, context: MaterialContext) {
    const delta = 3
    const baseY = 6 -((delta * gameCardDescription.height + .5)) + (context.player !== undefined? 4: 0)
    return {
      x: -20.5,
      y: baseY + (location.player! * (gameCardDescription.height + .5))
    }
  }

  getFourPlayerDropArea(location: Location) {
    const baseY = 17.5
    return {
      x: 0,
      y: baseY + ((location.player! - 1) * (gameCardDescription.height + .5))
    }
  }

  getFivePlayerDropArea(location: Location) {

    const x = (location.player! - 1) % 2
    const y = Math.floor((location.player! - 1) / 2)

    return {
      x: -10 + x * (gameCardDescription.width + .5) ,
      y:  17.5 + y * (gameCardDescription.height + .5)
    }
  }
}

export const dropAreaLocator = new DropZoneLocator()
