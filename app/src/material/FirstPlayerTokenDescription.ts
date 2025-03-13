import { TokenDescription } from '@gamepark/react-game'
import FirstPlayer from '../images/first-player/first-player.png'

export class FirstPlayerTokenDescription extends TokenDescription {
  image = FirstPlayer
  height = 2.8
  width = 6.3
}

export const firstPlayerTokenDescription = new FirstPlayerTokenDescription()
