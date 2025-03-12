import { MaterialGame, MaterialItem, MaterialMove, PositiveSequenceStrategy, SecretMaterialRules, TimeLimit } from '@gamepark/rules-api'
import { PlayerId } from './DekalOptions'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { ChooseCardRule } from './rules/ChooseCardRule'
import { ChooseRevealedCard } from './rules/ChooseRevealedCard'
import { RevealRule } from './rules/RevealRule'
import { RuleId } from './rules/RuleId'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class DekalRules extends SecretMaterialRules<PlayerId, MaterialType, LocationType>
  implements TimeLimit<MaterialGame<PlayerId, MaterialType, LocationType>, MaterialMove<PlayerId, MaterialType, LocationType>, PlayerId> {
  rules = {
    [RuleId.ChooseCard]: ChooseCardRule,
    [RuleId.RevealCard]: RevealRule,
    [RuleId.ChooseRevealedCard]: ChooseRevealedCard
  }

  locationsStrategies = {
    [MaterialType.Card]: {
      [LocationType.DropArea]: new PositiveSequenceStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.Card]: {
      [LocationType.Tableau]: hideIdIfRotated,
      [LocationType.DropArea]: hideIdIfRotated
    }
  }

  giveTime(): number {
    return 60
  }
}

const hideIdIfRotated = (item: MaterialItem) => item.location.rotation? ['id']: []