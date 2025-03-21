/** @jsxImportSource @emotion/react */
import { DekalRules } from '@gamepark/dekal/DekalRules'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { Trans } from 'react-i18next'

export const ChooseCardHeader = () => {
  const rules = useRules<DekalRules>()!
  const activePlayers = rules.game.rule?.players ?? []
  const playerId = usePlayerId()
  const name = usePlayerName(activePlayers?.[0])

  if (playerId !== undefined && activePlayers.includes(playerId)) {
    return (
      <Trans defaults="header.choose.me" />
    )
  }

  if (activePlayers.length > 1) {
    return (
      <Trans defaults="header.choose.players" />
    )
  }

  if (activePlayers?.length === 1) {
    return (
      <Trans defaults="header.choose.player" values={{ player: name }} />
    )
  }

  return null
}
