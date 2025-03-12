import { Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { gameCardDescription } from '../material/GameCardDescription'

export class TableauLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext): Partial<Coordinates> {
    let base = { x: 0, y: 0 }
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
}

export const tableauLocator = new TableauLocator()