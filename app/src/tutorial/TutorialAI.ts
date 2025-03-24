import { DekalRules } from '@gamepark/dekal/DekalRules'
import { LocationType } from '@gamepark/dekal/material/LocationType'
import { MaterialType } from '@gamepark/dekal/material/MaterialType'
import { RuleId } from '@gamepark/dekal/rules/RuleId'
import { GameAI } from '@gamepark/react-client'
import { areAdjacentSquares, MaterialGame, MaterialMove, playAction } from '@gamepark/rules-api'
import { sample, sumBy } from 'lodash'

export const TutorialAI: GameAI = (game: MaterialGame, player: number) => {
  let legalMoves = new DekalRules(game).getLegalMoves(player)
  if (game.rule?.id === RuleId.ChooseRevealedCard) {
    const result = legalMoves.reduce<{ score: number, moves: MaterialMove[] }>((result, move) => {
      const copy = new DekalRules(structuredClone(game))
      playAction(copy, move, player)
      const score = scoreTableau(copy, player)
      if (score < result.score) {
        return { score, moves: [move] }
      } else if (score === result.score) {
        result.moves.push(move)
      }
      return result
    }, { score: Infinity, moves: [] })
    legalMoves = result.moves
  }
  return Promise.resolve([sample(legalMoves)])
}

function scoreTableau(copy: DekalRules, player: number) {
  const cards = copy.material(MaterialType.Card).location(LocationType.Tableau).player(player).getItems<number>()
  return sumBy(cards, (card) => {
    if (cards.some(c => c.id === card.id && areAdjacentSquares(c.location, card.location))) {
      return 0
    }
    return card.id
  })
}
