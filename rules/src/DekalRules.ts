import { CompetitiveRank, isCustomMoveType, MaterialGame, MaterialItem, MaterialMove, SecretMaterialRules, TimeLimit } from '@gamepark/rules-api'
import { PlayerId } from './DekalOptions'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { ChooseCardRule } from './rules/ChooseCardRule'
import { ChooseRevealedCard } from './rules/ChooseRevealedCard'
import { CleanupTableauRule } from './rules/CleanupTableauRule'
import { CustomMoveType } from './rules/CustomMoveType'
import { RevealRule } from './rules/RevealRule'
import { RuleId } from './rules/RuleId'
import { ScoringHelper } from './rules/utils/ScoringHelper'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class DekalRules extends SecretMaterialRules<PlayerId, MaterialType, LocationType>
  implements CompetitiveRank<MaterialGame<PlayerId, MaterialType, LocationType>, MaterialMove<PlayerId, MaterialType, LocationType>, PlayerId>,
    TimeLimit<MaterialGame<PlayerId, MaterialType, LocationType>, MaterialMove<PlayerId, MaterialType, LocationType>, PlayerId> {
  rules = {
    [RuleId.ChooseCard]: ChooseCardRule,
    [RuleId.RevealCard]: RevealRule,
    [RuleId.ChooseRevealedCard]: ChooseRevealedCard,
    [RuleId.CleanupTableau]: CleanupTableauRule,
  }

  locationsStrategies = {
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

  isUnpredictableMove(move: MaterialMove<PlayerId, MaterialType, LocationType>, player: PlayerId): boolean {
    return isCustomMoveType(CustomMoveType.SamplePlayer)(move) || super.isUnpredictableMove(move, player)
  }

  getScore(player: PlayerId) {
    return new ScoringHelper(this.game, player).score
  }

  rankPlayers(playerA: PlayerId, playerB: PlayerId): number {
      const playerAHelper = new ScoringHelper(this.game, playerA)
      const playerBHelper = new ScoringHelper(this.game, playerB)

    const aScore = playerAHelper.score
    const bScore = playerBHelper.score


    if (aScore === bScore) {
      return playerAHelper.tableau.length - playerBHelper.tableau.length
    }

    return aScore - bScore
  }

  getTieBreaker(tieBreaker:number, playerId:PlayerId) {
    if (tieBreaker === 0) return new ScoringHelper(this.game, playerId).tableau.length
    return
  }
}

const hideIdIfRotated = (item: MaterialItem) => item.location.rotation? ['id']: []
