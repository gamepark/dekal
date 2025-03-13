import { PlayerId } from '@gamepark/dekal/DekalOptions'
import { LocationType } from '@gamepark/dekal/material/LocationType'
import { MaterialType } from '@gamepark/dekal/material/MaterialType'
import { Locator } from '@gamepark/react-game'
import { dropAreaLocator } from './DropZoneLocator'
import { firstPlayerAreaLocator } from './FirstPlayerAreaLocator'
import { tableauLocator } from './TableauLocator'

export const Locators: Partial<Record<LocationType, Locator<PlayerId, MaterialType, LocationType>>> = {
  [LocationType.Tableau]: tableauLocator,
  [LocationType.DropArea]: dropAreaLocator,
  [LocationType.FirstPlayerArea]: firstPlayerAreaLocator
}
