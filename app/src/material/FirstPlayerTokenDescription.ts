import { TokenDescription } from '@gamepark/react-game'
import FirstPlayer from '../images/first-player/first-player.png'
import { FirstPlayerHelp } from './help/FirstPlayerHelp'

export class FirstPlayerTokenDescription extends TokenDescription {
  image = FirstPlayer
  height = 5.04
  width = 11.34

  help = FirstPlayerHelp
}

export const firstPlayerTokenDescription = new FirstPlayerTokenDescription()
