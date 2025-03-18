import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import sum from 'lodash/sum'
import { PlayerId } from '../../DekalOptions'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'

export class ScoringHelper extends MaterialRulesPart {
  constructor(game: MaterialGame, readonly playerId: PlayerId) {
    super(game)
  }

  get score() {
    return sum(
      this
        .tableau
        .getItems()
        .map((item) => item.id)
    )
  }

  get tableau() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.Tableau)
      .player(this.playerId)
  }
}