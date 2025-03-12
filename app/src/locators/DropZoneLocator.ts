import { ComponentSize, DropAreaDescription, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { gameCardDescription } from '../material/GameCardDescription'

class DropZoneLocator extends ListLocator {
  getMaxCount(_location: Location, _context: MaterialContext) {
    return _context.rules.players.length
  }

  gap = { x: gameCardDescription.height + 0.5 }

  getCoordinates(_location: Location, context: MaterialContext): Partial<Coordinates> {
    return { x: -(gameCardDescription.width + 0.5) * ((context.rules.players.length - 1) / 2), y: -10 }
  }

  locationDescription = new DropZoneDescription()
}

class DropZoneDescription extends DropAreaDescription {
  borderRadius = gameCardDescription.borderRadius
  getLocationSize(_location: Location, context: MaterialContext): ComponentSize {
    return {
      width: context.rules.players.length * gameCardDescription.height + ((context.rules.players.length - 1) * 0.5),
      height: gameCardDescription.width,
    }
  }
}

export const dropAreaLocator = new DropZoneLocator()