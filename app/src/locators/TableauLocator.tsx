/** @jsxImportSource @emotion/react */
import { css, Interpolation, Theme } from '@emotion/react'
import { LocationType } from '@gamepark/dekal/material/LocationType'
import { MaterialType } from '@gamepark/dekal/material/MaterialType'
import { ChooseRevealedCard } from '@gamepark/dekal/rules/ChooseRevealedCard'
import { isOutside } from '@gamepark/dekal/rules/utils/square.utils'
import { DropAreaDescription, getRelativePlayerIndex, isItemContext, LocationContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, isMoveItemType, Location, MaterialMove, XYCoordinates } from '@gamepark/rules-api'
import isEqual from 'lodash/isEqual'
import { gameCardDescription } from '../material/GameCardDescription'
import { playerPositions, Position } from './position.utils'
import Arrow from '../images/arrow.png'

export class TableauLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext): Partial<Coordinates> {
    let base = this.getBaseCoordinates(location, context)
    base.x += location.x! * (gameCardDescription.width + .5)
    base.y += location.y! * (gameCardDescription.height + .5)

    if (isItemContext(context)) {
      base.z = 0.5
    }

    return base
  }

  getBaseCoordinates(location: Location, context: MaterialContext): XYCoordinates & { z?: number } {
    const playerIndex = getRelativePlayerIndex(context, location.player)
    const position = playerPositions[context.rules.players.length - 2][playerIndex]
    const players = context.rules.players.length
    switch (position) {
      case Position.TopLeft:
        if (players >= 5) return { x: -56, y: -17.5 }
        return { x: -40, y: -17.5 }
      case Position.TopCenter:
        if (players === 6) return { x: -5, y: -17.5 }
        return { x: -10, y: -17.5 }
      case Position.TopRight:
        if (players >= 5) return { x: 36, y: -17.5 }
        return { x: 20, y: -17.5 }
      case Position.BottomRight:
        if (players === 3) return { x: 25, y: 17.5 }
        if (players === 4) return { x: 20, y: 17.5 }
        if (players >= 5) return { x: 36, y: 17.5 }
        return { x: 15, y: 21 }
      case Position.BottomCenter:
        if (players === 6) return { x: -5, y: 17.5 }
        return { x: -10, y: 17.5 }
      case Position.BottomLeft:
      default:
        if (players === 3) return { x: -45, y: 17.5 }
        if (players === 4) return { x: -40, y: 17.5 }
        if (players >= 5) return { x: -56, y: 17.5 }
        return { x: -35, y: 21 }
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
            y: y
          })
        }
      }
    }


    const { rules } = context
    const selected = rules.material(MaterialType.Card).selected()

    if (selected.length) {
      const player = rules.getActivePlayer()
      const possibleSpaces = new ChooseRevealedCard(context.rules.game).possibleSpaces
      const { tutorial } = rules.game
      if (tutorial?.step && tutorial.step === 8 && player === context.player) {
        locations.push({
          type: LocationType.Tableau,
          player: context.player,
          x: 3,
          y: -1
        })
        return locations
      }

      if (tutorial?.step && tutorial.step === 16 && player === context.player) {
        locations.push({
          type: LocationType.Tableau,
          player: context.player,
          x: 4,
          y: 1
        })
        return locations
      }


      locations.push(
        ...possibleSpaces.map((space) => ({
          type: LocationType.Tableau,
          player: player,
          ...space
        }))
      )

    }


    return locations
  }

  getRotateZ(location: Location, context: MaterialContext): number {
    if (!isOutside(location) || isItemContext(context)) return super.getRotateZ(location, context)
    return this.locationDescription.getArrowRotation(location)
  }

  locationDescription = new TableauDescription()

}

class TableauDescription extends DropAreaDescription {
  constructor() {
    super(gameCardDescription)
  }

  image = Arrow


  getExtraCss(location: Location, _context: LocationContext): Interpolation<Theme> {
    if (isOutside(location)) {
      return css`
          background: url(${Arrow}) no-repeat center;
          background-size: ${gameCardDescription.width * 0.9}em;
      `
    }
    return css`
        background-image: linear-gradient(45deg, #ffffff30 25%, #ffffff00 25%, #ffffff00 50%, #ffffff30 50%, #ffffff30 75%, #ffffff00 75%, #ffffff00 100%);
        background-size: 57px 57px;
    `
  }

  getArrowRotation(location: Location) {
    if (location.y! < 0) return 90
    if (location.x! > 3) return 180
    if (location.y! > 3) return 270
    return 0
  }

  canShortClick(move: MaterialMove, location: Location, context: MaterialContext) {
    const { rules } = context
    const selected = rules.material(MaterialType.Card).selected()
    if (selected.length && isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.Tableau) {
      if (!isEqual(move.location, location)) return false
      return selected.getIndex() === move.itemIndex
    }
    return super.canShortClick(move, location, context)
  }
}

export const tableauLocator = new TableauLocator()
