import { TokenDescription } from '@gamepark/react-game'
import FirstPlayerEn from '../images/first-player/en/first-player.png'
import FirstPlayerFr from '../images/first-player/fr/first-player.png'
import { FirstPlayerHelp } from './help/FirstPlayerHelp'

export class FirstPlayerTokenDescription extends TokenDescription {
  image = FirstPlayerEn
  height = 5.04
  width = 11.34
  transparency = true

  help = FirstPlayerHelp

  constructor(image?: string) {
    super()
    if (image) this.image = image
  }
}

export const firstPlayerTokenDescription = new FirstPlayerTokenDescription()

export const firstPlayerTokenDescriptionFr = new FirstPlayerTokenDescription(FirstPlayerFr)
