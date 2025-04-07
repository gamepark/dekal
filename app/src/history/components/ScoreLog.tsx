import { PlayerId } from '@gamepark/dekal/DekalOptions'
import { ScoringHelper } from '@gamepark/dekal/rules/utils/ScoringHelper'
import { MoveComponentProps, useGame, usePlayerName, usePlayers } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'

export const ScoreLog: FC<MoveComponentProps> = () => {
  const players = usePlayers()

  return (
    <>
      <Trans defaults="log.score" /><br />
      <ul>
      {players.map((p) => (
        <PlayerScoreLog key={p.id} player={p.id} />
      ))}
      </ul>
    </>
  )
}

const PlayerScoreLog: FC<{ player: PlayerId }> = (props) => {
  const { player  } = props
  const name = usePlayerName(player)
  const game = useGame<MaterialGame>()!

  return (
    <li>
      <Trans defaults="log.score.player" values={{ player: name, score: new ScoringHelper(game, player).score }} />
    </li>
  )
}
