import { MaterialGameSetup, MaterialItem } from '@gamepark/rules-api'
import range from 'lodash/range'
import sample from 'lodash/sample'
import shuffle from 'lodash/shuffle'
import times from 'lodash/times'
import { DekalOptions, PlayerId } from './DekalOptions'
import { DekalRules } from './DekalRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class DekalSetup extends MaterialGameSetup<PlayerId, MaterialType, LocationType, DekalOptions> {
  Rules = DekalRules

  setupMaterial(_options: DekalOptions) {
    this.setupPlayersTableaux()
    this.setupFirstPlayerToken()
  }

  setupFirstPlayerToken() {
    this.material(MaterialType.FirstPlayer)
      .createItem({
        location: {
          type: LocationType.FirstPlayerArea,
          player: sample(this.players)
        }
      })
  }

  setupPlayersTableaux() {
    const cards = range(1, 11).flatMap((v) => times(10, () => v))
    const shuffledCards = shuffle(cards)
    for (const player of this.players) {
      this.setupPlayerTableau(shuffledCards, player)
    }
  }

  setupPlayerTableau(cards: number[], playerId: PlayerId) {
    const playerCards: number[] = cards
      .slice((playerId - 1) * 16, playerId * 16)
    const items: MaterialItem[] = []

    for (let i = 0; i < 16; i++) {
      const card = playerCards[i]
      items.push({
        id: card,
        location: {
          type: LocationType.Tableau,
          player: playerId,
          x: i % 4,
          y: Math.floor(i / 4),
          rotation: true
        }
      })
    }

    this.material(MaterialType.Card).createItems(items)
  }

  start() {
    this.startSimultaneousRule(RuleId.ChooseCard, this.players)
  }
}
