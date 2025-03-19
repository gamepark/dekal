import { TokenDescription } from '@gamepark/react-game'
import FirstPlayer from '../images/first-player/first-player.png'

export class FirstPlayerTokenDescription extends TokenDescription {
  image = FirstPlayer
  height = 5.04
  width = 11.34
}

export const firstPlayerTokenDescription = new FirstPlayerTokenDescription()
