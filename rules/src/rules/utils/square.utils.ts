import { Location } from '@gamepark/rules-api'

export const isOutside = (location: Location) => {
  return location.x! < 0 || location.x! > 3 || location.y! < 0 || location.y! > 3
}
