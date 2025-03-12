import { CardDescription } from '@gamepark/react-game'
import Back from '../images/cards/back.jpg'
import One from '../images/cards/1.jpg'
import Two from '../images/cards/2.jpg'
import Three from '../images/cards/3.jpg'
import Four from '../images/cards/4.jpg'
import Five from '../images/cards/5.jpg'
import Six from '../images/cards/6.jpg'
import Seven from '../images/cards/7.jpg'
import Eight from '../images/cards/8.jpg'
import Nine from '../images/cards/9.jpg'
import Ten from '../images/cards/10.jpg'

export class GameCardDescription extends CardDescription {
  height = 6
  width = 6
  backImage = Back
  images = {
     1: One,
     2: Two,
     3: Three,
     4: Four,
     5: Five,
     6: Six,
     7: Seven,
     8: Eight,
     9: Nine,
     10: Ten,
  }
}

export const gameCardDescription = new GameCardDescription()