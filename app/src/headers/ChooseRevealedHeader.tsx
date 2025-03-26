/** @jsxImportSource @emotion/react */
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { MaterialRules } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const ChooseRevealedHeader = () => {
  const playerId = usePlayerId()
  const rules = useRules<MaterialRules>()!
  const activePlayer = rules.getActivePlayer()
  const itsMe = playerId !== undefined && activePlayer === playerId
  const name = usePlayerName(activePlayer)

  if (itsMe) {
    return (
      <Trans defaults="header.choose.revealed.me" />
    )
  }

  return (
    <Trans defaults="header.choose.revealed.player" values={{ player: name}} />
  )
}
